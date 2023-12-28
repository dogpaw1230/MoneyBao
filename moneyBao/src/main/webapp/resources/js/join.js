var emailInput = document.getElementById('id');
var submitButton = document.getElementById('emailAuth');

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