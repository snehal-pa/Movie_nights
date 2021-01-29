package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node
@Data
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String profileUrl;
    private String password;
    private String accessToken;
    private String refreshToken;
    private Long expiresAt;

    private List<User> users;

    public List<User> getUsers(){
        return users;
    }


    public User(String name, String email, String profileUrl, String password, String accessToken, String refreshToken, Long expiresAt) {
        this.name = name;
        this.email = email;
        this.profileUrl = profileUrl;
        this.password = password;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
    }

}
