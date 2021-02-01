package com.example.demo.controllers;


import com.example.demo.model.User;
import com.example.demo.services.EventService;


import com.google.api.client.util.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import java.util.List;
import java.util.TimeZone;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/availablefriends")
    public ResponseEntity getAvailableFriends(@RequestParam(value="startdate") DateTime startDate, @RequestParam(value="enddate") DateTime endDate){


        System.out.println("DATE " + startDate);
        System.out.println("DATE " + endDate);

        List<User> availableFriends = eventService.checkFriendsEvents(startDate, endDate);

        return ResponseEntity.status(HttpStatus.OK).body(availableFriends);
    }
}
