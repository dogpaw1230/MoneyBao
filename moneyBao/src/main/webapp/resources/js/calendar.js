window.onload = function () {
    // 웹 페이지가 로드되면 buildCalendar 실행
    buildCalendar();

    // today 변수 정의 및 초기화
    let today1 = new Date();
    today.setHours(0, 0, 0, 0);
    // input에 오늘 날짜 넣기
    document.getElementById('selectedDate').value = today1.toISOString().substring(0, 10);
}

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

const datePrices = [10000, 20000, 30000, 15000, 25000, 35000];


// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복


        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            nowColumn.style.color = "#0000CD";
            // newDIV.classList.add("saturday");
        }

        if (nowDay.getDay() == 0) {
            nowColumn.style.color = "#DC143C";
        }

        // 날짜 밑에 전체, 지출, 수입 입력
        // 아래 else if 랑 else 문 안에 추가 코드 작성함
        let newPrice = document.createElement("p");

        if (nowDay < today) {                       // 지난날인 경우
            newDIV.className = "pastDay";
            newDIV.onclick = function () {
                choiceDate(this);
            }
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우
            newDIV.className = "today";
            newDIV.onclick = function () {
                choiceDate(this);
                // let day = document.querySelector('.choiceDay');
                let price = document.querySelector('.choiceDay').nextSibling;
                // price.classList.add("choicePrice");
                choicePrice(price);
            }

            // 가격 입력 요소 추가
            newPrice.classList.add("todayPrice");
            newPrice.innerHTML = leftPad(datePrices[nowDay.getDate() % 5]);
            nowColumn.appendChild(newPrice);
        }
        else {                                      // 미래인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () {
                choiceDate(this);
                let price = document.querySelector('.choiceDay').nextSibling;
                // price.classList.add("choicePrice");
                choicePrice(price);
            }

            // 가격 입력 요소 추가
            newPrice.classList.add("futurePrice");
            newPrice.innerHTML = leftPad(datePrices[nowDay.getDate() % 5]);
            nowColumn.appendChild(newPrice);
        }
    }
}

// 날짜 선택
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class
    pushDate(newDIV);
}

// 가격 선택
function choicePrice(newPrice) {
    if (document.getElementsByClassName("choicePrice")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choicePrice")[0].classList.remove("choicePrice");  // 해당 날짜의 "choiceDay" class 제거
    }
    newPrice.classList.add("choicePrice");           // 선택된 날짜에 "choiceDay" class
    pushPrice(newPrice);
}

// 선택한 날짜 input에 넣기
function pushDate(newDIV) {
    let selectedYear = document.getElementById("calYear").innerText;
    let selctedMonth = document.getElementById("calMonth").innerText;
    let selctedDate = document.getElementsByClassName("choiceDay")[0].innerText;

    document.getElementById("selectedDate").value = selectedYear+"-"+selctedMonth+"-"+selctedDate;
}

// 선택한 날짜의 가격 Input에 넣기
// function pushPrice(newDIV) {
//     let selectedPrice = document.getElementsByClassName("choicePrice")[0].innerText;

//     document.getElementById("totalPrice").value = selectedPrice;
// }

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙여주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}

// 제이쿼리
$(document).ready(function() {
    // 달력은 동적으로 생성되기 때문에 문서(document) 전체에 이벤트를 위임한다.
    // 자세한 내용은 옵시디언 메모 참고! (Resources > JavaScript > 동적으로 요소 생성 어쩌구)
    $(document).on("click", ".choiceDay", function() {
        console.log("choiceDay clicked!");
        // let targetUrl = "https://새로운URL주소.com";
        // window.open(targetUrl, "_blank");

    });
})


/////////////////////////////////////////////////////
// Submit 버튼 클릭 시 호출되는 함수
function submitForm() {
    // 선택한 값 가져오기
    var selectedCategory = document.getElementById('packCategory').value;
    var selectedLocation = document.getElementById('packLocation').value;
    var selectedDate = document.getElementById('packDate').value;

    // URL 생성
    var url = 'viewPackage'; // 여기에 결과페이지의 경로를 넣으세요.
    url += '?packageCategory=' + encodeURIComponent(selectedCategory);
    url += '&packageLocation=' + encodeURIComponent(selectedLocation);
    url += '&packageStartDate=' + encodeURIComponent(selectedDate);

    // URL로 리다이렉션
    window.location.href = url;
}

/////////////////////////////////////////////////////
// 숫자에 콤마 찍기
// HTML이 완전히 로드된 후에 실행되도록 이벤트 리스너 사용
document.addEventListener("DOMContentLoaded", function() {
    // 이벤트 리스너 등록
    document.getElementById("amount").addEventListener("input", formatNumber);
});

function formatNumber(event) {
    var input = event.target;
    var inputValue = input.value.replace(/,/g, '');
    // parseInt 또는 parseFloat를 사용하여 문자열을 숫자로 변환
    var parsedValue = parseFloat(inputValue);

    // NaN 체크를 추가하여 숫자가 아닌 경우 0으로 처리
    if (!isNaN(parsedValue)) {
        var formattedValue = parsedValue.toLocaleString();
        input.value = formattedValue;
    } else {
        input.value = '';
    }

}

document.getElementById('slideContents').addEventListener('submit', function(event) {
    // 입력 요소에서 값 가져오기
    var selectedDate = document.getElementById('selectedDate').value;
    var assetType = document.getElementById('assetType').value;
    var expenseType = document.getElementById('expenseType').value;
    var amount = document.getElementById('amount').value;
    var explain = document.getElementById('explain').value;

    // 값이 비어 있는지 또는 선택되지 않았는지 확인
    if (!selectedDate || !assetType || !expenseType || !amount || !explain) {
        alert('모든 필드를 입력해주세요.');
        return false; // 폼 제출을 중단

    }
    return true;
});

$(document).ready(function() {
    // 메모쓰기 버튼 누르면 메모쓰는 페이지로 이동하기
    $("#memo").on("click", function() {
        // 특정 사이트 주소를 여기에 입력
        let targetUrl = "https://velog.io/@dogpaw1230";

        // 새 창에서 사이트 열기
        // window.open(targetUrl);
        window.location.href = targetUrl;

    })
});


/////////////////////////////////////////////////
/////// 폼 태그 없이 자바스크립트로 서버에 요청보내는 방법
// Submit 버튼에 이벤트 리스너 추가
// document.getElementById('submitButton').addEventListener('click', function(event) {
//     event.preventDefault(); // 폼의 기본 동작을 막음 (페이지 새로고침 방지)
//     submitForm();
// });

// /////////////////////////////////////////////////////
// // 아이디가 packBigBox요소를 클릭하면 다른 페이지로 넘어가면서 url로 정보 전송하기
// function clickPackage(packBoxId) {
//     let url = "readCalendarPackage";
//     url += '?packageId=' + packBoxId;

//     // URL로 리다이렉션
// window.location.href = url;
// }

// let packageIdList = [];

// <c:forEach var="item" items="${allPackageList}">
// packageIdList.push("${item.packageId}");
// </c:forEach>

// for(let item of packageIdList) {
//     document.getElementById(item).addEventListener('click', function() {
//         clickPackage(item);
//     })
// }


