/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

import { data } from "./data.js";

const nav = document.querySelector(".nav");
const list = document.querySelectorAll("ul li");
let currentSound = null;

// 배경색 변경 함수
function setBgColor(colorA, colorB = "#000") {
  document.body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
}

// visual image alt값 변경 함수,
function setImage(image, alt) {
  const visual = document.querySelector(".visual img");

  visual.src = `./assets/${image.toLowerCase()}.jpeg`;
  visual.alt = alt;
}
function setNameText(text) {
  const nickName = document.querySelector(".nickName");

  nickName.textContent = text;
}

// 오디오 함수
function setAudio(audio) {
  if (currentSound) currentSound.pause();
  currentSound = new Audio(`./assets/audio/${audio}`);
  currentSound.play();
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

  setAudio(targetData.audio);
}
nav.addEventListener("click", clickHandler);
