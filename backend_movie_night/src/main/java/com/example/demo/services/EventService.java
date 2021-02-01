package com.example.demo.services;


import com.example.demo.model.MovieEvent;
import com.example.demo.model.User;
import com.example.demo.repository.MovieRepo;
import com.example.demo.repository.UserRepo;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private UserRepo userRepo;

    //Get movie
    //Add movieLength on date!
    //Check AccessToken, refresh
    public List<User> checkFriendsEvents(String movieTitle, DateTime date){

       // Movie movie = movieRepo.findByTitle(movieTitle);
        //int movieLenght = movie.getLength() * 3600;
        //testing:
        int movieLength = 2 * 3600;
        System.out.println(movieLength);

        List<User> friends = userRepo.findAll();
        System.out.println(friends);

        List<User> availableFriends = new ArrayList<>();

        for(int i= 0; i<friends.size(); i++){
            //check if accessToken is valid
            Long tokenExpire = friends.get(i).getExpiresAt();
            if(tokenExpire < System.currentTimeMillis()){
                //get a new accessToken
                System.out.println("true");
            }
            Boolean freeFriend = getEvents(date, movieLength, friends.get(i).getAccessToken());
            if(freeFriend == true){
                friends.get(i).setAccessToken(null);
                friends.get(i).setRefreshToken(null);
                availableFriends.add(friends.get(i));
            }
        }

        return availableFriends;
    }


    private boolean getEvents(DateTime startDate, int movieLenght, String accessToken){
        // Use an accessToken previously gotten to call Google's API
        GoogleCredential credentials = new GoogleCredential().setAccessToken(accessToken);
        Calendar calendar = new Calendar.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance(),
                credentials)
                .setApplicationName("movie night")
                .build();

        Events events = null;
        try {
            events = calendar.events().list("primary")
                    .setMaxResults(10)
                    .setTimeMin(startDate)
                    .setOrderBy("startTime")
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
            System.out.println(false);
            return  false;
        }
    }


    public Event createNewEvent(MovieEvent movieEvent,String accessToken) {

        GoogleCredential credentials = new GoogleCredential().setAccessToken(accessToken);
        Calendar calendar = new Calendar.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance(),
                credentials)
                .setApplicationName("Movie Nights")
                .build();

        Event newEvent = new Event();

        EventDateTime eventStart = new EventDateTime().setDateTime(movieEvent.getStart());
        EventDateTime eventEnd = new EventDateTime().setDateTime(movieEvent.getEnd());

        newEvent.setSummary(movieEvent.getMovie().getTitle());
        newEvent.setStart(eventStart);
        newEvent.setEnd(eventEnd);

        try {
            calendar.events().insert("primary", newEvent).execute();
            return newEvent;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
