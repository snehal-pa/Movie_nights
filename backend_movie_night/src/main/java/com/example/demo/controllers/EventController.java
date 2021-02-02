package com.example.demo.controllers;


import com.example.demo.model.User;
import com.example.demo.services.AuthService;
import com.example.demo.services.EventService;


import com.fasterxml.jackson.databind.util.ISO8601DateFormat;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

import java.util.List;
import java.util.TimeZone;

import static java.time.format.DateTimeFormatter.BASIC_ISO_DATE;
import static java.time.temporal.WeekFields.ISO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    //  @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ssZ")

    @GetMapping("/availablefriends")
    public ResponseEntity getAvailableFriends(@RequestParam(value="startdate") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") Date startDate, @RequestParam(value="enddate") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")Date endDate){


        System.out.println("DATE " + startDate);
        System.out.println("DATE " + endDate);

        List<User> availableFriends = eventService.checkFriendsEvents(startDate, endDate);

        return ResponseEntity.status(HttpStatus.OK).body(availableFriends);
    }

    @GetMapping("/myEvents")
    public ResponseEntity<List<Event>> getMyEvents(@RequestParam(value="accessToken") String accessToken){
        return ResponseEntity.ok(eventService.getMyEvents(accessToken));
    }

}
