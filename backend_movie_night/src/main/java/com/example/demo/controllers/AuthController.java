package com.example.demo.controllers;

import com.example.demo.services.AuthService;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;


@RestController
@RequestMapping("/api")
public class AuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String CLIENT_SECRET;

    @Autowired
    private AuthService authService;

    @PostMapping("/storeauthcode")
    public String storeauthcode(@RequestBody String code, @RequestHeader("X-Requested-With") String encoding, HttpServletRequest req) {
        if (encoding == null || encoding.isEmpty()) {
            // Without the `X-Requested-With` header, this request could be forged. Aborts.
            return "Error, wrong headers";
        }
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

        authService.saveUserToDb(tokenResponse, req);
        return "OK";

    }

   /* @GetMapping("/whoami")
    public ResponseEntity getLoggedInUser(){
        var user= authService.getLoginUser();
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("nobody is logged in");
        }
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/logout")
    public ResponseEntity logout(){
        var response= authService.saveUserToDb(null);
        if(response.isBlank()){
            return ResponseEntity.status(HttpStatus.OK).body("Successfully logout");
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("logout fail");
    }*/

}
