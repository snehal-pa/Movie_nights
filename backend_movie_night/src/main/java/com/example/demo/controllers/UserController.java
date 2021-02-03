package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/rest")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/users")
    ResponseEntity<Collection<User>> getAll(){
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/whoami")
    public User whoAmI(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(email);
    }
}
