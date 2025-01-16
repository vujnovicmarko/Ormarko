package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.ArticleUser;
import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.Location;
import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Service.ArticleService;
import com.example.ormarko.ormarko.Service.ClosetService;
import com.example.ormarko.ormarko.Service.LocationService;
import com.example.ormarko.ormarko.Service.UserService;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/default")
public class UnregisteredUserController {

    private final ClosetService closetService;
    private final LocationService locationService;
    private final ArticleService articleService;
    private final UserService userService;

    public UnregisteredUserController(ClosetService closetService, LocationService locationService, ArticleService articleService, UserService userService) {
        this.closetService = closetService;
        this.locationService = locationService;
        this.articleService = articleService;
        this.userService = userService;
    }

    @GetMapping("getAll")
    public Pair<List<ArticleUser>, List<User>> getAll(){ //vraća sve artikle dostupne neregistriranom korisniku
        List<ArticleUser> articles = articleService.findAllArticlesBySharing(true);
        return Pair.of(articles, articles.stream()
                .map(article -> locationService.findLocationById(article.getLocationId()))
                .map(location -> closetService.findClosetById(location.getClosetId()))
                .map(closet -> userService.findByUsername(closet.getClosetOwner()))
                .map(Optional::get)
                .toList());
    }


}