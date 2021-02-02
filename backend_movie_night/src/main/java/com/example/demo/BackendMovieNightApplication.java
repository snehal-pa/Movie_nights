package com.example.demo;

import com.example.demo.services.EventService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class BackendMovieNightApplication {

	public static void main(String[] args) {
       // TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(BackendMovieNightApplication.class, args);


	}

}
