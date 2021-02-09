package com.example.demo.controllers;

import com.example.demo.model.Movie;
import com.example.demo.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/rest/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable int id) {
        var m = movieService.getMovieById(id);
        if (m == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("movie not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(m);

    }


    //http://localhost:8080/rest/movies/search?title={title}
    //http://localhost:8080/rest/movies/search?genre={genre}
    @GetMapping("/search")
    public ResponseEntity getByGenreOrTitle(@RequestParam(required = false) String genre, @RequestParam(required = false) String title) {
        if (genre == null && title != null) {
            var movies = movieService.getMovieByTitle(title);
            if (movies.size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
            }
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        }


        if (genre != null && title == null) {
            var movies = movieService.getMovieByGenre(genre);
            if (movies.size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
            }
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("bad request");


    }

    @GetMapping
    public List<Movie> getAllMovieFromDb() {
        return movieService.getAllMovies();
    }

    @PostMapping("/{from}/{limit}")
    public ResponseEntity postMovies(@PathVariable int from, @PathVariable int limit) {
        if (limit > 200 || limit < 1) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("min limit is 1 and max limit is 200");
        }
        int upto = from + limit;
        movieService.saveMoviesToDb(from, upto);
        return ResponseEntity.status(HttpStatus.OK).body("movies saved to db");
    }
}
