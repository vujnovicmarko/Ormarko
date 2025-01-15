package com.example.ormarko.ormarko.Repository;

import com.example.ormarko.ormarko.Model.*;
import jdk.jfr.Category;
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
    ArticleUser findArticleByArticleId(Integer articleId);

    List<ArticleUser> findBySharing(Boolean sharing);
    List<ArticleUser> findByCategory(ArticleCategory category);
    List<ArticleUser> findBySeason(ArticleSeason season);
    List<ArticleUser> findByOpenness(ArticleOpen openness);
    List<ArticleUser> findByHowCasual(ArticleCasual casual);
    List<ArticleUser> findByMainColor(ArticleColor color);
    List<ArticleUser> findBySideColor(ArticleColor color);

    @Query("SELECT a FROM ArticleUser a WHERE a.sharing = :sharing AND a.category = :category" +
            " AND a.season = :season AND a.openness = :openness AND a.howCasual = :casual AND (a.mainColor = :color OR a.sideColor = :color)")
    List<ArticleUser> findAllArticlesByFilter(Boolean sharing, ArticleCategory category, ArticleSeason season, ArticleOpen openness,
                                              ArticleCasual casual, ArticleColor color);

}
