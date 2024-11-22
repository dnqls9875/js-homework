const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

const emailInput = document.querySelector("#userEmail");
const pwInput = document.querySelector("#userPassword");
const loginButton = document.querySelector(".btn-login");

function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

// 상태관리
let emailPass = false;
let pwPass = false;

function handleCheckEmail() {
  const value = this.value;
  const valid = emailReg(value);

  if (valid) {
    this.classList.remove("is--invalid");
    emailPass = true;
  } else {
    this.classList.add("is--invalid");
    emailPass = false;
  }
}

function handleCheckPw() {
  const value = this.value;
  const valid = pwReg(value);

  if (valid) {
    this.classList.remove("is--invalid");
    pwPass = true;
  } else {
    this.classList.add("is--invalid");
    pwPass = false;
  }
}

function hadleLogin(e) {
  e.preventDefalt();

  if (emailPass && pwPass) {
    try {
      const id = emailInput.value;
      const pw = pwInput.value;
      const getUserId = user.id;
      const getUserPw = user.pw;

      if (getUserId === id && getUserPw === pw) {
        window.location.href = "welcome.html";
      } else {
        throw new Error("...");
      }
    } catch {
      alert("아이디 또는 비밀번호를 잘못입력하셨습니다.");
    }
  }
}

emailInput.addEventListener("input", handleCheckEmail);
pwInput.addEventListener("input", handleCheckPw);
loginButton.addEventListener("submit", hadleLogin);
