package com.example.demo.services;

import com.example.demo.configs.MyUserDetailsService;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(email);
    }

    public User registerUser(User user) {
        var u = userRepo.findByEmail(user.getEmail());

        if (u != null) {
            u.setAccessToken(user.getAccessToken());
            u.setPassword(user.getPassword());
            u.setRefreshToken(user.getRefreshToken());
            u.setExpiresAt(user.getExpiresAt());
            u.setProfileUrl(user.getProfileUrl());
            return userRepo.save(u);
        }
        return userRepo.save(user);
    }

    public Collection<User> getAll() {
        return userRepo.findAll();
    }


    public User getUserByEmail(String email) {
        var user= userRepo.findByEmail(email);
        if(user == null) return null;
        user.setAccessToken(null);
        user.setRefreshToken(null);
        user.setPassword(null);
        user.setExpiresAt(null);
        return user;

    }

    public void saveFriends(List<User> friends) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepo.findByEmail(userEmail);
        System.out.println(user.getPassword());

        for (int i = 0; i < friends.size(); i++) {
            if (user != null) {
                user.setFriends(friends);
                user.setPassword(user.getPassword());
                userRepo.save(user);
            }
        }
    }


}
