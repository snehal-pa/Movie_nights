package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

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


    @GetMapping("/firends")
    ResponseEntity<Collection<User>> getFriends(){
        //check so it do not return password!
        return ResponseEntity.ok(userService.getFriends());
    }

    @PostMapping("/addfriends")
    ResponseEntity addFriends(@RequestBody List<User> friends){
        userService.saveFriends(friends);
        return new ResponseEntity(HttpStatus.OK);
    }
}
