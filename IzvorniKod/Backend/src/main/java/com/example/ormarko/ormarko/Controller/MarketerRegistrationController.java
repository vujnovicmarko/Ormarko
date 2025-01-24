package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.Marketer;
import com.example.ormarko.ormarko.Repository.MarketerRepository;
import com.example.ormarko.ormarko.Repository.UserRepository;
import com.example.ormarko.ormarko.Service.MarketerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MarketerRegistrationController {

    @Autowired
    private MarketerRepository marketerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    private final AuthenticationManager marketerAuthenticationManager;
    @Autowired
    private MarketerService marketerService;

    public MarketerRegistrationController(@Qualifier("marketerAuthenticationManager") AuthenticationManager marketerAuthenticationManager) {
        this.marketerAuthenticationManager = marketerAuthenticationManager;
    }

    @PostMapping(value = "/signup/marketer")
    public ResponseEntity<?> createUser(@RequestBody Marketer marketer, HttpServletRequest request) {
        System.out.println("Received marketer registration request: " + marketer);


        if (marketerRepository.findByEmail(marketer.geteMail()).isPresent()) {
            System.err.println("Email already in use: " + marketer.geteMail());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email is already in use. Please use a different email."));
        }
        if (marketerRepository.findByUsername(marketer.getUsername()).isPresent()) {
            System.err.println("Username already in use: " + marketer.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Username is already in use. Please use a different username."));
        }


        if (userRepository.findByEmail(marketer.geteMail()).isPresent()) {
            System.err.println("Email already in use by a user: " + marketer.geteMail());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email is already in use. Please use a different email."));
        }
        if (userRepository.findByUsername(marketer.getUsername()).isPresent()) {
            System.err.println("Username already in use by a user: " + marketer.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Username is already in use. Please use a different username."));
        }



        String rawPassword = marketer.getPass();
        marketer.setPass(passwordEncoder.encode(marketer.getPass()));


        Marketer savedMarketer;
        try {
            savedMarketer = marketerRepository.save(marketer);
            System.out.println("Saved marketer to database: " + savedMarketer);
        } catch (Exception e) {
            System.err.println("Error saving marketer: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save marketer. Please try again."));
        }


        try {
            UserDetails userDetails = marketerService.loadUserByUsername(marketer.getUsername());
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, rawPassword, userDetails.getAuthorities());

            Authentication authentication = marketerAuthenticationManager.authenticate(authToken);
            SecurityContext context = SecurityContextHolder.getContext();
            context.setAuthentication(authentication);
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", context);

            System.out.println("Current Authentication: " + SecurityContextHolder.getContext().getAuthentication());
        } catch (Exception e) {
            System.err.println("Error during authentication: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to authenticate marketer. Please try again."));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedMarketer);
    }
}
