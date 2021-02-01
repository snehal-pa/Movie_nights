package com.example.demo.services;


import com.example.demo.model.User;
import com.example.demo.repository.MovieRepo;
import com.example.demo.repository.UserRepo;
import com.google.api.client.auth.oauth2.Credential;
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

    @Value("${api.google.clientId}")
    private String CLIENT_ID;

    @Value("${api.google.clientSecret}")
    private String CLIENT_SECRET;

    //Get movie
    //Add movieLength on date!
    //Check AccessToken, refresh
    public List<User> checkFriendsEvents(DateTime date){

        List<User> friends = userRepo.findAll();
        System.out.println(friends);

        List<User> availableFriends = new ArrayList<>();

        for(int i= 0; i<friends.size(); i++){
            //check if accessToken is valid
            Long tokenExpire = friends.get(i).getExpiresAt();
            if(tokenExpire < System.currentTimeMillis()){
                //get a new accessToken
                try {
                   friends.get(i).setAccessToken(refreshAccessToken(friends.get(i).getRefreshToken()));
                   friends.get(i).setExpiresAt(System.currentTimeMillis() + (3600 * 1000));
                   userRepo.save(friends.get(i));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            Boolean freeFriend = getEvents(date, friends.get(i).getAccessToken());
            if(freeFriend == true){
                friends.get(i).setAccessToken(null);
                friends.get(i).setRefreshToken(null);
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



    private boolean getEvents(DateTime startDate, String accessToken){
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

    //What if event already started?
    //check endTime of events


}
