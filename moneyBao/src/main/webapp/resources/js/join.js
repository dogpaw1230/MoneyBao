/*  ******************************************  */
/*  ************** 이메일 유효성 검사 ************  */
/*  ******************************************  */

/* 이벤트 리스너 구현 */
let emailInput = document.getElementById('id');
let submitButton = document.getElementById('emailAuth');

// 입력 이벤트 리스너 추가
emailInput.addEventListener('input', validateEmail);

// 버튼 클릭 이벤트 리스너 추가
submitButton.addEventListener('click', submitForm);


/* 함수 모음 */
function validateEmail() {
    // 이메일 주소의 유효성을 확인
    if (/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        submitButton.classList.add('active');
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.classList.remove('active');
        submitButton.setAttribute('disabled', 'disabled');
    }
}

function submitForm() {
    alert('이메일 주소가 유효합니다: ' + emailInput.value);
    // 여기에서 실제로 폼을 제출하거나 다른 동작을 수행할 수 있습니다.
}

/*  ******************************************  */
/*  ************ 비번, 닉네임 유효성 검사 **********  */
/*  ******************************************  */
document.addEventListener('DOMContentLoaded', function () {
    // 비밀번호 입력 요소와 에러 메시지 요소 가져오기
    let passwordInput = document.getElementById('pw');
    let passwordError = document.getElementById('pwError');

    let passwordChk = document.getElementById('pwChk');
    let pwChkError = document.getElementById('pwChkError');
    let userNameInput = document.getElementById('userName');

    let myForm = document.getElementById('joinForm');

    // 비밀번호 확인 값 초기화
    let passwordChkValue = passwordChk.value;

    /* 1.비밀번호 입력 요소의 값이 변경될 때마다 유효성 검사 수행 */
    passwordInput.addEventListener('input', function () {
        // 에러 메시지 초기화
        passwordError.textContent = '';
        pwChkError.textContent = ''; // 비밀번호 확인 에러 메시지도 초기화

        // 비밀번호 유효성 검사
        let isValid = validatePassword(passwordInput.value);

        // 에러 메시지 표시
        if (!isValid) {
            passwordError.textContent = '영문, 숫자, 특수문자를 포함하여 최소 8자 이상이어야 합니다.';
        }

        // 비밀번호 확인 값 업데이트
        passwordChkValue = passwordChk.value;

        // 비밀번호 확인 유효성 검사
        validatePasswordChk();
    });

    /* 2.비밀번호 확인 요소의 값이 비밀번호 입력 값과 같은지 검사 */
    passwordChk.addEventListener('input', function () {
        // 에러 메시지 초기화
        pwChkError.textContent = '';

        // 비밀번호 확인 값 업데이트
        passwordChkValue = passwordChk.value;

        // 비밀번호 확인 유효성 검사
        validatePasswordChk();

        // // 비밀번호 유효성 검사
        // let isValid = chkPassword(passwordInput.value, passwordChk.value);
        //
        // // 에러 메시지 표시
        // if (!isValid) {
        //     pwChkError.textContent = '비밀번호가 일치하지 않습니다.';
        // } else {
        //     pwChkError.textContent = '';
        // }
    });

    /* 3. 닉네임 중복 체크 - 비동기 */
    userNameInput.addEventListener('input', function () {
        let id = $('#userName').val();
        $.ajax({
            url:'./join/usernamechk', // Controller에서 요청 받을 주소
            type:'post', // POST 방식으로 전달
            data:{id:id},
            success:function(cnt){ //컨트롤러에서 넘어온 cnt값을 받는다
                if(cnt != 0){ //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 닉네임
                    $('#nameChk').textContent = '이미 존재하는 닉네임입니다.';
                } else { // cnt가 1일 경우 -> 이미 존재하는 닉네임
                    $('#nameChk').textContent = '';
                }
            },
            error:function(){
                alert("에러입니다");
            }
        })
    });

    /* 4.폼 제출 이벤트에 대한 리스너 추가 */
    myForm.addEventListener('submit', function (event) {
        // 비밀번호 유효성 검사
        let isPwValid = validatePassword(passwordInput.value);
        let isPwChkValid = chkPassword(passwordInput.value, passwordChk.value);

        // 닉네임 값이 비어있는지 확인
        let userNameValid = userNameInput.value;

        // 비밀번호, 닉네임 값 유효하지 않은 경우 이벤트 취소
        if (!isPwValid || !isPwChkValid) {
            alert('비밀번호를 확인해주세요.');
            event.preventDefault(); // 폼 제출 취소
        } else if (!userNameValid) {
            alert('닉네임을 입력해주세요.');
            event.preventDefault(); // 폼 제출 취소
        }
    });



    /***********/
    /* 함수 모음 */
    // 1. 비밀번호 유효성 검사 함수
    function validatePassword(password) {
        // 최소 8자 이상, 영문, 숫자, 특수문자 포함 여부 확인
        let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    // 2. 비밀번호 확인 유효성 검사 함수
    function validatePasswordChk() {
        // 에러 메시지 초기화
        pwChkError.textContent = '';

        // 비밀번호 확인 유효성 검사
        let isPasswordChkValid = chkPassword(passwordInput.value, passwordChkValue);

        // 에러 메시지 표시
        if (!isPasswordChkValid) {
            pwChkError.textContent = '비밀번호가 일치하지 않습니다.';
        }
    }

    // 3. '비밀번호 === 비밀번호 확인' 유효성 검사 함수
    function chkPassword(password, passwordChk) {
        return password === passwordChk;
    }
});
