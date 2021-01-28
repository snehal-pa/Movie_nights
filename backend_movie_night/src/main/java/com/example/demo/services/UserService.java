package com.example.demo.services;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;


    public User registerUser(User user) {
        var u = userRepo.findByEmail(user.getEmail());

        if(u != null){
            u.setAccessToken(user.getAccessToken());
            u.setRefreshToken(user.getRefreshToken());
            u.setExpiresAt(user.getExpiresAt());
            u.setProfileUrl(user.getProfileUrl());
            return userRepo.save(u);

        }
        return userRepo.save(user);

    }
}
