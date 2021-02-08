package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.*;

import java.util.List;


public interface UserRepo extends Neo4jRepository<User,Long> {

    User findByEmail(String email);

    @Query("MATCH (u { email:$currentUserEmail})-[f:IS_FRIENDS_WITH]-(yourFriends) RETURN yourFriends")
    Collection<User> getAllFriends(@Param("currentUserEmail") String currentUserEmail);

    List<User> findAll();


}

