package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Repository.MarketerRepository;
import com.example.ormarko.ormarko.Repository.UserRepository;
import com.example.ormarko.ormarko.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
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
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MarketerRepository marketerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //rješavanje prikaza podataka za novog usera (inače čuvalo stare podatke)

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @PostMapping(value = "/signup/user")
    public ResponseEntity<?> createUser(@RequestBody User user, HttpServletRequest request){
        //user.setCity("Zagreb");
        //user.setCountry("Croatia");


        if (userRepository.findByEmail(user.getE_mail()).isPresent() || marketerRepository.findByEmail(user.getE_mail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email is already in use. Please use a different email."));
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent() || marketerRepository.findByUsername(user.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Username is already in use. Please use a different username."));
        }


        String rawPassword = user.getPass();
        user.setPass(passwordEncoder.encode(user.getPass()));
        User savedUser = userRepository.save(user);

        /*
        //autentificiraj novog korisnika pri registraciji
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(user.getUsername(), rawPassword);
        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //request.getSession(true);
        System.out.println("Current Authentication: " + SecurityContextHolder.getContext().getAuthentication());
        return savedUser;

         */
        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userDetails, rawPassword, userDetails.getAuthorities());

        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);
        HttpSession session = request.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", context);

        System.out.println("Current Authentication: " + SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

}