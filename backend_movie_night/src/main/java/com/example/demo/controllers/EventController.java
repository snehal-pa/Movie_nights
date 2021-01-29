package com.example.demo.controllers;


import com.example.demo.model.Movie;
import com.example.demo.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class EventController {


    //chose movie, date -> get back witch friends are available
    //return friends that are available, populate list in frontend

    @GetMapping("/availablefriends")
    public List<User> getAvailableFriends(@RequestParam(value="movie") Movie movie,
                                    @RequestParam(value="Date")Date toDate){

        //get movie lenght
        //get all users -> check time for token -> refresh token -> save new token in db on user ->
        //loop thru users events -> if its null on given date -> add user in list -> return list
        return null;
    }
}
