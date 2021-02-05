package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Id;

import java.util.List;


@Node
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    private int id;
    private String title;
    private List<String> genre;
    private int length;
    private String description;
    private String postPath;
    private String language;
    private String backdropPath;
    private String releaseDate;



}
