package com.example.demo.services;

import com.example.demo.model.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    public void saveUserToDb(GoogleTokenResponse tokenResponse) {
        // Get profile info from ID token (Obtained at the last step of OAuth2)
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

        String email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        Long expiresAt = System.currentTimeMillis() + (tokenResponse.getExpiresInSeconds() * 1000);



        // Debugging purposes, should probably be stored in the database instead (At least "givenName").
        System.out.println("userId: " + userId);
        System.out.println("email: " + email);
        System.out.println("emailVerified: " + emailVerified);
        System.out.println("name: " + name);
        System.out.println("pictureUrl: " + pictureUrl);
        System.out.println("locale: " + locale);

        //create password by
        // from the user and a secret salt


        String password = encoder.encode(email + "passwordSalt" + userId);

        User user = new User(name,email,pictureUrl,password,accessToken,refreshToken,expiresAt);

        userService.registerUser(user);

    }


}
