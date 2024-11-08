package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.e_mail = :e_mail")
    Optional<User> findByEmail(@Param("e_mail") String e_mail);

}
