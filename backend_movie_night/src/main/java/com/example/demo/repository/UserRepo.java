package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Collection;
import java.util.List;

import java.util.List;


public interface UserRepo extends Neo4jRepository<User,Long> {

    User findByEmail(String email);

   // CREATE (User)-[rel:IS_FRIENDS_WITH]->(User)
   // User updateFriends();

   // List<User> findAll();

}

