package com.example.demo.services;


import com.example.demo.model.User;
import com.example.demo.repository.MovieRepo;
import com.example.demo.repository.UserRepo;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class EventService {

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private UserRepo userRepo;

    @Value("${api.google.clientId}")
    private String CLIENT_ID;

    @Value("${api.google.clientSecret}")
    private String CLIENT_SECRET;

    public List<Event> getMyEvents() {

    public List<User> checkFriendsEvents(Date startDate, Date endDate){
        // Use an accessToken previously gotten to call Google's API

        GoogleCredential credentials = new GoogleCredential().setAccessToken();
        Calendar calendar = new Calendar.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance(),
                credentials)
                .setApplicationName("Movie Nights")
                .build();

    /*
            List the next 10 events from the primary calendar.
        Instead of printing these with System out, you should of course store them in a database or in-memory variable to use for your application.
*/


//        event.getSummary()             // Title of calendar event
//        event.getStart().getDateTime() // Start-time of event
//        event.getEnd().getDateTime()   // Start-time of event
//        event.getStart().getDate()     // Start-date (without time) of event
//        event.getEnd().getDate()       // End-date (without time) of event


        DateTime now = new DateTime(System.currentTimeMillis());
        Events events = null;
        try {
            events = calendar.events().list("primary")
                    .setMaxResults(10)
                    .setTimeMin(now)
                    .setOrderBy("startTime")
                    .setSingleEvents(true)
                    .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<Event> myEvents = events.getItems();

        if (myEvents.isEmpty()) {
            System.out.println("No upcoming events found.");
        } else {
            System.out.println("Upcoming events");
            for (Event event : myEvents) {
                DateTime start = event.getStart().getDateTime();
                if (start == null) { // If it's an all-day-event - store the date instead
                    start = event.getStart().getDate();
                }
                DateTime end = event.getEnd().getDateTime();
                if (end == null) { // If it's an all-day-event - store the date instead
                    end = event.getStart().getDate();
                }
                System.out.printf("%s (%s) -> (%s)\n", event.getSummary(), start, end);
            }
        }
        return myEvents;
    }


    public List<User> checkFriendsEvents(DateTime startDate, DateTime endDate) {

        List<User> friends = userRepo.findAll();
        System.out.println(friends);

        List<User> availableFriends = new ArrayList<>();

        for (int i = 0; i < friends.size(); i++) {
            //check if accessToken is valid
            Long tokenExpire = friends.get(i).getExpiresAt();
            if (tokenExpire < System.currentTimeMillis()) {
                //get a new accessToken
                try {
                    friends.get(i).setAccessToken(refreshAccessToken(friends.get(i).getRefreshToken()));
                    friends.get(i).setExpiresAt(System.currentTimeMillis() + (3600 * 1000));
                    userRepo.save(friends.get(i));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            Boolean freeFriend = getEventsFroAvailableFriends(startDate, endDate, friends.get(i).getAccessToken());
            if (freeFriend == true) {
                friends.get(i).setAccessToken(null);
                friends.get(i).setRefreshToken(null);
                friends.get(i).setPassword(null);
                availableFriends.add(friends.get(i));
            }
        }

        return availableFriends;
    }


    private String refreshAccessToken(String refreshToken) throws IOException {
        try {
            TokenResponse response =
                    new GoogleRefreshTokenRequest(new NetHttpTransport(), new JacksonFactory(),
                            refreshToken, CLIENT_ID, CLIENT_SECRET).execute();

            System.out.println("Access token: " + response.getAccessToken());

            return response.getAccessToken();
        } catch (TokenResponseException e) {

            if (e.getDetails() != null) {
                System.err.println("Error: " + e.getDetails().getError());
                if (e.getDetails().getErrorDescription() != null) {
                    System.err.println(e.getDetails().getErrorDescription());
                }
                if (e.getDetails().getErrorUri() != null) {
                    System.err.println(e.getDetails().getErrorUri());
                }
            } else {
                System.err.println(e.getMessage());
            }
        }
        return null;
    }


    private boolean getEventsFroAvailableFriends(Date startDate, Date endDate, String accessToken){
    private boolean getEventsFroAvailableFriends(DateTime startDate, DateTime endDate, String accessToken) {
        // Use an accessToken previously gotten to call Google's API
        GoogleCredential credentials = new GoogleCredential().setAccessToken(accessToken);
        Calendar calendar = new Calendar.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance(),
                credentials)
                .setApplicationName("movie night")
                .build();

        DateTime now = new DateTime(startDate);
        DateTime end = new DateTime(endDate);

        Events events = null;
        try {
            events = calendar.events().list("primary")
                    .setMaxResults(10)
                    .setTimeMin(now)
                    .setTimeMax(end)
                    .setOrderBy("startTime")
                    .setTimeZone("CET")
                    .setSingleEvents(true)
                    .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<User> availableFriends = null;
        List<Event> items = events.getItems();
        if (items.isEmpty()) {
            System.out.println("No upcoming events found.");
            System.out.println(true);
            return true;
        } else {
            System.out.println("Upcoming events");
            for (Event event : items) {
                DateTime start = event.getStart().getDateTime();
                System.out.println(start);
            }
            System.out.println(false);
            return false;
        }
    }


}
