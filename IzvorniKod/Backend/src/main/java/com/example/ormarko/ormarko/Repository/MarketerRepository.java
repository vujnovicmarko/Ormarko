package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.Marketer;
import com.example.ormarko.ormarko.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarketerRepository extends JpaRepository<Marketer, String> {
    Optional<Marketer> findByUsername(String username);
    @Query("SELECT m FROM Marketer m WHERE m.eMail = :eMail")
    Optional<Marketer> findByEmail(@Param("eMail") String eMail);
}
