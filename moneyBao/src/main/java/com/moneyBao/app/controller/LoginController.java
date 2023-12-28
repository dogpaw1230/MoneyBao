package com.moneyBao.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {
    @GetMapping("/login/loginpage")
    public String login() {
        return "login";
    }

    @PostMapping("/login/login")
    public String loginChk() {
        return "redirect:/calendarpage";
    }
}
