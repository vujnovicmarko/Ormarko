package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.ArticleMarketing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleMarketingRepository extends JpaRepository<ArticleMarketing, Integer> {
    List<ArticleMarketing> findByArticleMarketer(String articleMarketer);

    //ako će biti opcija da oglašivač izbriše cijelu svoju galeriju
    void deleteByArticleMarketer(String articleMarketer);

}
