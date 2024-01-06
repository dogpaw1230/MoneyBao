package com.moneyBao.app.controller;

import com.moneyBao.app.dao.UserDao;
import com.moneyBao.app.domain.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Controller
public class JoinController {

    @Autowired
    UserDao userDao;

    @GetMapping("/join/joinpage")
    public String joinPage() {
        return "join";
    }

    @PostMapping("/join/join")
    public String join(UserDto userDto) {
        userDao.insertUser(userDto);
        return "redirect:/login/loginpage";
    }

    @PostMapping("/join/usernamechk")
    @ResponseBody
    public int userNameChk(@RequestParam("userName") String userName) {
        try {
            int cnt = userDao.userNameChk(userName);
            log.info(String.valueOf(cnt));
            return cnt;
        } catch (Exception e) {
            log.error("Error in userNameChk", e);
            throw e;
        }
    }
}
