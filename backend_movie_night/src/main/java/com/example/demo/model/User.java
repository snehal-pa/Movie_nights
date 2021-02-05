package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @Relationship(type= "FRIEND", direction = Relationship.Direction.INCOMING)
    private List<User> friends;


    public User(String name, String email, String profileUrl, String password, String accessToken, String refreshToken, Long expiresAt) {
        this.name = name;
        this.email = email;
        this.profileUrl = profileUrl;
        this.password = password;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

   /* @JsonIgnore
    public String getAccessToken() {
        return accessToken;
    }

    @JsonProperty
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @JsonIgnore
    public String getRefreshToken() {
        return refreshToken;
    }

    @JsonProperty
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }*/


}
