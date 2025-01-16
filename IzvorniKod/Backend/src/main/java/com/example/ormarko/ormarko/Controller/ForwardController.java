package com.example.ormarko.ormarko.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {

    @GetMapping(value = {"/profile", "/search", "/closets", "/items", "/{path:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }
}