package com.example.demo.model;

public class JwtToken {
    private final String jwt;

    public JwtToken(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
