/*  ******************************************  */
/*  **************** 유효성 검사 ****************  */
/*  ******************************************  */

document.addEventListener('DOMContentLoaded', function () {
    let myJoinForm = document.getElementById('joinForm');

    let emailInput = document.getElementById('joinUserId');
    let authCodeBox = document.getElementById('authNumberBox')
    let emailAuthButton = document.getElementById('emailAuth');
    let authCodeButton = document.getElementById('authBtn');
    let authCodeInput = document.getElementById('authNumber');
    let authCodeValue;
    let incorrectCode = document.getElementById('incorrectCode');
    let authCodeBool = true;

    let passwordInput = document.getElementById('joinUserPw');
    let passwordError = document.getElementById('pwError');
    let passwordChk = document.getElementById('pwChk');
    let pwChkError = document.getElementById('pwChkError');
    let userNameInput = document.getElementById('userName');
    let joinButton = document.getElementById('joinBtn');

    let passwordChkValue = passwordChk.value;


    // 이메일 입력 이벤트 리스너 추가
    emailInput.addEventListener('input', validateEmail);

    // 이메일 인증하기 버튼 클릭 이벤트 리스너 추가
    emailAuthButton.addEventListener('click', emailAuth);

    // 인증번호 입력 후 확인 버튼 클릭 리스너 추가
    authCodeButton.addEventListener('click', authCodeChk);

    // 1. 비밀번호 입력 이벤트 리스너 등록
    passwordInput.addEventListener('input', handlePasswordInput);

    // 2. 비밀번호 확인 이벤트 리스너 등록
    passwordChk.addEventListener('input', handlePasswordChkInput);

    // 3. 닉네임 중복 체크 이벤트 리스너 등록
    userNameInput.addEventListener('input', handleUserNameInput);

    // // // 4. 폼 제출 이벤트 리스너 등록
    // myJoinForm.addEventListener('submit', handleSubmit);
    joinButton.addEventListener('click', function () {
        handleSubmit();
        console.log("button clicked!");
    })


    /********************************************/
    /* *************** 함수 모음 **************** */
    /********************************************/
    // 비밀번호 입력 이벤트 리스너 함수
    function handlePasswordInput() {
        passwordError.textContent = '';
        pwChkError.textContent = '';

        let isValid = validatePassword(passwordInput.value);

        if (!isValid) {
            passwordError.textContent = '영문, 숫자, 특수문자를 포함하여 최소 8자 이상이어야 합니다.';
        }

        passwordChkValue = passwordChk.value;
        validatePasswordChk();
    }

    // 이메일 유효성 확인 이벤트 리스너 함수
    function validateEmail() {
        // 이메일 주소의 유효성을 확인
        if (/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            emailAuthButton.classList.add('active');
            emailAuthButton.removeAttribute('disabled');
        } else {
            emailAuthButton.classList.remove('active');
            emailAuthButton.setAttribute('disabled', 'disabled');
        }
    }

    // 이메일 인증하기 버튼 누르면 인증 번호 누르는 요소 나타나기
    function emailAuth() {
        authCodeBox.style.display = 'block';
        $.ajax({
            url: './emailchk',
            type: 'post',
            data: { email : emailInput.value},
            success: function (authCode) {
                authCodeValue = authCode;
                console.log("인증번호 전송 성공");
                emailAuthButton.classList.remove('active');
                emailAuthButton.setAttribute('disabled', 'disabled');
            },
            error: function () {
                alert("에러입니다");
            }
        });

    }
    function authCodeLength() {
        authCodeInput.addEventListener('input', function () {
            incorrectCode.textContent= '';
        })
    }

    authCodeLength();

    function authCodeChk() {
        incorrectCode.textContent= '';
        let authCode = authCodeInput.value;

        if (authCode !== authCodeValue) {
            incorrectCode.textContent = '올바른 인증 코드가 아닙니다';
            return authCodeBool = false;
        } else {
            authCodeBool = true;
            incorrectCode.textContent = "인증이 완료되었습니다."
            incorrectCode.style.color = 'blue';
        }
    }

    // 비밀번호 확인 이벤트 리스너 함수
    function handlePasswordChkInput() {
        pwChkError.textContent = '';
        passwordChkValue = passwordChk.value;
        validatePasswordChk();
    }

    // 닉네임 중복 체크 이벤트 리스너 함수
    function handleUserNameInput() {
        let userName = $('#userName').val();
        $.ajax({
            url: './usernamechk',
            type: 'get',
            data: { userName: userName },
            success: function (cnt) {
                // 중복 시 폼 제출 버튼 비활성화
                if (cnt != 0) {
                    $('#nameChk').text('이미 존재하는 닉네임입니다.');
                    joinButton.classList.remove('active');
                    joinButton.setAttribute('disabled', 'disabled');

                // 중복 아니면 폼 제출 버튼 활성화
                } else {
                    $('#nameChk').text('');
                    joinButton.classList.add('active');
                    joinButton.removeAttribute('disabled');
                }
            },
            error: function () {
                alert("에러입니다");
            }
        });
    }

    // 폼 제출 이벤트 리스너 함수
    function handleSubmit(event) {
        let isIdValid = emailInput.value
        let isPwValid = validatePassword(passwordInput.value);
        let isPwChkValid = chkPassword(passwordInput.value, passwordChk.value);
        let userNameValid = userNameInput.value;

        if (isIdValid === '') {
            alert("이메일을 확인해주세요.");
        } else if (!isPwValid || !isPwChkValid) {
            alert("비밀번호를 확인해주세요.");
        } else if (!userNameValid) {
            alert("닉네임을 확인해주세요.");
        } else if (!authCodeBool) {
            alert("인증번호를 확인해주세요.")
        } else {
            alert("회원가입 완료");
            myJoinForm.submit();
        }
    }

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
