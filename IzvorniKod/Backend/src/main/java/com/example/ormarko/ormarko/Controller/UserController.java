package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.*;
import com.example.ormarko.ormarko.Service.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.Valid;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.GrantedAuthority;


import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import java.util.*;


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

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        System.out.println("ROLES: "+ roles);

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

        return closetService.findAllClosetsForUser(username).stream().sorted(Comparator.comparing(Closet::getClosetId)).toList();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/profile/addCloset")
    void addCloset(Authentication authentication) {
        String username = authentication.getName();

        Closet closet = new Closet();
        closet.setClosetOwner(username);

       if(closetService.saveCloset(closet) == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Closet not created");

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/profile/deleteCloset{id}")
    void deleteCloset(@PathVariable Integer id) {
        closetService.deleteCloset(closetService.findClosetById(id));
    }


    @GetMapping("/profile/closet{id}/allLocations")
    public List<Location> getCloset(Authentication authentication, @PathVariable Integer id){

        String username = authentication.getName();
        if(!username.equals(closetService.findClosetById(id).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Closet not found.");

        return locationService.findAllLocationsForCloset(id).stream().sorted(Comparator.comparing(Location::getLocationId)).toList();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/profile/closet{id}/addLocation")
    void addLocation(Authentication authentication, @PathVariable Integer id, @RequestBody Map<String, String> body) {
        //String username = authentication.getName();
        LocationType locationType = LocationType.valueOf(body.get("tipLokacije"));
        Location location = new Location();
        location.setClosetId(id);
        location.setTypeLoc(locationType);

        if(locationService.saveLocation(location) == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Location not created");

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/profile/deleteLocation{id}")
    void deleteLocation(@PathVariable Integer id) {
        locationService.deleteLocation(locationService.findLocationById(id));
    }


    @GetMapping("/profile/location{id}/allArticles")
    public List<ArticleUser> getLocation(Authentication authentication, @PathVariable Integer id){

        String username = authentication.getName();
        if (!username.equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found.");

        return articleService.findAllArticlesForLocation(id).stream().sorted(Comparator.comparing(ArticleUser::getArticleId)).toList();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/profile/location{id}/addArticle")
    void addArticle(Authentication authentication, @PathVariable Integer id, @RequestBody /*@Valid*/ ArticleUser article) {
        Location location = locationService.findLocationById(id);
        article.setLocationId(location.getLocationId());
        log.info("Received location ID: {}", id);

        if(articleService.save(article) == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Article not created");

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/profile/deleteArticle{id}")
    void deleteArticle(@PathVariable Integer id) {
        articleService.delete(articleService.findArticleById(id));
    }



    @PostMapping("/searchUsingGeolocation")
    public Pair<List<ArticleUser>, List<User>> geoSearch(Authentication authentication, @RequestBody Map<String, String[]> body){

        String username = authentication.getName();
        String userCity = userService.findByUsername(username).get().getCity();

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

                    return ou.get().getCity().equals(userCity);
                })
                .toList();

        return Pair.of(articles, articles.stream()
                .map(article -> locationService.findLocationById(article.getLocationId()))
                .map(location -> closetService.findClosetById(location.getClosetId()))
                .map(closet -> userService.findByUsername(closet.getClosetOwner()))
                .map(Optional::get)
                .toList());
    }



    @PostMapping("/search")
    public Pair<List<ArticleUser>, List<User>> search(@RequestBody Map<String, String[]> body){

        log.info("Received POST request to /search!");
        log.info("Body: " + body);

        List<ArticleUser> articles = articleService.findAllArticlesBySharing(true);

        articles = userService.filter(articles, body).stream().sorted(Comparator.comparing(ArticleUser::getArticleId)).toList();

        return Pair.of(articles, articles.stream()
                .map(article -> locationService.findLocationById(article.getLocationId()))
                .map(location -> closetService.findClosetById(location.getClosetId()))
                .map(closet -> userService.findByUsername(closet.getClosetOwner()))
                .map(Optional::get)
                .toList());
    }


    @PostMapping("/profile/localSearch")
    public Pair<List<ArticleUser>, List<Pair<Integer, LocationReturnData>>> localSearch(Authentication authentication, @RequestBody Map<String, String[]> body){

        log.info("Received POST request to /profile/localSearch!");
        log.info("Body: " + body);

        String username = authentication.getName();

        List<ArticleUser> articles = closetService.findAllClosetsForUser(username).stream()
                .map(closet -> locationService.findAllLocationsForCloset(closet.getClosetId()))
                .flatMap(List::stream)
                .map(location -> articleService.findAllArticlesForLocation(location.getLocationId()))
                .flatMap(List::stream)
                .sorted(Comparator.comparing(ArticleUser::getArticleId))
                .toList();

        articles = userService.filter(articles, body);

        List<Integer> locationIds = articles.stream()
                .map(ArticleUser::getLocationId)
                .sorted()
                .toList();

        log.info("LocationIds: " + locationIds);

        List<Integer> closetIds = locationIds.stream()
                .map(id -> locationService.findLocationById(id).getClosetId())
                .sorted()
                .toList();

        log.info("ClosetIds: " + closetIds);

        List<Integer> allClosetIds = closetService.findAllClosetsForUser(username).stream()
                .map(Closet::getClosetId)
                .sorted()
                .toList();

        log.info("AllClosetIds: " + allClosetIds);

        List<List<Location>> allLocationByClosetForGivenArticle = locationIds.stream()
                .map(id -> locationService.findLocationById(id).getClosetId())
                .map(locationService::findAllLocationsForCloset)
                .map(list -> list.stream().sorted(Comparator.comparing(Location::getLocationId)).toList())
                .toList();


        List<LocationReturnData> rLoc = new ArrayList<>();

        for(int i = 0; i < locationIds.size(); i++) {
            Integer p = 0, l = 0, s = 0;
            List<Location> neighborLocations = allLocationByClosetForGivenArticle.get(i);
            Integer id = locationIds.get(i);

            for(Location neighborLocation : neighborLocations) {
                if(neighborLocation.getLocationId() == id) {
                    switch (neighborLocation.getTypeLoc()){
                        case LADICA -> rLoc.add(new LocationReturnData(id, LocationType.LADICA, l));
                        case POLICA -> rLoc.add(new LocationReturnData(id, LocationType.POLICA, p));
                        case ŠIPKA_ZA_ODJEĆU -> rLoc.add(new LocationReturnData(id, LocationType.ŠIPKA_ZA_ODJEĆU, s));
                    }
                    break;
                }

                switch (neighborLocation.getTypeLoc()){
                    case LADICA -> l++;
                    case POLICA -> p++;
                    case ŠIPKA_ZA_ODJEĆU -> s++;
                }
            }

        }

        closetIds = closetIds.stream().map(allClosetIds::indexOf).toList();

        List<Pair<Integer, LocationReturnData>> pairs = new ArrayList<>();
        for(int i = 0; i < rLoc.size(); i++){
            pairs.add(Pair.of(closetIds.get(i), rLoc.get(i)));
        }

        //articles = userService.filter(articles, body);

        return Pair.of(articles, pairs);
    }

    @PostMapping("/updateGeolocation")
    public ResponseEntity<User> updateLocation(@RequestBody Map<String, String> requestBody, Authentication authentication) {
        String city = requestBody.get("city");
        String country = requestBody.get("country");
        String username = authentication.getName();
        User updatedUser = userService.updateUserLocation(city, country, username);
        return ResponseEntity.ok(updatedUser);
    }
}