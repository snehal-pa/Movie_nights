package com.example.demo.services;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;


    public void registerUser(User user) {
        //Are user in database?
        Optional<User> optional = Optional.ofNullable(userRepo.findByEmail(user.getEmail()));

        if(!optional.isPresent()){
            userRepo.save(user);
        }

    }
}
