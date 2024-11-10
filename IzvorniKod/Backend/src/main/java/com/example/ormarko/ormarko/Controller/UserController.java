package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.ArticleUser;
import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.Location;
import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Service.ArticleService;
import com.example.ormarko.ormarko.Service.ClosetService;
import com.example.ormarko.ormarko.Service.LocationService;
import com.example.ormarko.ormarko.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final ClosetService closetService;
    private final LocationService locationService;
    private final ArticleService articleService;
    private final UserService userService;

    public UserController(ClosetService closetService, LocationService locationService, ArticleService articleService, UserService userService) {
        this.closetService = closetService;
        this.locationService = locationService;
        this.articleService = articleService;
        this.userService = userService;
    }

    @GetMapping("profile")
    public User getUser(Authentication authentication){ //vraća podatke trenutno ulogiranog korisnika
        String username = authentication.getName();

        if(userService.findByUsername(username).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        return userService.findByUsername(username).get();
    }

    //TODO
    @GetMapping("/{username}/closet{id}")
    public List<Location> getCloset(@PathVariable String username, @PathVariable Integer id){ //Authentication authentication){

        //if(!authentication.getName().equals(closetService.findClosetById(id).getClosetOwner()))
        if(!username.equals(closetService.findClosetById(id).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Closet not found.");

        return locationService.findAllLocationsForCloset(id);
    }

    //TODO
    @GetMapping("/{username}/location{id}")
    public List<ArticleUser> getLocation(@PathVariable String username, @PathVariable Integer id){ //Authentication authentication){

//        if (!authentication.getName()
//                .equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
        if (!username.equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found.");

        return articleService.findAllArticlesForLocation(id);
    }
}