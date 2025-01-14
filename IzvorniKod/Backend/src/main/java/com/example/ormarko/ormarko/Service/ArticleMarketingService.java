package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.Model.ArticleMarketing;
import com.example.ormarko.ormarko.Repository.ArticleMarketingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticleMarketingService {

    private final ArticleMarketingRepository articleRepository;

    @Autowired
    public ArticleMarketingService(ArticleMarketingRepository articleRepository) {
        this.articleRepository = articleRepository;
    }



    public List<Map<String, Object>> getArticlesByMarketer(String marketerUsername) {
        return articleRepository.findByArticleMarketer(marketerUsername)
                .stream()
                .map(article -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", article.getArticleId());
                    map.put("title", article.getTitle());
                    map.put("category", article.getCategory());
                    //map.put("img", article.getImg() != null ? Base64.getEncoder().encodeToString(article.getImg()) : null);
                    map.put("price", article.getPrice());
                    return map;
                })
                .toList();
    }

    //zbog problema sa slikom - bytea
    public List<Map<String, Object>> getArticlesWithEncodedImages(String marketerUsername) {
        List<Map<String, Object>> encodedArticles = articleRepository.findArticlesByMarketer(marketerUsername);
        encodedArticles.forEach(article -> {
            System.out.println("Article ID: " + article.get("articleId"));
            //System.out.println("Encoded Image: " + article.get("img"));
        });
        return encodedArticles;
    }



    public ArticleMarketing saveArticle(ArticleMarketing article) {
        return articleRepository.save(article);
    }

    public void deleteArticle(int articleId) {
        articleRepository.deleteById(articleId);
    }

    public void deleteAllArticlesForMarketer(String marketerUsername) {
        articleRepository.deleteByArticleMarketer(marketerUsername);
    }
    public Optional<ArticleMarketing> getArticleById(int articleId) {
        return articleRepository.findById(articleId);
    }

}
