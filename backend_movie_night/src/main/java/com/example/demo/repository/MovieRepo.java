package com.example.demo.repository;

import com.example.demo.model.Movie;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface MovieRepo extends Neo4jRepository<Movie,Integer> {


    @Query("MATCH (m:Movie) WHERE toLower(m.title) CONTAINS toLower($title) RETURN m")
    List<Movie> findByTitleContaining(String title);

    List<Movie> findByTitle(String title);

    @Query(/*"WITH \"(?i).*$genre\" as param\n" +*/
            "MATCH (p:Movie)\n" +
            "WHERE ANY(item IN p.genre WHERE toLower(item) CONTAINS toLower($genre))\n" +
            "RETURN p")
    List<Movie> findByGenre(String genre);


}
