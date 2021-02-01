package com.example.demo.controllers;

import com.example.demo.model.MovieEvent;
import com.example.demo.services.AuthService;
import com.example.demo.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/")
public class MovieEventController {
    @Autowired
    private AuthService authService;

    @Autowired
    private EventService eventService;

//    @PostMapping
//    private MovieEvent postMovieToCalendar(@RequestBody MovieEvent movieEvent){
//
//    }
}
