/* 1. 폼 제출 이벤트에 대한 리스너 추가 */

let myLoginForm = document.getElementById('loginForm');
let inputId = document.getElementById('id');
let inputPwd = document.getElementById('pwd');

myLoginForm.addEventListener('submit', function (event) {
    // 아아디, 비밀번호 입력 값
    let isIdValid = inputId.value.trim();
    let isPwdValid = inputPwd.value.trim();
    console.log(isIdValid, ',', isPwdValid);

    // 아이디, 비밀번호 입력하지 않으면 폼 제출 취소
    if (isIdValid === '' || isPwdValid === '') {
        alert('아이디 및 비밀번호를 확인해주세요.');
        event.preventDefault(); // 폼 제출 취소
    }
});

/* 2. 아이디 및 비밀번호 잘못 입력했을시 알림창 띄워주기 */
document.addEventListener('DOMContentLoaded', function() {
    // URL에서 'msg' 파라미터 값 가져오기
    let urlParams = new URLSearchParams(window.location.search);
    let msgParam = urlParams.get('msg');

    // 'msg' 파라미터 값이 있다면 alert 창 띄우기
    if (msgParam !== null) {
        alert(decodeURIComponent(msgParam));
        urlParams.delete('msg');

        // 'msg' 파라미터를 삭제하여 새로고침시에 더 이상 띄우지 않도록 함
        let newUrl = window.location.pathname + '?' + urlParams.toString();
        window.history.replaceState({}, document.title, newUrl);
    }
});