package com.example.ormarko.ormarko.Controller;

import com.example.ormarko.ormarko.Model.MyRegisteredUser;
import com.example.ormarko.ormarko.Model.MyRegisteredUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private MyRegisteredUserRepository myRegisteredUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping(value = "/register/user")
    public MyRegisteredUser createUser(@RequestBody MyRegisteredUser user){
        user.setCity("Zagreb");
        user.setCountry("Croatia");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myRegisteredUserRepository.save(user);
    }


}
