const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*
1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리
*/

const inputId = document.querySelector(".user-email-input");
const inputPw = document.querySelector(".user-password-input");
const form = document.querySelector(".login-form");

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

// 정규표현식 내용이 겹치고, 재사용성이 부족한 것 같기도 하고,
// 재사용성 있는 코드로 한번 바꿔봐야겠다..
// 겹치는 코드가 좀 많은 것 같다. 합쳐봐야지
// ? 정규표현식 email validation
// function invalidIdHandler() {
//   const valid = emailReg(inputId.value);

//   if (valid) {
//     inputId.classList.remove("is--invalid");
//   } else {
//     inputId.classList.add("is--invalid");
//   }
// }

// ? 정규표현식 pw validation
// function invalidPwHandler() {
//   const valid = pwReg(inputPw.value);

//   if (valid) {
//     inputPw.classList.remove("is--invalid");
//   } else {
//     inputPw.classList.add("is--invalid");
//   }
// }

function validateInput(inputElem, reg) {
  const valid = reg(inputElem.value);

  if (valid) {
    inputElem.classList.remove("is--invalid");
  } else {
    inputElem.classList.add("is--invalid");
  }
}

// & 버튼 submit 시 해당 html이동
function buttonHandler(e) {
  e.preventDefault();
  const checkUserId = inputId.value === user.id;
  const checkUserPw = inputPw.value === user.pw;

  if (checkUserId && checkUserPw) {
    window.location.href = "welcome.html";
  } else if (!checkUserId && !checkUserPw) {
    alert("아이디 혹은 비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.");
  }
}

inputId.addEventListener("input", () => validateInput(inputId, emailReg));
inputPw.addEventListener("input", () => validateInput(inputPw, pwReg));

// submit은 button의 타입이 submit 여야 하고,
// form 자체에 event를 걸어줘야 제대로 submit시 내가 원하는 이벤트가 작동이 된다.
form.addEventListener("submit", buttonHandler);

// 순서도
/** 이건 아니야 span에 주는게 아니쟈냐 input에 줘야하네...
 * 1. user-email-input을 조회한다.
 * 2. emailReg이 input.value가 동일하지 않으면
 * 해당 설정한 input에 is--invalid 클래스를 추가해야 한다.
 * 3. 규식이형이 맞으면 is--invalid를 제거한다.
 * 4. user id와 pw가 맞으면 로그인 버튼 클릭 시 조건처리
 */
