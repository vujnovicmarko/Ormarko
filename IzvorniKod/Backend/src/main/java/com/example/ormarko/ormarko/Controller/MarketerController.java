package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.ArticleMarketing;
import com.example.ormarko.ormarko.Model.Marketer;
import com.example.ormarko.ormarko.Service.ArticleMarketingService;
import com.example.ormarko.ormarko.Service.MarketerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/marketer")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MarketerController {

    private final MarketerService marketerService;
    private final ArticleMarketingService articleService;

    public MarketerController(MarketerService marketerService, ArticleMarketingService articleService) {
        this.marketerService = marketerService;
        this.articleService = articleService;
    }

    @GetMapping("/profile")
    public Map<String, Object> getMarketerProfile(Authentication authentication) {
        System.out.println("Current Authentication on /marketer/profile: " + SecurityContextHolder.getContext().getAuthentication());

        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));
        return Map.of(

                "username", marketer.getUsername(),
                "email", marketer.geteMail(),
                "logo", marketer.getLogo()
        );
    }



    @GetMapping("/gallery")
    public ResponseEntity<List<Map<String, Object>>> getMarketerGallery(Authentication authentication) {
        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));

        List<Map<String, Object>> articles = articleService.getArticlesByMarketer(username);
        return ResponseEntity.ok(articles);
    }


    //dodavanje artikla u galeriju
    @PostMapping("/gallery/add-article")
    public ResponseEntity<ArticleMarketing> addGalleryItem(@RequestBody ArticleMarketing article, Authentication authentication) {
        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));

        //byte[] hardcodedImage = new byte[]{(byte) 0x89, (byte) 0x50, (byte) 0x4E, (byte) 0x47, (byte) 0x0D, (byte) 0x0A};
        //article.setImg(hardcodedImage);
        article.setArticleMarketer(username);
        ArticleMarketing savedArticle = articleService.saveArticle(article);
        return ResponseEntity.ok(savedArticle);
    }


    @DeleteMapping("/gallery/{articleId}")
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable int articleId, Authentication authentication) {
        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));

        ArticleMarketing article = articleService.getArticleById(articleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

        if (!article.getArticleMarketer().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this article");
        }

        articleService.deleteArticle(articleId);
        return ResponseEntity.noContent().build();
    }
}
