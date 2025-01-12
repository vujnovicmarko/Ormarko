package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.*;
import com.example.ormarko.ormarko.Service.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

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
            return Map.of("googleoauth", true, "email", email);
        } else {
            String username = authentication.getName();
            User user = userService.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            return Map.of(
                    "googleoauth", false,
                    "username", user.getUsername(),
                    "email", user.getE_mail(),
                    "city", user.getCity(),
                    "country", user.getCountry()
            );
        }
    }

    @GetMapping("/profile/allClosets")
    public List<Closet> getUserContent(Authentication authentication) { //vraća podatke trenutno ulogiranog korisnika

        String username = authentication.getName();
        if (userService.findByUsername(username).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        return closetService.findAllClosetsForUser(username);
    }



    @GetMapping("/profile/closet{id}/allLocations")
    public List<Location> getCloset(Authentication authentication, @PathVariable Integer id){

        String username = authentication.getName();
        if(!username.equals(closetService.findClosetById(id).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Closet not found.");

        return locationService.findAllLocationsForCloset(id);
    }


    @GetMapping("/profile/location{id}/allArticles")
    public List<ArticleUser> getLocation(Authentication authentication, @PathVariable Integer id){

        String username = authentication.getName();
        if (!username.equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found.");

        return articleService.findAllArticlesForLocation(id);
    }

    @PostMapping("/search")
    public List<ArticleUser> search(Authentication authentication, @RequestBody Map<String, String> body){

        log.info("Received POST request to /search!");

        String username = authentication.getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        ArticleCategory category = ArticleCategory.valueOf(body.get("kategorija"));
        ArticleSeason season = ArticleSeason.valueOf(body.get("godisnjeDoba"));
        ArticleOpen openness = ArticleOpen.valueOf(body.get("otvorenost"));
        ArticleCasual casual = ArticleCasual.valueOf(body.get("lezernost"));
        ArticleColor color = ArticleColor.valueOf(body.get("boja"));

        log.info("Finished parsing POST json!");

        List<ArticleUser> articles = articleService.findAllArticlesByFilter(true, category, season, openness, casual, color);

//        return articles.stream().filter(article -> {                        //filtriranje po lokaciji korisnika i vlasnika artikla
//                    Optional<User> ou = userService.findByUsername(
//                            closetService.findClosetById(
//                                    locationService.findLocationById(
//                                            article.getLocationId()
//                                    ).getClosetId()
//                            ).getClosetOwner()
//                    );
//
//                    if (ou.isEmpty()) return false;
//
//                    return ou.get().getCountry().equals(user.getCountry());
//                }
//        ).toList();

        log.info("Received data from filter!");

        return articles;       //ako zelimo sve artikle neovisno o lokaciji korisnika

    }

}