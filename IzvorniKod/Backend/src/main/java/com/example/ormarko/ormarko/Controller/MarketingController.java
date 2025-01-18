package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.Marketer;
import com.example.ormarko.ormarko.Service.MarketerService;
import com.example.ormarko.ormarko.Service.ArticleMarketingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/marketers")
public class MarketingController {
    private final MarketerService marketerService;
    private final ArticleMarketingService articleService;

    public MarketingController(MarketerService marketerService, ArticleMarketingService articleService) {
        this.marketerService = marketerService;
        this.articleService = articleService;
    }


    @GetMapping
    public List<Map<String, Object>> getAllAdvertisers() {
        return marketerService.findAll().stream()
                .map(marketer -> Map.<String, Object>of(
                        "username", marketer.getUsername(),
                        "logo", marketer.getLogo()
                ))
                .toList();
    }
/*
    @GetMapping("{username}/gallery")
    public List<?> getAdvertiserGallery(@PathVariable String username) {
        var marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Advertiser not found"));

        return articleService.getArticlesByMarketer(username);
    }
*/
    //gornji ne radi za slike, pa za sad ova metoda za dohvat svih artikala pojedinog oglašivača
    @GetMapping("{username}/gallery")
    public Map<String, Object> getAdvertiserGalleryRaw(@PathVariable String username) {
        var marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Advertiser not found"));

        List<?> articles = articleService.getArticlesByMarketer(username);
        return Map.of(
                "username", marketer.getUsername(),
                "email", marketer.geteMail(),
                "articles", articles
        );
    }
}
