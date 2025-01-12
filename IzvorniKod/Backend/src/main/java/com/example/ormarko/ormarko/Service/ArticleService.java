package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.Model.*;
import com.example.ormarko.ormarko.Repository.ArticleRepository;
import com.example.ormarko.ormarko.Repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<ArticleUser> findAllArticlesForLocation(Integer locationId) {
        return articleRepository.findAllArticlesForLocation(locationId);
    }

    public List<ArticleUser> findAllArticlesBySharing(Boolean sharing) {
        return articleRepository.findBySharing(sharing);
    }

    public List<ArticleUser> findAllArticlesByCategory(ArticleCategory category) {
        return articleRepository.findByCategory(category);
    }

    public List<ArticleUser> findAllArticlesBySeason(ArticleSeason season) {
        return articleRepository.findBySeason(season);
    }

    public List<ArticleUser> findAllArticlesByOpenness(ArticleOpen openness) {
        return articleRepository.findByOpenness(openness);
    }

    public List<ArticleUser> findAllArticlesByCasual(ArticleCasual casual) {
        return articleRepository.findByHowCasual(casual);
    }

    public List<ArticleUser> findAllArticlesByColor(ArticleColor color) {
        var l = articleRepository.findByMainColor(color);
        l.addAll(articleRepository.findBySideColor(color));
        return l;
    }


    public List<ArticleUser> findAllArticlesByFilter(Boolean sharing, ArticleCategory category, ArticleSeason season, ArticleOpen openness,
                                                     ArticleCasual casual, ArticleColor color) {
        return articleRepository.findAllArticlesByFilter(sharing, category, season, openness, casual, color);
    }


}
