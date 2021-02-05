package com.example.demo.services;

import com.example.demo.model.Movie;
import com.example.demo.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private static final RestTemplate restTemplate = new RestTemplate();
    @Autowired
    private MovieRepo movieRepo;


    public List<Movie> getAllMovies() {

        //saveMoviesToDb(1, 200);

        return movieRepo.findAll();

    }

    public void saveMoviesToDb(int from, int upTo) {
        if (from < upTo) {
            for (int i = from; i <= upTo; i++) {
                Optional<Movie> optional = movieRepo.findById(i);
                var movie = getMovieById(i);
                if (optional.isEmpty() && movie != null) {
                    movieRepo.save(movie);
                }

            }
        }

    }

    public Movie getMovieById(int movieId) {

        String movieUrlById = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=d1c9106a1b59d693d6660c2a02b68f17";
        try {
            var movieMap = restTemplate.getForObject(movieUrlById, Map.class);
            int id = (int) movieMap.get("id");
            String title = (String) movieMap.get("title");
            var genre = ((ArrayList<Map<String, Object>>) movieMap.get("genres"))
                    .stream()
                    .map(o -> (String) o.get("name"))
                    .collect(Collectors.toList());


            int length = (int) movieMap.get("runtime");
            String description = (String) movieMap.get("overview");
            String postPath = (String) movieMap.get("poster_path");
            String language = (String) movieMap.get("original_language");
            String backdropPath = (String) movieMap.get("backdrop_path");
            String releaseDate = (String) movieMap.get("release_date");

            System.out.println("id - " + id);
            System.out.println("title - " + title);
            System.out.print("genres - ");
            genre.forEach(System.out::println);
            System.out.println("length - " + length);
            System.out.println("desc - " + description);
            System.out.println("postpath - " + postPath);
            System.out.println("laguage - " + language);

            Movie movie = new Movie(id, title, genre, length, description, postPath, language , backdropPath, releaseDate);
            return movie;

        } catch (Exception e) {
            return null;
        }
    }

    public List<Movie> getMovieByTitle(String title) {
        return movieRepo.findByTitleContaining(title);
    }

    public List<Movie> getMovieByGenre(String genre) {
        return movieRepo.findByGenre(genre);

    }


}
