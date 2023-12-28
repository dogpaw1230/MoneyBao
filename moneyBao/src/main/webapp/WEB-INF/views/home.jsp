<%@ page import="java.net.URLDecoder" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page session="false" %>	<%-- 이 페이지에서는 세션을 새로 생성 안하겠다 라는 뜻 --%>

<html>
<head>
	<title>MoneyBao</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>MoneyBao</title>
	<link rel="icon" href="<c:url value='/img/Logo5.png'/> " type="image/x-icon" alt="Flaticon">
	<link rel="stylesheet" href="<c:url value='/css/home.css'/> ">
	<link rel="stylesheet" href="<c:url value='/css/common.css'/> ">
	<link rel="stylesheet" href="<c:url value='/font/font.css'/> ">
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
</head>
<body>
<div id="wrap">
	<div class="w_1300 position heightSet">
		<video id="pandaHome" autoplay muted>
			<source src="<c:url value='/img/homePanda.mp4'/>" type="video/mp4">
		</video>

		<div id="homeTxt">
			<img src="<c:url value='/img/homeTxt1.png'/>" alt="homeTxt">
		</div>

		<div id="loginJoinBox">
			<a href="<c:url value='/login/loginpage'/>"><div id="homeLogin">로그인</div></a>
			<a href="<c:url value='/join/joinpage'/>"><div id="homeJoin">회원가입</div></a>
		</div>
	</div>
</div>
</body>
<script src="<c:url value='/js/home.js'/>"></script>
</html>
