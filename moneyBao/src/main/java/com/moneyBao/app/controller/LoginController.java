package com.moneyBao.app.controller;

import com.moneyBao.app.dao.UserDao;
import com.moneyBao.app.domain.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Controller
public class LoginController {

    @Autowired
    UserDao userDao;

    @GetMapping("/login/loginpage")
    public String login() {
        return "login";
    }

    @PostMapping("/login/login")
    public String loginSubmit(UserDto userDto, boolean rememberId, HttpServletRequest request, HttpServletResponse response, Model model, String prevPage) throws Exception {
        // 로그인 성공
        if (loginChk(userDto)) {
            String successMsg = URLEncoder.encode("로그인 되었습니다.", StandardCharsets.UTF_8);
            model.addAttribute("prevPage", prevPage);

            /*  id 쿠키 생성, pwd 쿠키 생성  */
            Cookie cookieId = new Cookie("MoneyBaoId", userDto.getUserId());
            Cookie cookiePwd = new Cookie("MoneyBaoPwd", userDto.getUserPw());

            if (rememberId) {
                // 쿠키 id 설정
                cookieId.setMaxAge(60 * 60 * 24 * 365);
                cookieId.setPath("/");

                // 쿠키 pwd 설정
                cookiePwd.setMaxAge(60 * 60 * 24 * 365);
                cookiePwd.setPath("/");
            } else {
                // 쿠키 id 설정
                cookieId.setMaxAge(0);
                cookieId.setPath("/");

                // 쿠키 pwd 설정
                cookiePwd.setMaxAge(0);
                cookiePwd.setPath("/");
            }
            // 응답에 쿠키 전송
            response.addCookie(cookieId);
            response.addCookie(cookiePwd);

            /* 세션 생성 - 로그인/로그아웃 기능 & 상단에 유저 닉네임 뜨게 하기 */
            HttpSession session = request.getSession();
            session.setAttribute("sessionUserId", userDto.getUserId());

            /* ***************** 이전 페이지 설정하기 *************** */
            /* *** 그러나 이번 프로젝트에서는 이전 페이지는 필요없는 기능 *** */
            /* ****** 나중에 필요할 때를 대비해서 미리 구현해놓음 ******** */
            /* 예를 들어,
                1. 상품 상세페이지에서 상품을 구매하려면(구매버튼클릭)
                2. 로그인을 해야하므로 로그인 페이지로 이동
                3. 이 때, prevPage(이전 페이지)는 상품 상세페이지가 될 것임
            */

            // prevPage가 존재하지 않으면 "/" 경로로 prevPage를 설정하고
            // 만약 존재한다면 그 페이지 경로를 prevPage로 설정
            prevPage = (prevPage == null || ("").equals(prevPage)) ? "/" : prevPage;

//            return "redirect:"+prevPage+"?msg="+successMsg; // 이전 페이지 필요하면 사용하기

            return "redirect:/calendarpage";

        } else {
            // 로그인 실패
            String errorMsg = URLEncoder.encode("일치하는 회원정보가 없습니다.", StandardCharsets.UTF_8);
            model.addAttribute("prevPage", prevPage);
            return "redirect:/login/loginpage?msg="+errorMsg;
        }
    }
    private boolean loginChk(UserDto userDto) throws Exception {
        UserDto user = userDao.selectUser(userDto);
        if (user == null) {
            log.info("user not found : " + userDto.getUserId());
            return false;
        }
        log.info("input user : " + user.getUserId() + "," + user.getUserPw());
        log.info("user found : " + userDto.getUserId() + "," + userDto.getUserPw());

        return user.getUserPw().equals(userDto.getUserPw());
    }
}
