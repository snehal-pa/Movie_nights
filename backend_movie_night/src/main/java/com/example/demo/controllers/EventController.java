package com.example.demo.controllers;


import com.example.demo.model.MovieEvent;
import com.example.demo.model.User;
import com.example.demo.services.EventService;
import com.google.api.client.util.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.api.services.calendar.model.Event;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    //http://localhost:8080/api/availablefriends?movie=batman&date=2021-01-30T13:00:00.000 = 14.00
    @GetMapping("/availablefriends")
    public List<User> getAvailableFriends(@RequestParam(value = "movie") String movie,
                                          @RequestParam(value = "date") DateTime date) {

        System.out.println("MOVIE " + movie);
        System.out.println("DATE " + date);

        List<User> availableFriends = eventService.checkFriendsEvents(movie, date);

        return availableFriends;
    }

    @PostMapping
    private ResponseEntity postMovieToCalendar(@RequestBody MovieEvent movieEvent){
        String accessToken ="";

        Event movieEvent1= eventService.createNewEvent(movieEvent,accessToken);
        if(movieEvent1 == null){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Fail to post event");
        }
        return ResponseEntity.status(HttpStatus.OK).body("event posted on calendar");
    }
}
