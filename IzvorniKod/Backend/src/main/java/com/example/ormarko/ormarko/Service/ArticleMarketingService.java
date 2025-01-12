package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.Model.ArticleMarketing;
import com.example.ormarko.ormarko.Repository.ArticleMarketingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ArticleMarketingService {

    private final ArticleMarketingRepository articleRepository;

    @Autowired
    public ArticleMarketingService(ArticleMarketingRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<ArticleMarketing> getArticlesByMarketer(String marketerUsername) {
        List<ArticleMarketing> articles = articleRepository.findByArticleMarketer(marketerUsername);
        articles.forEach(article -> {
            System.out.println("Article ID: " + article.getArticleId());
            System.out.println("Binary Image Size: " + (article.getImg() != null ? article.getImg().length : 0));
        });
        return articles;
    }

    //zbog problema sa slikom - bytea
    public List<Map<String, Object>> getArticlesWithEncodedImages(String marketerUsername) {
        List<Map<String, Object>> encodedArticles = articleRepository.findArticlesByMarketer(marketerUsername);
        encodedArticles.forEach(article -> {
            System.out.println("Article ID: " + article.get("articleId"));
            System.out.println("Encoded Image: " + article.get("img"));
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
