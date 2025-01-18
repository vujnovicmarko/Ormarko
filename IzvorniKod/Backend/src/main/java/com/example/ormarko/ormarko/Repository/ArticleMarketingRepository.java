package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.ArticleMarketing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ArticleMarketingRepository extends JpaRepository<ArticleMarketing, Integer> {
    List<ArticleMarketing> findByArticleMarketer(String articleMarketer);


    @Query("SELECT new map(a.articleId as articleId, a.articleMarketer as articleMarketer, a.title as title, a.category as category, a.img as img, a.price as price) FROM ArticleMarketing a WHERE a.articleMarketer = :articleMarketer")
    List<Map<String, Object>> findArticlesByMarketer(@Param("articleMarketer") String articleMarketer);


}
