package com.example.demo.services;

import com.example.demo.configs.MyUserDetailsService;
import com.example.demo.model.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collection;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private String refreshToken;
    private Long expiresAt;
    private String accessToken;
    private String email;
    private String name;
    private String pictureUrl;
    private String locale;

    public String getLocale() {
        return locale;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getExpiresAt() { return expiresAt; }

    public String getAccessToken() {
        return accessToken;
    }


    public void saveUserToDb(GoogleTokenResponse tokenResponse, HttpServletRequest req) {
        // Get profile info from ID token (Obtained at the last step of OAuth2)
        if(tokenResponse == null){
            name = null;
            email=null;
            pictureUrl=null;
            accessToken= null;
            refreshToken= null;
            expiresAt = null;
            locale = null;
        }
        GoogleIdToken idToken = null;
        try {
            idToken = tokenResponse.parseIdToken();
        } catch (
                IOException e) {
            e.printStackTrace();
        }
        GoogleIdToken.Payload payload = idToken.getPayload();

        // Use THIS ID as a key to identify a google user-account.
        String userId = payload.getSubject();

        email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        name = (String) payload.get("name");
        pictureUrl = (String) payload.get("picture");
        locale = (String) payload.get("locale");
        accessToken = tokenResponse.getAccessToken();
        refreshToken = tokenResponse.getRefreshToken();
        expiresAt = System.currentTimeMillis() + (tokenResponse.getExpiresInSeconds() * 1000);

        // Debugging purposes, should probably be stored in the database instead (At least "givenName").
        System.out.println("userId: " + userId);
        System.out.println("email: " + email);
        System.out.println("emailVerified: " + emailVerified);
        System.out.println("name: " + name);
        System.out.println("pictureUrl: " + pictureUrl);
        System.out.println("locale: " + locale);
        System.out.println("acccestoken: " + accessToken);


        String pass = email + "passwordSalt" + userId;
        String password = encoder.encode(pass);
        User user = new User(name, email, pictureUrl, password, accessToken, refreshToken, expiresAt);

        userService.registerUser(user);


        securityLogin(email, pass, req);
    }

    private void securityLogin(String email, String password, HttpServletRequest req) {
        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken(email, password);
        Authentication auth = authenticationManager.authenticate(authReq);

        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        HttpSession session = req.getSession(true);
        session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
    }





}
