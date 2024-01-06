package com.moneyBao.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class CalendarController {
    @GetMapping("/calendarpage")
    public String calendar(HttpSession session, HttpServletRequest request, Model model) {
        if (!loginChk(request)) {
            return "redirect:/login/loginpage";
        }

        String userId = (String) session.getAttribute("sessionUserId");
        // userId로 다오, 매퍼에서 닉네임 찾아오는 로직짜고 닉네임 오른쪽 상단에 표시하기(jsp)
        return "calendar";
    }

    private boolean loginChk(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return session.getAttribute("sessionUserId")!= null;
    }
}
