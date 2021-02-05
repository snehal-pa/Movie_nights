package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.Collection;
import java.util.List;

import java.util.List;


public interface UserRepo extends Neo4jRepository<User,Long> {

    User findByEmail(String email);

   // MATCH (you {name:"Anna Karlsson"})-[:IS_FRIENDS_WITH]->(yourFriends)RETURN you, yourFriends

    //@Query("MATCH (u:{name: User.getEmail})-[f:IS_FRIENDS_WITH]-(yourFriends) RETURN u, yourFriends")
    //Collection<User> getAllFriends(String email);


    List<User> findAll();


}

