package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Service.MarketerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MarketerLoginController {

    private final AuthenticationManager authenticationManager;
    private final MarketerService marketerService;

    public MarketerLoginController(AuthenticationManager authenticationManager, MarketerService marketerService) {
        this.authenticationManager = authenticationManager;
        this.marketerService = marketerService;
    }

    @PostMapping("/marketer")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(username, password);

            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_MARKETER"))) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "role", "marketer",
                        "username", username
                ));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Access denied for marketers."));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid marketer credentials."));
        }
    }
}
