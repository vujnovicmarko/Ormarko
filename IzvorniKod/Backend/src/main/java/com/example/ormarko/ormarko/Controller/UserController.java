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
@RequestMapping("api/user")
public class UserController {

    private final ClosetService closetService;
    private final LocationService locationService;
    private final ArticleService articleService;

    public UserController(ClosetService closetService, LocationService locationService, ArticleService articleService) {
        this.closetService = closetService;
        this.locationService = locationService;
        this.articleService = articleService;
    }

    @GetMapping("{username}")
    public List<Closet> getUser(@PathVariable String username){//Authentication authentication){
        //String username = authentication.getName();
        return closetService.findAllClosetsForUser(username);
    }

    @GetMapping("/{username}/closet{id}")
    public List<Location> getCloset(@PathVariable String username, @PathVariable Integer id){ //Authentication authentication){

        //if(!authentication.getName().equals(closetService.findClosetById(id).getClosetOwner()))
        if(!username.equals(closetService.findClosetById(id).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Closet not found.");

        return locationService.findAllLocationsForCloset(id);
    }

    @GetMapping("/{username}/location{id}")
    public List<ArticleUser> getLocation(@PathVariable String username, @PathVariable Integer id){ //Authentication authentication){

//        if (!authentication.getName()
//                .equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
        if (!username.equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found.");

        return articleService.findAllArticlesForLocation(id);
    }
}
