package com.example.ormarko.ormarko.Controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class ContentController {

    @GetMapping("/home")
    public String home(){
        return "home";
    }
    @GetMapping("/user")
    public String user(){
        return "user";
    }

}
