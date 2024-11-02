package com.example.ormarko.ormarko.Service;


import com.example.ormarko.ormarko.Model.ModelListForm.*;
import com.example.ormarko.ormarko.Repository.ArticleRepository;
import com.example.ormarko.ormarko.Repository.ClosetRepository;
import com.example.ormarko.ormarko.Repository.LocationRepository;
import com.example.ormarko.ormarko.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.asm.TypeReference;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;


@Component
public class JsonDataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(JsonDataLoader.class);
    private final UserRepository userRepository;
    private final ClosetRepository closetRepository;
    private final LocationRepository locationRepository;
    private final ArticleRepository articleRepository;
    private final ObjectMapper objectMapper;

    public JsonDataLoader(UserRepository userRepository, ClosetRepository closetRepository, LocationRepository locationRepository, ArticleRepository articleRepository, ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.closetRepository = closetRepository;
        this.locationRepository = locationRepository;
        this.articleRepository = articleRepository;
        this.objectMapper = objectMapper;
    }


    @Override
    public void run(String... args) throws Exception {


        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/users.json")) {
            Users allUsers = objectMapper.readValue(inputStream, Users.class);
            log.info("Reading {} users from JSON data and saving to a database.", allUsers.users().size());
            userRepository.saveAll(allUsers.users());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read users JSON data", e);
        }

        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/closets.json")) {
            Closets allClosets = objectMapper.readValue(inputStream, Closets.class);
            log.info("Reading {} closets from JSON data and saving to a database.", allClosets.closets().size());
            closetRepository.saveAll(allClosets.closets());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read closets JSON data", e);
        }

        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/locations.json")) {
            Locations allLocations = objectMapper.readValue(inputStream, Locations.class);
            log.info("Reading {} locations from JSON data and saving to the database.", allLocations.locations().size());
            locationRepository.saveAll(allLocations.locations());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read locations JSON data", e);
        }

        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/articles.json")) {
            Articles allArticles = objectMapper.readValue(inputStream, Articles.class);
            log.info("Reading {} articles from JSON data and saving to the database.", allArticles.articles().size());
            articleRepository.saveAll(allArticles.articles());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read articles JSON data", e);
        }

        log.info("Finished loading all JSON data.");
    }
}

