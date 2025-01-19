package com.example.ormarko.ormarko.Service;

import com.example.ormarko.ormarko.CustomUser;
import com.example.ormarko.ormarko.Model.ArticleUser;
import com.example.ormarko.ormarko.Model.Closet;
import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;

    // Constructor Injection
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public User updateUserLocation(String city, String country, String username) {
        User user = repository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        user.setCountry(country);
        user.setCity(city);
        return repository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = repository.findByUsername(username);
        if (user.isPresent()) {
            var userObject = user.get();
            return CustomUser.builder()
                    .username(userObject.getUsername())
                    .password(userObject.getPass())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }

    public List<ArticleUser> filter(List<ArticleUser> articles, Map<String, String[]> body) {
        boolean isEmpty = true;

        if(body.containsKey("kategorija") && body.get("kategorija").length > 0){
            isEmpty = false;
            articles = articles.stream().filter(a -> {
                for(String s : body.get("kategorija")){
                    if (a.getCategory().toString().equals(s)) return true;
                }
                return false;
            }).toList();
        }

        if (body.containsKey("godisnjeDoba") && body.get("godisnjeDoba").length > 0) {
            isEmpty = false;
            articles = articles.stream().filter(a -> {
                for(String s : body.get("godisnjeDoba")){
                    if (a.getSeason().toString().equals(s)) return true;
                }
                return false;
            }).toList();
        }

        if (body.containsKey("otvorenost") && body.get("otvorenost").length > 0) {
            isEmpty = false;
            articles = articles.stream().filter(a -> {
                for(String s : body.get("otvorenost")){
                    if (a.getOpenness().toString().equals(s)) return true;
                }
                return false;
            }).toList();
        }

        if (body.containsKey("lezernost") && body.get("lezernost").length > 0) {
            isEmpty = false;
            articles = articles.stream().filter(a -> {
                for(String s : body.get("lezernost")){
                    if (a.getHowCasual().toString().equals(s)) return true;
                }
                return false;
            }).toList();
        }

        if (body.containsKey("boja") && body.get("boja").length > 0) {
            isEmpty = false;
            articles = articles.stream().filter(a -> {
                for(String s : body.get("boja")){
                    if (a.getMainColor().toString().equals(s) || a.getSideColor().toString().equals(s)) return true;
                }
                return false;
            }).toList();
        }

        if(isEmpty) return new ArrayList<>();

        return articles;
    }
}
