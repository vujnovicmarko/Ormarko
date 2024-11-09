package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.User;
import com.example.ormarko.ormarko.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping(value = "/signup/user")
    public User createUser(@RequestBody User user){
        //user.setCity("Zagreb");
        //user.setCountry("Croatia");
        user.setPass(passwordEncoder.encode(user.getPass()));
        return userRepository.save(user);
    }

}