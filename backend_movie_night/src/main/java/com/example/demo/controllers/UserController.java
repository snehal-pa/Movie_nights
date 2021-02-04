package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
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
        return userService.findCurrentUser();
    }
}
