package com.example.demo.services;

import com.example.demo.configs.MyUserDetailsService;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
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


}
