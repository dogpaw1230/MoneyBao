<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.net.URLDecoder" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page session="false" %>	<%-- 이 페이지에서는 세션을 새로 생성 안하겠다 라는 뜻 --%>
<html>
<head>
    <title>Title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<c:url value='/img/Logo5.png'/> " type="image/x-icon" alt="Flaticon">
    <link rel="stylesheet" href="<c:url value='/css/join.css'/> ">
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
<%--                    <img src="../img/bamboo_icon.png" alt="profile">--%>
<%--                </li>--%>
<%--            </ul>--%>
        </div>
    </header>

    <div id="joinDetailWrap">
        <!--
                <div class="joinBox">
                    <img src="../img/panda_icon3.png" alt="joinImg">
                    <p>MoneyBao</p>
                </div> -->


        <div class="social_join">
            <div class="social_join_title">
                <p>소셜 계정으로 간편 가입</p>
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

        <form action="#" method="GET" id="joinForm">

            <div id="idBox">
                <label for="id">이메일</label>
                <br>
                <input type="email" id="id" name="userId" placeholder="이메일 주소 입력" maxlength="50" autocomplete="off" required>
                <button type="button" id="emailAuth">이메일 인증하기</button>
            </div>

            <div id="authNumberBox">
                <label for="authNumber">이메일로 전송된 인증번호를 입력해주세요.</label>
                <div id="authNumberInput">
                    <input type="text" id="authNumber" name="authNumber" placeholder="인증번호 6자리 입력">
                    <p id="authTime">02:30</p>
                    <button type="button" id="authBtn">확인</button>
                </div>

            </div>

            <div id="pwBox">
                <label for="pw">비밀번호</label>
                <br>
                <input type="password" id="pw" name="userPw" placeholder="영문, 숫자, 특수문자를 포함한 8자 이상" minlength="7" autocomplete="off">
                <p id="pwError"></p>
            </div>

            <div id="pwChkBox">
                <label for="pwChk">비밀번호 확인</label>
                <br>
                <input type="password" id="pwChk" name="userPwChk" placeholder="비밀번호 확인" autocomplete="off">
                <p id="pwChkError"></p>
            </div>

            <div id="nameBox">
                <label for="userName">닉네임</label>
                <br>
                <input type="text" id="userName" name="userName" placeholder="별명(2~15자)" autocomplete="off">
                <p id="nameChk"></p>
            </div>

            <button type="submit" id="joinBtn">회원가입하기</button>
        </form>

        <div class="have_id">
            <p>이미 계정이 있나요?</p>
            <a href="<c:url value='/login/loginpage'/>"><p>로그인</p></a>
        </div>
    </div>

    <footer id="footer"></footer>
</div>

</body>
<script src="<c:url value='/js/join.js'/>"></script>

</html>
