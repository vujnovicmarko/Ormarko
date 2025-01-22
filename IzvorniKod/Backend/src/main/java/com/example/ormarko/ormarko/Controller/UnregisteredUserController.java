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
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
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

    @PostMapping("/searchUnregisteredUserwithGeolocation")
    public Pair<List<ArticleUser>, List<User>> geoSearchForUnregisteredUsers(@RequestParam String givenlocation, @RequestBody Map<String, String[]> body){
        List<ArticleUser> articles = articleService.findAllArticlesBySharing(true);
        articles = userService.filter(articles, body).stream().sorted(Comparator.comparing(ArticleUser::getArticleId)).toList();


        articles = articles.stream().filter(article -> {                        //filtriranje po lokaciji korisnika i vlasnika artikla
                    Optional<User> ou = userService.findByUsername(
                            closetService.findClosetById(
                                    locationService.findLocationById(
                                            article.getLocationId()
                                    ).getClosetId()
                            ).getClosetOwner()
                    );
                    if (ou.isEmpty()) return false;

                    return ou.get().getCity().equals(givenlocation);
                })
                .toList();

        return Pair.of(articles, articles.stream()
                .map(article -> locationService.findLocationById(article.getLocationId()))
                .map(location -> closetService.findClosetById(location.getClosetId()))
                .map(closet -> userService.findByUsername(closet.getClosetOwner()))
                .map(Optional::get)
                .toList());
    }


}