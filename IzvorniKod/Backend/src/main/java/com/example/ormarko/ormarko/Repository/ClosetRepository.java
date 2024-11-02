package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.Closet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetRepository extends JpaRepository<Closet, Integer> {

    @Query("SELECT DISTINCT c FROM Closet c WHERE c.closetOwner = :username")
    List<Closet> findAllClosetsForUser(String username);

    Closet findClosetByClosetId(Integer closetId);
}

