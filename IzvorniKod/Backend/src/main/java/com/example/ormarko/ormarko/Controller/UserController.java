package com.example.ormarko.ormarko.Controller;

import org.springframework.security.core.context.SecurityContextHolder;
import com.example.ormarko.ormarko.Model.ArticleUser;
import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.Location;
import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Service.ArticleService;
import com.example.ormarko.ormarko.Service.ClosetService;
import com.example.ormarko.ormarko.Service.LocationService;
import com.example.ormarko.ormarko.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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

    //za sad ovo za dohvat podataka o profilu, dok ne implementiramo način spremanja username-a za Google login
    @GetMapping("/profile")
    public Map<String, Object> getUser(Authentication authentication) {
        System.out.println("Current Authentication on /profile: " + SecurityContextHolder.getContext().getAuthentication());

        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            return Map.of("googleUser", true, "email", email);
        } else {
            String username = authentication.getName();
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            return Map.of(
                    "googleUser", false,
                    "username", user.getUsername(),
                    "email", user.getE_mail(),
                    "city", user.getCity(),
                    "country", user.getCountry()
            );
        }
    }
/*
    @GetMapping("/profile")
    public User getUser(Authentication authentication) { //vraća podatke trenutno ulogiranog korisnika
        String username = authentication.getName();

        if (userService.findByUsername(username).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        return userService.findByUsername(username).get();
    }

 */

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