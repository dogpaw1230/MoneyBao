package com.moneyBao.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalendarController {
    @GetMapping("/calendarpage")
    public String calendar() {
        return "calendar";
    }
}
