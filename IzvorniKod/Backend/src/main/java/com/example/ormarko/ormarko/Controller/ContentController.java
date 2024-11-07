package com.example.ormarko.ormarko.Controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class ContentController {

    @GetMapping("/profile")
    public String profile(Authentication authentication, Model model){
        String username = authentication.getName();
        var password = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        model.addAttribute("username", username);
        model.addAttribute("password", password.toString());
        return "profile";
    }
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @GetMapping("/home")
    public String home(){
        return "home";
    }

//    @GetMapping("/user")
//    public String user(Authentication authentication){
//        String username = authentication.getName();
//        String display = "Hi, " + username + " !";
//
//        return display;
//    }

    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }

}