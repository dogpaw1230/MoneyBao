package com.moneyBao.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JoinController {
    @GetMapping("/join/joinpage")
    public String join() {
        return "join";
    }
}
