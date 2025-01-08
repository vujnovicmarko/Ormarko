package com.example.ormarko.ormarko.Controller;

import org.springframework.web.bind.annotation.GetMapping;

public class ForwardController {

    @GetMapping("/{path:^(?!.*\\.).*}")
    public String forward() {
        return "forward:/index.html";
    }
}
