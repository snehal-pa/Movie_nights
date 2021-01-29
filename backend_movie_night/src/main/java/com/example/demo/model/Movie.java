package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Id;


@Node
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    private long id;
    private String title;
    private String genre;
    private String length;
    private String description;
    private String postPath;
    private String language;



}
