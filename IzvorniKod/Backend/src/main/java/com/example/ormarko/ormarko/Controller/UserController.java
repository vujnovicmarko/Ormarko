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
import java.util.concurrent.ThreadLocalRandom;
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
            User user = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            return Map.of(
                    "googleoauth", true,
                    "username", user.getUsername(),
                    "email", user.getE_mail(),
                    "city", user.getCity(),
                    "country", user.getCountry()

            );
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

        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }

        log.info("Current username: " + username);

        if (userService.findByUsername(username).isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        return closetService.findAllClosetsForUser(username).stream().sorted(Comparator.comparing(Closet::getClosetId)).toList();
    }

    //dodaje novi ormar za trenutnog korisnika
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/profile/addCloset")
    void addCloset(Authentication authentication) {
        String username = authentication.getName();

        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }

        Closet closet = new Closet();
        closet.setClosetOwner(username);

       if(closetService.saveCloset(closet) == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Closet not created");

    }

    //briše ormar s poslanim indexom
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/profile/deleteCloset{id}")
    void deleteCloset(@PathVariable Integer id) {
        closetService.deleteCloset(closetService.findClosetById(id));
    }

    //dohvaća sve lokacije za dani ormar
    @GetMapping("/profile/closet{id}/allLocations")
    public List<Location> getCloset(Authentication authentication, @PathVariable Integer id){

        String username = authentication.getName();
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }

        if(!username.equals(closetService.findClosetById(id).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Closet not found.");

        return locationService.findAllLocationsForCloset(id).stream().sorted(Comparator.comparing(Location::getLocationId)).toList();
    }

    //dodaje novu lokaciju u dani ormar
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/profile/closet{id}/addLocation")
    void addLocation(Authentication authentication, @PathVariable Integer id, @RequestBody Map<String, String> body) {

        LocationType locationType = LocationType.valueOf(body.get("tipLokacije"));
        Location location = new Location();
        location.setClosetId(id);
        location.setTypeLoc(locationType);

        if(locationService.saveLocation(location) == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Location not created");

    }


    //briše lokaciju sa danim id-em
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/profile/deleteLocation{id}")
    void deleteLocation(@PathVariable Integer id) {
        locationService.deleteLocation(locationService.findLocationById(id));
    }


    //dohvaća sve artikle za danu lokaciju
    @GetMapping("/profile/location{id}/allArticles")
    public List<ArticleUser> getLocation(Authentication authentication, @PathVariable Integer id){

        String username = authentication.getName();
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }

        if (!username.equals(closetService.findClosetById(locationService.findLocationById(id).getClosetId()).getClosetOwner()))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found.");

        return articleService.findAllArticlesForLocation(id).stream().sorted(Comparator.comparing(ArticleUser::getArticleId)).toList();
    }


    //dodaje novi artikl na danu lokaciju
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/profile/location{id}/addArticle")
    void addArticle(Authentication authentication, @PathVariable Integer id, @RequestBody /*@Valid*/ ArticleUser article) {
        Location location = locationService.findLocationById(id);
        article.setLocationId(location.getLocationId());
        log.info("Received location ID: {}", id);

        if(articleService.save(article) == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Article not created");

    }


    //briše artikl sa zadanim id-em
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/profile/deleteArticle{id}")
    void deleteArticle(@PathVariable Integer id) {
        articleService.delete(articleService.findArticleById(id));
    }


    //osvježava vidljivost za artikl sa zadanim id-em
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/profile/updateArticle{id}")
    void updateArticleVisibility(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        Boolean visibility = Boolean.valueOf(body.get("visibility"));
        ArticleUser article = articleService.findArticleById(id);
        article.setSharing(visibility);
        articleService.save(article);
    }


    //kao i običan search, ali dodatno filtrira podatka na temelju grada u kojem se nalazi trenutno ulogirani korisnik
    @PostMapping("/searchUsingGeolocation")
    public Pair<List<ArticleUser>, List<User>> geoSearch(Authentication authentication, @RequestBody Map<String, String[]> body){

        String username = authentication.getName();
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }

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


    @PostMapping("/searchUUG")
    public Pair<List<ArticleUser>, List<User>> geoSearchForUnregisteredUsers(@RequestBody Map<String, String[]> body, @RequestParam String UUlocation){
        System.out.println("body"+ body);
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

                    return ou.get().getCity().equals(UUlocation);
                })
                .toList();

        return Pair.of(articles, articles.stream()
                .map(article -> locationService.findLocationById(article.getLocationId()))
                .map(location -> closetService.findClosetById(location.getClosetId()))
                .map(closet -> userService.findByUsername(closet.getClosetOwner()))
                .map(Optional::get)
                .toList());
    }



    // vraća sve vidljive podatke filtrirane na temelju predanog kriterija
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

    // vraća sve podatke koji se nalaze u ormaru trenutnog korisnika, filtrirane na temelju predanog kriterija
    @PostMapping("/profile/localSearch")
    public Pair<List<ArticleUser>, List<Pair<Integer, LocationReturnData>>> localSearch(Authentication authentication, @RequestBody Map<String, String[]> body){

        log.info("Received POST request to /profile/localSearch!");
        log.info("Body: " + body);

        String username = authentication.getName();
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }


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

        return Pair.of(articles, pairs);
    }

    @PostMapping("/updateGeolocation")
    public ResponseEntity<User> updateLocation(@RequestBody Map<String, String> requestBody, Authentication authentication) {
        String city = requestBody.get("city");
        String country = requestBody.get("country");
        String username = authentication.getName();
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            username = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }
        User updatedUser = userService.updateUserLocation(city, country, username);
        return ResponseEntity.ok(updatedUser);

    }

    @PostMapping("/getCombinationBasedOnWeather")
    public ResponseEntity<List<ArticleUser>> getCombinationBasedOnWeather(@RequestBody Map<String, String> requestBody, Authentication authentication) {
        String weatherFilters = requestBody.get("articleOpen");
        log.info("Received POST request to /getCombinationBasedOnWeather!");
        log.info("Body: " + weatherFilters);
        List<ArticleUser> articleSet = new ArrayList<>();

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            currentUsername = userService.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")).getUsername();
        }

        Map<String, String[]> customFilter = new HashMap<>();
        customFilter.put("kategorija", new String[]{});
        customFilter.put("godisnjeDoba", new String[]{});
        customFilter.put("otvorenost", new String[]{weatherFilters.toUpperCase()});
        customFilter.put("lezernost", new String[]{});
        customFilter.put("boja", new String[]{});

        List<ArticleUser> articles = closetService.findAllClosetsForUser(currentUsername).stream()
                .map(closet -> locationService.findAllLocationsForCloset(closet.getClosetId()))
                .flatMap(List::stream)
                .map(location -> articleService.findAllArticlesForLocation(location.getLocationId()))
                .flatMap(List::stream)
                .sorted(Comparator.comparing(ArticleUser::getArticleId))
                .toList();

        List<ArticleUser> articleBot;
        List<ArticleUser> articleJacket;
        boolean postoji_haljina = false;
        List<ArticleUser> articleDress = null;

        Set<ArticleUser> ArticleTopSet = articles.stream()
                .filter(article -> article.getCategory() == ArticleCategory.MAJICA || article.getCategory() == ArticleCategory.KOŠULJA)
                .collect(Collectors.toSet());

        switch (weatherFilters) {
            case "KIŠA_SNIJEG" -> {
                Set<ArticleUser> ArticleJacketSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.KAPUT)
                        .collect(Collectors.toSet());
                articleJacket = new ArrayList<>(ArticleJacketSet);

                Set<ArticleUser> ArticleBotSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.TRENIRKA_DONJI_DIO || article.getCategory() == ArticleCategory.TRAPERICE)
                        .collect(Collectors.toSet());
                articleBot = new ArrayList<>(ArticleBotSet);
            }
            case "ZATVORENO" -> {
                Set<ArticleUser> ArticleJacketSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.JAKNA)
                        .collect(Collectors.toSet());
                articleJacket = new ArrayList<>(ArticleJacketSet);

                Set<ArticleUser> ArticleBotSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.SUKNJA
                                || article.getCategory() == ArticleCategory.TRENIRKA_DONJI_DIO || article.getCategory() == ArticleCategory.TRAPERICE)
                        .collect(Collectors.toSet());
                articleBot = new ArrayList<>(ArticleBotSet);
            }
            case "OTVORENO" -> {
                Set<ArticleUser> ArticleJacketSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.TRENIRKA_GORNJI_DIO)
                        .collect(Collectors.toSet());
                articleJacket = new ArrayList<>(ArticleJacketSet);

                Set<ArticleUser> ArticleDressSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.HALJINA)
                        .collect(Collectors.toSet());
                articleDress = new ArrayList<>(ArticleDressSet);
                postoji_haljina = true;

                Set<ArticleUser> ArticleBotSet = articles.stream()
                        .filter(article -> article.getCategory() == ArticleCategory.SUKNJA
                                || article.getCategory() == ArticleCategory.TRENIRKA_DONJI_DIO)
                        .collect(Collectors.toSet());
                articleBot = new ArrayList<>(ArticleBotSet);
            }
            default -> throw new IllegalStateException("Unexpected value: " + weatherFilters);
        }


        articles = userService.filter(articles, customFilter);

        Set<ArticleUser> ArticleBootsSet = articles.stream()
                .filter(article -> article.getCategory() == ArticleCategory.CIPELE || article.getCategory() == ArticleCategory.TENISICE
                        || article.getCategory() == ArticleCategory.ČIZME || article.getCategory() == ArticleCategory.ŠTIKLE)
                .collect(Collectors.toSet());

        List<ArticleUser> articleTop = new ArrayList<>(ArticleTopSet);
        List<ArticleUser> articleBoots = new ArrayList<>(ArticleBootsSet);

        Random random = new Random();
        if (!articleBoots.isEmpty()){
            articleSet.add(articleBoots.get(ThreadLocalRandom.current().nextInt(articleBoots.size())));
        }
        if (!articleJacket.isEmpty()){
            articleSet.add(articleJacket.get(ThreadLocalRandom.current().nextInt(articleJacket.size())));
        }
        if (postoji_haljina){
            if (articleTop.isEmpty() || articleBot.isEmpty()) {
                articleSet.add(articleDress.get(ThreadLocalRandom.current().nextInt(articleDress.size())));
            }
            else{
                if (random.nextInt(100) < 20){
                    articleSet.add(articleDress.get(ThreadLocalRandom.current().nextInt(articleDress.size())));
                }
                else {
                    articleSet.add(articleTop.get(ThreadLocalRandom.current().nextInt(articleTop.size())));
                    articleSet.add(articleBot.get(ThreadLocalRandom.current().nextInt(articleBot.size())));
                }
            }
        } else {
            if (!articleTop.isEmpty()){
                articleSet.add(articleTop.get(ThreadLocalRandom.current().nextInt(articleTop.size())));
            }
            if (!articleBot.isEmpty()){
                articleSet.add(articleBot.get(ThreadLocalRandom.current().nextInt(articleBot.size())));
            }
        }
        return ResponseEntity.ok(articleSet);
    }
}