package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Service.MarketerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MarketerLoginController {

    private final AuthenticationManager marketerAuthenticationManager;
    private final MarketerService marketerService;

    //ovdje krivi authentication inicijalizira - onaj za user
    public MarketerLoginController(@Qualifier("marketerAuthenticationManager") AuthenticationManager marketerAuthenticationManager, MarketerService marketerService) {
        this.marketerAuthenticationManager = marketerAuthenticationManager;
        this.marketerService = marketerService;
        System.out.println("AuthenticationManager initialized:" + marketerAuthenticationManager);
    }

    @PostMapping("/marketer")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpServletRequest request) {
        String username = credentials.get("username");
        String password = credentials.get("pass");
        System.out.println("USERNAME:" + username);

        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(username, password);

            //ovdje ode na krivi - koristi kao iz security config i onda trazi tog oglašivačau krivoj tablici - users
            Authentication authentication = marketerAuthenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("AUTHENTICATION: " + authentication);

            SecurityContext context = SecurityContextHolder.getContext();
            context.setAuthentication(authentication);
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", context);

            if (authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_MARKETER"))) {

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
