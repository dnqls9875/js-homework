# 4주차 과제 poster

- li 클릭 시 해당 이미지에 맞게 visual 이미지 변경, 배경색 변경, 이 소스는 data.js에서 가져올 것.

## 목차

- [4주차 과제 poster](#4주차-과제-poster)
  - [목차](#목차)
    - [문제](#문제)
  - [리펙토링](#리펙토링)
  - [결론 및 후기](#결론-및-후기)

### 문제

```
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
```

일단 나는 처음부터 코드를 함수단위로 분리하는게 어려워서 모든 코드를 clickHandler 함수에 담아서 작성 한 후 함수를 만들어 분리를 하는 리펙토링 과정을 거쳤다.

```javascript
import { data } from "./data.js";

const nav = document.querySelector(".nav");
const list = document.querySelectorAll("ul li");
const visual = document.querySelector(".visual img");
const nickName = document.querySelector(".nickName");

function clickHandler(e) {
  const li = e.target.closest("li");
  // li가 아니라면 종료
  if (!li) return;

  // li에 붙어있는 data-index index 변수에 할당
  const index = li.dataset.index;

  // data.js data 배열의 index 값에 접근
  const targetData = data[index - 1];

  // 모든 li에 is-active 제거 및 초기화
  list.forEach((li) => li.classList.remove("is-active"));

  li.classList.add("is-active");

  document.body.style.background = `linear-gradient(to bottom, ${targetData.color[0]},${targetData.color[1]})`;

  visual.src = `./assets/${targetData.name}.jpeg`;
  visual.alt = targetData.alt;

  nickName.textContent = targetData.name;
}
nav.addEventListener("click", clickHandler);
```

이벤트 시 안전하게 이벤트를 작업하기 위해서는 이벤트 위임을 해야 한다고 배웠다.
이벤트 위임은 자식 요소에서 발생하는 이벤트를 부모 요소에서 처리하는 기법. 즉, 이벤트 리스너를 부모 요소에 붙여서 자식 요소에서 발생하는 이벤트를 처리하는 방식이다.

그래서 nav에 `addEventListener` 처리 하였고, 이벤트 핸들링을 적용하였다.

클릭 시 이벤트 적용되는 `clickHandler` 함수에서 매개변수로 e를 받고, `e.target console`로 출력하게 되면 해당 클릭사항에 맞는 요소들이 출력되게 된다.
우리는 `li`에 붙어있는 `data-index` , `is-active`를 이용해야 하기 때문에 `li` 변수에 `e.target`에 가장가까운 `li`를 반환해 `li`변수에 할당했다.

`const index = li.dataset.index` 는 `li` data-index 속성에 접근하기 위한 index 변수다.

`const targetData = data[index - 1]` 여기서 data는 data.js의 data 변수이고, 이 data 변수는 배열로 구성되어 있는데 안의 요소들이 객체로 감싸져있다. html에 작성되어 있는 data-index 는 1부터 시작하지만
자바스크립트에서의 배열은 0부터 시작하므로 data-index -1을 해주면 1-1 =0 , 2-1=1, 3-1=2, 4-1=3 가 되어 data.js에서의 원하는 데이터의 index를 가져올 수 있다.

`list.forEach((li) => li.classList.remove("is-active"))` 먼저 전체 li를 잡은 list를 반복문을 돌려 모든 li에 접근하고, 매개변수 li에 remove class로 is-active class를 모두 초기화 한다음
`li.classList.add("is-active")`로 추가해주면 클릭 시 is-active가 잘 적용이 된다.

아래의 코드는 targetData로 data.js에서 객체의 키를 뽑아 사용한 것이다.

## 리펙토링

```javascript
import { data } from "./data.js";

const nav = document.querySelector(".nav");
const list = document.querySelectorAll("ul li");

// 배경색 변경 함수
function setBgColor(colorA, colorB = "#000") {
  document.body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
}

// visual image alt값 변경 함수
function setImage(image, alt) {
  const visual = document.querySelector(".visual img");

  visual.src = `./assets/${image.toLowerCase()}.jpeg`;
  visual.alt = alt;
}
function setNameText(text) {
  const nickName = document.querySelector(".nickName");

  nickName.textContent = text;
}

function clickHandler(e) {
  const li = e.target.closest("li");

  // li가 아니라면 종료
  if (!li) return;

  // li에 붙어있는 data-index index 변수에 할당
  const index = li.dataset.index;

  // data.js data 배열의 index 값에 접근
  const targetData = data[index - 1];

  // 모든 li에 is-active 제거 및 초기화
  list.forEach((li) => li.classList.remove("is-active"));

  li.classList.add("is-active");

  // 첫번째 인수만 입력 시 두번째 인수 자동으로 #000 color
  setBgColor(targetData.color[0], targetData.color[1]);

  setImage(targetData.name, targetData.alt);

  setNameText(targetData.name);
}
nav.addEventListener("click", clickHandler);
```

코드의 차이가 있다라고 하면 함수를 분리해서 해당 템플릿 리터럴로 targetData로 interpolation 된 부분을 인자로 전달하여 click이벤트 핸들러 부분에서 호출하여 인자값을 인수로 전달하는 함수를 만들었다.

일단 다시 코드를 작성하다 보니 한가지 실수를 발견하여 그 부분을 고쳤다.
visual.src = `./assets/${targetData.name}.jpeg`; 바로 이부분인데 현재 data.js에 data 배열안에 있는 객체 name 객체프로퍼티에 보면 name의 값이 대문자로 작성되어 있는 것을 볼 수 있다. 근데 assets 파일에는 파일명이 소문자 파일이다. 오류는 없을 것 같지만 그래도 정확하게 데이터를 처리 받고 싶어서 `setImage` 함수에 아래와 같이 접근하였다.

```javascript
function setImage(image, alt) {
  const visual = document.querySelector(".visual img");

  visual.src = `./assets/${image.toLowerCase()}.jpeg`;
  visual.alt = alt;
}
```

인자 image.toLowerCase()로 image에는 하단의 선언 함수 인수로 targetData.name이 들어오기 때문에
targetData.name.toLowerCase()를 한 것과 같다.

## 결론 및 후기

비동기를 이용한 api를 사용해보고 싶었지만.. 비동기에 대한 이해도가 많이 부족하여 과제 시간보다 오버할 가능성이 컸기 때문에.. 과제 제출 이후에 비동기 공부를 다시 복습하면서 변경해볼 생각이다. 일단 이번 과제에 가장 좋았던 부분은 이벤트 위임을 다시 한번 재밋는 예제로 접근할 수 있어 좋았고, 함수를 분리하는게 처음엔 되게 생소하고, 바로바로 머리속에서 생각이 나지 않아 모든 기능을 `clickHandler` 에 넣고 하나하나 차근히 분리해서 리팩토링 했는데 그게 생각보다 잘 되어서 함수에 대해 또 학습이 되어 좋았던 것 같다.
