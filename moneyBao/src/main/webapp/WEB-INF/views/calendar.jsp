<%@ page import="java.net.URLDecoder" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title>MoneyBao_Calendar</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<c:url value='/img/Logo5.png'/> " type="image/x-icon" alt="Flaticon">
    <link rel="stylesheet" href="<c:url value='/css/calendar.css'/> ">
    <link rel="stylesheet" href="<c:url value='/css/common.css'/> ">
    <link rel="stylesheet" href="<c:url value='/font/font.css'/> ">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script></head>
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
            <ul class="profile">
                <li>
                    <!-- 로그인/로그아웃 넣기, 로그인 하면 아래처럼 닉네임이나 아이디명 표시해주기 -->
                    <p>부자될거야 님</p>
                </li>
                <li>
                    <img src="<c:url value='/img/bamboo_icon.png'/> " alt="profile">
                </li>
            </ul>
        </div>
    </header>

    <main class="w_1300">
        <div id="calendarBox">
            <table class="Calendar">
                <thead>
                <tr>
                    <td onClick="prevCalendar();" style="cursor:pointer;">&#60;</td>
                    <td colspan="5">
                        <span id="calYear"></span>년
                        <span id="calMonth"></span>월
                    </td>
                    <td onClick="nextCalendar();" style="cursor:pointer;">&#62;</td>
                </tr>
                <tr>
                    <td colspan="2.5">
                        <p>전체</p>
                        <p id="totalPrice">+ 10,000원</p>
                    </td>
                    <td colspan="3">
                        <p>지출</p>
                        <p id="expense">- 5,000원</p>
                    </td>
                    <td colspan="2">
                        <p>수입</p>
                        <p id="income">+ 15,000원</p>
                    </td>
                </tr>
                <tr>
                    <td id="sunday">일</td>
                    <td>월</td>
                    <td>화</td>
                    <td>수</td>
                    <td>목</td>
                    <td>금</td>
                    <td id="saturday">토</td>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <div id="slideBox">
            <div id="slideLogo">
                <!-- <img src="../img/panda_icon3.png" alt="입력하기"> -->
                <img src="<c:url value='/img/money_icon.png'/> " alt="돈">
            </div>

            <form action="#" method="GET" id="slideContents">
                <div id="buttonBox">
                    <!-- <label for="incomeChk">수입</label>
                    <label for="expenseChk">지출</label>
                    <input type="radio" name="budgetChk" id="incomeChk">
                    <input type="radio" name="budgetChk" id="expenseChk"> -->

                    <input type="radio" name="budgetChk" id="incomeChk" value="income">
                    <label for="incomeChk" id="incomeChkLabel">수입</label>

                    <input type="radio" name="budgetChk" id="expenseChk" value="expense">
                    <label for="expenseChk" id="expenseChkLabel">지출</label>
                </div>
                <div id="dateBox">
                    <p>날짜</p>
                    <input type="date" name="selectedDate" id="selectedDate">
                </div>
                <div id="assetBox">
                    <p>자산</p>
                    <select type="text" class="optionSize" placeholder="자산종류" id="assetType">
                        <option value="" selected disabled></option>
                        <option value="cash">현금</option>
                        <option value="card">카드</option>
                        <option value="transfer">이체</option>
                    </select>
                </div>
                <div id="typeBox">
                    <p>분류</p>
                    <select type="text" class="optionSize" placeholder="지출종류" id="expenseType">
                        <option value="" selected disabled></option>
                        <option value="food">식비</option>
                        <option value="traffic_car">교통/차량</option>
                        <option value="culture">문화생활</option>
                        <option value="mart">마트/편의점</option>
                        <option value="fashion_beauty">패션/미용</option>
                        <option value="dailyNecessity">생필품</option>
                        <option value="dwelling">주거</option>
                        <option value="telecom">통신</option>
                        <option value="education">교육</option>
                        <option value="health">건강</option>
                        <option value="partyMoney">경조사비/회비</option>
                        <option value="etc">기타</option>
                    </select>
                </div>
                <div id="amountBox">
                    <p>금액</p>
                    <input type="text" name="amount" id="amount" autocomplete="off">
                    <span>원</span>
                </div>
                <div id="explainBox">
                    <p>내용</p>
                    <input type="text" name="explain" id="explain" autocomplete="off" maxlength="20">
                </div>
                <button type="submit" id="save">저장하기</button>
                <button type="button" id="memo">메모쓰기</button>
            </form>
        </div>
    </main>


    <footer id="footer"></footer>
</div>

</body>

<script src="<c:url value='/js/calendar.js'/>"></script>
</html>
