package com.example.demo.controllers;

import com.example.demo.services.AuthService;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Value("${api.google.clientId}")
    private String CLIENT_ID;

    @Value("${api.google.clientSecret}")
    private String CLIENT_SECRET;

    @Autowired
    private AuthService authService;



    //@RequestMapping(value = "/storeauthcode", method = RequestMethod.POST)
    @PostMapping("/storeauthcode")
    public String storeauthcode(@RequestBody String code, @RequestHeader("X-Requested-With") String encoding) {
        if (encoding == null || encoding.isEmpty()) {
            // Without the `X-Requested-With` header, this request could be forged. Aborts.
            return "Error, wrong headers";
        }
        System.out.println("here " + code);
        System.out.println("jack " + JacksonFactory.getDefaultInstance());
        System.out.println(CLIENT_ID);
        System.out.println(CLIENT_SECRET);
        GoogleTokenResponse tokenResponse = null;
        try {
            tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance(),
                    "https://www.googleapis.com/oauth2/v4/token",
                    CLIENT_ID,
                    CLIENT_SECRET,
                    code,
                    "http://localhost:3000") // Make sure you set the correct port
                    .execute();
        } catch (IOException e) {
            System.out.println("cathar");
            e.printStackTrace();
        }

        // Store these 3 in your DB
        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        Long expiresAt = System.currentTimeMillis() + (tokenResponse.getExpiresInSeconds() * 1000);

        // Debug purpose only
        System.out.println("accessToken: " + accessToken);
        System.out.println("refreshToken: " + refreshToken);
        System.out.println("expiresAt: " + expiresAt);

        authService.getInfoFromToken(tokenResponse);

        return "OK";
    }
}
