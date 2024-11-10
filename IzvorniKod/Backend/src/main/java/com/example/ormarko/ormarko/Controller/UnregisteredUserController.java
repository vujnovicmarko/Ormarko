package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.ArticleUser;
import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.Location;
import com.example.ormarko.ormarko.Service.ArticleService;
import com.example.ormarko.ormarko.Service.ClosetService;
import com.example.ormarko.ormarko.Service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/default")
public class UnregisteredUserController {

    private final ClosetService closetService;
    private final LocationService locationService;
    private final ArticleService articleService;

    public UnregisteredUserController(ClosetService closetService, LocationService locationService, ArticleService articleService) {
        this.closetService = closetService;
        this.locationService = locationService;
        this.articleService = articleService;
    }

    @GetMapping("getAll")
    public List<ArticleUser> getUser(){ //vraća sve artikle dostupne neregistriranom korisniku
        return articleService.findAllArticlesBySharing(true);
    }


}