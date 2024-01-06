/*  ******************************************  */
/*  **************** 유효성 검사 ****************  */
/*  ******************************************  */

document.addEventListener('DOMContentLoaded', function () {
    let myJoinForm = document.getElementById('joinForm');

    let emailInput = document.getElementById('joinUserId');
    let submitButton = document.getElementById('emailAuth');
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
    submitButton.addEventListener('click', submitForm);

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
            type: 'post',
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
