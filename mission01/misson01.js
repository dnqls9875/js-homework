// ! 객체
/**
 * ? 문제 : 객체에서 특정 키의 값을 안전하게 가져오는 함수를 작성할 것.
 * ? 설명 : 객체와 키를 인수로(argument)로 받아, 객체와 해당 키가 존재하면 그 키에 해당하는 값을 반환하고, 존재하지 않으면 에러를
 * ? 발생시키는 함수를 작성할 것.
 */
//

// const getValueAtObject = (obj, key) => {
//   return obj[key];
// };

// const getValueAtObject = (obj, key) => obj[key]; // 화살표 함수는 한 줄로 작성 시 return 값을 작성하지 않고도 return 해준다.

// 에러 메시지 출력 조건문
const getValueAtObject = (obj, key) => {
  if (key in obj) {
    return obj[key];
  } else {
    console.error("잘못 작성하였습니다. 올바른 내용을 작성해주세요.");
  }
};

const user = {
  name: "이우빈",
  age: 30,
  email: "dnqls9875@gmail.com",
  city: "양주",
};

console.log(getValueAtObject(user, "name")); // 이우빈
console.log(getValueAtObject(user, "age")); // 30
console.log(getValueAtObject(user, "email")); //  dnqls9875@gmail.com
console.log(getValueAtObject(user, "city")); // 양주
console.log(getValueAtObject(user, "hobby")); // 에러메시지 , undefined

// ! 배열
/**
 * ? 배열에서 특정 인덱스의 값을 안전하게 가져오는 함수를 작성할 것.
 * ? 설명 : 배열과 인덱스를 인수로 받아, 인덱스가 배열의 유효한 범위 내에 있으면 그 인덱스에 해당하는 값을 반환하고,
 * ? 유효하지 않은 인덱스일 경우 에러 메시지를 반환하는 함수를 작성할 것.
 * */

// const getNumberAtArray = (arr, index) => arr[index];

const getNumberAtArray = (arr, index) => {
  if (arr[index]) {
    return arr[index];
  } else {
    console.error("Error!");
  }
};

const numbers = [10, 20, 30, 40, 50];

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.log(getNumberAtArray(numbers, 0)); // 10
console.log(getNumberAtArray(numbers, 5)); // Error!
console.log(getNumberAtArray(numbers, -1)); // Error!
