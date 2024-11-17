# 3주차 과제 naver_login validation

- user라는 객체안의 id, password 값을 input에 입력하고, 해당 조건에 맞춰 네이버 로그인을 구현할 것.

## 목차

1. [문제](#문제)
1. [결론 및 후기](#결론-및-후기)

### 문제

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

#### email,pw 정규표현식을 사용한 validation

일단 선생님께서 정규표현식 함수를 모두 적어주시기도 하셨고, input 이벤트 시 작동 할 수 있는 함수를 만드세요 라는 힌트를 주셔서 쉽게 작성 가능했던 것 같다.

```javascript
const inputId = document.querySelector(".user-email-input");
const inputPw = document.querySelector(".user-password-input");

// 정규표현식 id validation
function invalidIdHandler() {
  const valid = emailReg(inputId.value);

  if (valid) {
    inputId.classList.remove("is--invalid");
  } else {
    inputId.classList.add("is--invalid");
  }
}

// 정규표현식 pw validation
function invalidPwHandler() {
  const valid = pwReg(inputPw.value);

  if (valid) {
    inputPw.classList.remove("is--invalid");
  } else {
    inputPw.classList.add("is--invalid");
  }
}

// 호출
inputId.addEventListener("input", invalidIdHandler);
inputPw.addEventListener("input", invalidPwHandler);
```

일단 email, password 지정하는 변수를 만들어 그 변수에다가 이벤트를 적용하려고 했다. 해당 함수 안에는 emailReg, pwReg 함수를 vaild라는 변수에 할당했다.
어떤 값을 그 함수에 인자로 전달하면 되는지 console.log를 통해 input.vlaue를 출력해봤고, input 입력 시 input 작성 값들이 잘 나오는 걸 확인 할 수 있었다.
이메일, 비밀번호 input이 따로 분리가 되어 있었기 때문에 해당 변수.value를 정규표현식 검사하는 함수에 인자로 전달하고, valid라는 값이 정규표현식이고, 정규표현식이 맞으면 is--invalid class를 제거하고, 아니면 class를 추가하는 조건문을 처리했다. 이 부분은 모두 동일했다. 근데 함수를 생성하고 나니 중복이 되는 부분 코드가 쓸모없이 늘어나는 부분이 거슬려 이 함수들을 합칠 수 있으면 어떨까 생각을 하게 되었고, 적용해봤다.

```javascript
function validateInput(inputElem, reg) {
  const valid = reg(inputElem.value);

  if (valid) {
    inputElem.classList.remove("is--invalid");
  } else {
    inputElem.classList.add("is--invalid");
  }
}

inputId.addEventListener("input", () => validateInput(inputId, emailReg));
inputPw.addEventListener("input", () => validateInput(inputPw, pwReg));
```

사실 처음에는 공통의 정규표현식 검사 함수인 validateInput 호출 시 이렇게 작성했는데 에러는 아니지만 처음부터 함수를 바로 실행시켜서 초기화면 부터 is--invalid가 block처리가 되었다.

```javascript
validateInput(inputId, emailReg);
validateInput(inputPw, pwReg);
```

당연한 결과인 거 같다. 왜냐면 나는 email, password 핸들러 함수를 만들었을 때
addEventListener메서드로 input 이벤트시에 그 함수를 실행시켰으니깐

수정한 코드는

```javascript
inputId.addEventListener("input", () => validateInput(inputId, emailReg));
inputPw.addEventListener("input", () => validateInput(inputPw, pwReg));
```

화살표 함수를 이용해서 input 이벤트 발생 시 validateInput 함수를 호출 했다.
화살표 함수를 이용해 이벤트 시 함수를 이 안에서 처리할 수도 있지만 따로 함수를 만들어 이곳은 호출만 했는데 이 개념이 콜백함수 같았다.

#### 로그인 버튼을 클릭시 조건처리

```javaScript
const form = document.querySelector(".login-form");

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

form.addEventListener("submit", buttonHandler);
```

사실 처음에는 변수를 `button`을 지정하고, `html`에 `button` 태그에 `submit` 타입 속성이 지정되어 있어 submit 이벤트를 사용해서 작업했다.
버튼 클릭시 새로고침을 방지해주는 `buttonHandler` 함수 인자에 e를 지정하고, `e.preventDefault();`으로 버튼 클릭 시 새로고침을 방지해 주었다.
그리고, `input value`들이 `id,password`를 가지고 있는 user객체의 값들과 동일하다는 변수를 지정해줬고, 그 값들이 일치하면 welcome.html로 이동하는 조건과 일치하지 않는다면 잘못입력했다는 alert창이 나오게 코드를 작성했다.
이렇게 하니깐 계속 아이디,비밀번호를 맞게 입력해도 에러메세지가 있는 페이지로 이동하게 되는 것이었다. 뭐가 문제일까 `button.addEventListener("click")`으로 변경하니 welcome.html로 잘 이동이 되는 것이다. 그래서 난 한가지 의문이 들었는데 왜 submit으로만 바꾸면 안돼지? 그러다 놓친 부분이 있었다. `submit`은 폼 양식 제출 시 전달 되는 거 아닌가? 그럼 버튼을 제출 하지는 않지 않나? 그냥 type속성이 submit인 거 일뿐이지.. 그래서 button으로 지정해줬던 변수를 form으로 변경하고 form 전체를 그 변수에 할당했다. 그리고 난뒤 `form.addEventListener("submit")` 을 하니 제대로 원하는 페이지로 이동도 되고, 제대로 되지 않은 아이디혹은 비밀번호 입력 후 버튼 클릭 시 원하는 alert 창도 나오게 되어 후련했다.

## 결론 및 후기

함수를 만들어 로그인 validation을 구현해보고, `addEventListener`를 활용해 평소에 `click` 이벤트만 자주 예시로 사용해봤는데 `input,submit` 이벤트를 과제에서 적용하여 다양한 이벤트를 접할 수 있어 좋았다.
요즘 자바스크립트 수업을 듣다보면 가끔 `html,css`로 간단하게 변경해주거나 여기는 왜 안나올까요? 라고 했을때 난 자바스크립트에서만 그 문제를 찾았던 것 같았다. 실제로 이 과제를 하면서 `eroor-message`라는 class를 가지고 있는 `span` 태그에 `is--invalid` class를 붙혀주어 `block` 처리해야 되는 줄 알고, 계속 삽질을 했었다. 왜냐면 `eroor-message`가 `display:none`이여서 `block` 으로만 바꿔주면 되는 거 아닌가? 라고 생각했기 때문이다. 하지만 css 파일에서 `.is--invalid + error-message` 이건 `is--invalid` 클래스를 가지고 있는 태그의 형제구조 error-message 라는 뜻이다. 결국 `input`과 `span`은 형제 구조고, `is--invalid` class가 input에 적용이되어야 `span`에 `error-message`가 `block`이 된다는 걸 한참 삽질을 하다가 깨닫게 되었다.

그래서 내가 느낀건 `React`도 결국 `JavaScript` 라고 했지만 `JavaScript`또한 `html,css`를 잘 작성하면 자바스크립트 코드 로직을 구성하는데 있어 더 편리할 것 같다는 생각을 다시 한번 할 수 있는 시간이 되었다.
