package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.Marketer;
import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Service.MarketerService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/marketer")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MarketerController {

    private final MarketerService marketerService;

    public MarketerController(MarketerService marketerService) {
        this.marketerService = marketerService;
    }

    @GetMapping("/profile")
    public Map<String, Object> getMarketerProfile(Authentication authentication) {
        System.out.println("Current Authentication on /marketer/profile: " + SecurityContextHolder.getContext().getAuthentication());

        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String eMail = oAuth2User.getAttribute("eMail");
            return Map.of("googleoauth", true, "email", eMail);
        } else {
            String username = authentication.getName();
            Marketer marketer = marketerService.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));
            return Map.of(
                    "googleoauth", false,
                    "username", marketer.getUsername(),
                    "email", marketer.geteMail(),
                    "logo", marketer.getLogo()
            );
        }
    }

    //kod implementiranja galerije

    /*
    @GetMapping("/gallery")
    public List<?> getMarketerGallery(Authentication authentication) {
        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));

        return marketerService.getGalleryItems(marketer.getId());
    }



    @PostMapping("/gallery/add")
    public Map<String, String> addGalleryItem(@RequestBody Map<String, Object> galleryItem, Authentication authentication) {
        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));

        marketerService.addGalleryItem(marketer.getId(), galleryItem);
        return Map.of("message", "Gallery item added successfully");
    }

    @DeleteMapping("/gallery/{itemId}")
    public Map<String, String> deleteGalleryItem(@PathVariable Long itemId, Authentication authentication) {
        String username = authentication.getName();
        Marketer marketer = marketerService.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marketer not found"));

        marketerService.removeGalleryItem(marketer.getId(), itemId);
        return Map.of("message", "Gallery item removed successfully");
    }


     */
}
