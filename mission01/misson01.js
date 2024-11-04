// ! 객체
/**
 * ? 문제 : 객체에서 특정 키의 값을 안전하게 가져오는 함수를 작성할 것.
 * ? 설명 : 객체와 키를 인수로(argument)로 받아, 객체와 해당 키가 존재하면 그 키에 해당하는 값을 반환하고, 존재하지 않으면 에러를
 * ? 발생시키는 함수를 작성할 것.
 */
//

const person = {
  name: "Alice",
  age: 25,
  city: "Wonderland",
};

// const getValueAtObject = (obj, key) => {
//   return obj[key];
// };

// const getValueAtObject = (obj, key) => obj[key]; // 화살표 함수는 한 줄로 작성 시 return 값을 작성하지 않고도 return 해준다.

// 에러 메시지 출력 조건문
function getValueAtObject(obj, key) {
  if (key in obj) {
    return obj[key];
  } else {
    console.error("잘못 작성하였습니다. 올바른 내용을 작성해주세요.");
  }
}

console.log(getValueAtObject(person, "name")); // 'Alice'
console.log(getValueAtObject(person, "age")); // 25
console.log(getValueAtObject(person, "city")); // 'Wonderland'
console.log(getValueAtObject(person, "country")); // Error !

// ! 배열
/**
 * ? 배열에서 특정 인덱스의 값을 안전하게 가져오는 함수를 작성할 것.
 * ? 설명 : 배열과 인덱스를 인수로 받아, 인덱스가 배열의 유효한 범위 내에 있으면 그 인덱스에 해당하는 값을 반환하고,
 * ? 유효하지 않은 인덱스일 경우 에러 메시지를 반환하는 함수를 작성할 것.
 * */

// const getNumberAtArray = (arr, index) => arr[index];

function getNumberAtArray(arr, index) {
  if (!Array.isArray(arr)) {
    throw new Error("전달된 첫번째 인수의 데이터 타입은 배열 타입입니다. getNumberAtArray 함수의 첫 번째 인수는 배열 타입 이여야 합니다.");
  }

  if (index >= 0 && index < arr.length) {
    return arr[index];
  } else {
    console.error("Error!");
  }
}

const numbers = [10, 20, 30, 40, 50];

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.log(getNumberAtArray(numbers, 0)); // 10
console.log(getNumberAtArray(numbers, 5)); // Error!
console.log(getNumberAtArray(numbers, -1)); // Error!

console.log("-------------------------------------- 과제풀이");

const object = {
  name: "이우빈",
  age: 30,
};

// 객체에 키를 입력했을 때 값이 나오길 기대
// 함수는 매개변수를 유연하게 받을수록 재사용성이 증가

function getValueAtObject(object, key) {
  // if (!(Object.prototype.toString.call(object).slice(8, -1).toLowerCase() === "object")) {
  //   console.error("getValueAtObject 함수의 첫 번째 인수는 객체 타입 이여야 합니다.");
  // }

  if (!(typeof object === "object")) {
    throw new TypeError("getValueAtObject 함수의 첫 번째 인수는 객체 타입 이여야 합니다.");
  }

  if (typeof object !== "string") {
    throw new TypeError("getValueAtObject 함수의 첫 번째 인수는 문자 타입 이여야 합니다.");
  }

  if (!(key in object)) {
    throw new SyntaxError("해당 객체에는 key값이 존재하지 않습니다.");
  }
  return object[key];
}

getValueAtObject(object, "name"); // '이우빈'

// 뭐 부터 시작하지?

/**
 * 1. 함수의 이름
 * 2. 함수의 실행부 직접 작성 인자 작성
 * 3. 함수의 로직
 * 4. valdation
 */

// Object.prototype.toString();

function _getValueAtObject(object, key) {
  // entries는 배열로 만들어주는 메서드
  const entries = Object.entries(object);

  for (let keyValue of entries) {
    const _key = keyValue[0];
    const value = keyValue[1];

    if (_key === key) {
      return value;
    }
  }
}

console.log(_getValueAtObject(obj, "name"));

const arr = ["정주연", "박혜미", "김영현"];

function getNumberAtArray(array, index) {
  if (!Array.isArray(array)) {
    throw new Error(`전달된 첫 번째 인수의 데이터 타입은 ${typeof array} 타입 입니다. 해당 함수의 첫 번째 인수는 배열 타입 이어야 합니다.`);
  }

  if (index >= 0 && index < array.length) {
    return array[index];
  } else {
    throw new Error("...");
  }
}

console.log(getNumberAtArray(arr, 3));
