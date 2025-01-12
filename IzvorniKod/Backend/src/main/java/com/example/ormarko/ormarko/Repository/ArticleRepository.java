package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.ArticleUser;
import com.example.ormarko.ormarko.Model.Closet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleUser, Integer> {

    @Query("SELECT DISTINCT a FROM ArticleUser a WHERE a.locationId = :locationId")
    List<ArticleUser> findAllArticlesForLocation(Integer locationId);

    List<ArticleUser> findBySharing(Boolean sharing);


}
