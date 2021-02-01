package com.example.demo.model;

import com.google.api.client.util.DateTime;
import lombok.Data;

import java.util.List;

@Data
public class MovieEvent {

    private int id;
    private Movie movie;
    private DateTime start;
    private DateTime end;

    private List<User> attendees;
}
