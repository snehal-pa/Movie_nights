package com.example.demo.repository;

import com.example.demo.model.Movie;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface MovieRepo extends Neo4jRepository<Movie,Integer> {
    List<Movie> findByTitle(String title);

}
