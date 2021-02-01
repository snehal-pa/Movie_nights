package com.example.demo.model;

import com.google.api.client.util.DateTime;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Data
@Node
public class MovieEvent {
    @Id
    @GeneratedValue
    private int id;
    private Movie movie;
    private DateTime start;
    private DateTime end;

    private List<User> attendees;
}
