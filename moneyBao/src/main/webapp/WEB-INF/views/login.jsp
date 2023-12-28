<%@ page import="java.net.URLDecoder" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page session="false" %>	<%-- 이 페이지에서는 세션을 새로 생성 안하겠다 라는 뜻 --%>
<html>
<head>
    <title>MoneyBao_Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<c:url value='/img/Logo5.png'/> " type="image/x-icon" alt="Flaticon">
    <link rel="stylesheet" href="<c:url value='/css/login.css'/> ">
    <link rel="stylesheet" href="<c:url value='/css/common.css'/> ">
    <link rel="stylesheet" href="<c:url value='/font/font.css'/> ">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
</head>
<body>
<div id="wrap">
    <header class="header">
        <div class="w_1300 position">
            <div class="logo">
                <a href="<c:url value='/calendarpage'/>"><img src="<c:url value='/img/Logo5.png'/> " alt="logo"></a>
            </div>
            <ul class="menu_ul">
                <li><a href="#">달력</a></li>
                <li><a href="#">내역</a></li>
                <li><a href="#">보고서</a></li>
                <li><a href="#">설정</a></li>
            </ul>
<%--            <ul class="profile">--%>
<%--                <li>--%>
<%--                    <!-- 로그인/로그아웃 넣기, 로그인 하면 아래처럼 닉네임이나 아이디명 표시해주기 -->--%>
<%--                    <p>부자될거야 님</p>--%>
<%--                </li>--%>
<%--                <li>--%>
<%--                    <img src="<c:url value='/img/bamboo_icon.png'/>" alt="profile">--%>
<%--                </li>--%>
<%--            </ul>--%>
        </div>
    </header>

    <div class="login_wrap">

        <div class="login_title">
            <p>로그인</p>
        </div>

        <div class="login_input">
            <form action="<c:url value='/login/login'/>" id="loginForm" method="post">
                <input type="text" name="id" placeholder="이메일 주소를 입력하세요" autocomplete="off">
                <input type="password" name="pwd" placeholder="비밀번호를 입력하세요" autocomplete="off">

                <div class="login_keep">
                    <input type="checkbox" name="login_keep">
                    <p>로그인 상태 유지</p>
                </div>

                <button type="submit">로그인</button>
            </form>

            <div class="login_txt">
                <div class="login_join">
                    <a href="#"><span>아이디 찾기</span></a>
                    <span> ・ </span>
                    <a href="#"><span>비밀번호 찾기</span></a>
                </div>
                <a href="<c:url value='/join/joinpage'/>"><p>회원가입</p></a>
            </div>
        </div>

        <div class="social_login">
            <div class="social_login_title">
                <p>소셜 계정으로 로그인</p>
            </div>

            <ul>
                <li class="kakao">
                    <a href="#"><img src="<c:url value='/img/kakao.png'/>" alt=""></a>
                </li>
                <li class="google">
                    <a href="#"><img src="<c:url value='/img/google.png'/>" alt=""></a>
                </li>
            </ul>
        </div>
    </div>

    <footer id="footer"></footer>
</div>

</body>
</html>
