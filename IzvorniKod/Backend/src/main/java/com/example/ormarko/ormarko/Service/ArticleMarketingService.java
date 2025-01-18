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

    public List<ArticleMarketing> getArticlesByMarketer(String marketerUsername) {
        return articleRepository.findByArticleMarketer(marketerUsername);
    }

    public ArticleMarketing saveArticle(ArticleMarketing article) {
        return articleRepository.save(article);
    }

    public void deleteArticle(int articleId) {
        articleRepository.deleteById(articleId);
    }


    public Optional<ArticleMarketing> getArticleById(int articleId) {
        return articleRepository.findById(articleId);
    }

}
