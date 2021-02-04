package com.example.demo.controllers;


import com.example.demo.model.MovieEvent;
import com.example.demo.model.User;
import com.example.demo.services.EventService;


import com.fasterxml.jackson.databind.util.ISO8601DateFormat;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.api.services.calendar.model.Event;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import java.util.List;
import java.util.TimeZone;

import static java.time.format.DateTimeFormatter.BASIC_ISO_DATE;
import static java.time.temporal.WeekFields.ISO;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;


//http://localhost:8080/api/availablefriends?startdate=2021-02-02T10:00:00&enddate=2021-02-02T14:00:00
    @GetMapping("/availablefriends")

    public ResponseEntity getAvailableFriends(@RequestParam(value="startdate") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") Date startDate, @RequestParam(value="enddate") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")Date endDate){

        List<User> availableFriends = eventService.checkFriendsEvents(startDate, endDate);

        return ResponseEntity.status(HttpStatus.OK).body(availableFriends);
    }

    @PostMapping("/create_event")
    private ResponseEntity postMovieToCalendar(@RequestBody MovieEvent movieEvent){

        Event movieEvent1= eventService.createNewEvent(movieEvent);
        if(movieEvent1 == null){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Fail to post this event");
        }
        return ResponseEntity.status(HttpStatus.OK).body("The event posted on calendar");
    }

    @GetMapping("/myEvents")
    public ResponseEntity<List<Event>> getMyEvents(){
        return ResponseEntity.ok(eventService.getMyEvents());
    }

    @GetMapping("/myCalendar")
    public ResponseEntity<String> getMyCalendar() throws IOException {
        return ResponseEntity.ok(eventService.getMyCalendar());
    }



}
