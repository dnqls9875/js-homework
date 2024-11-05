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

// 객체를 배열로 변경하고, valdation 한 코드

function getValueAtObject(obj, key) {
  if (Object.hasOwn(person, key)) {
    return obj[key];
  } else {
    throw new Error("getValueAtObject 함수의 인수로 오는 내용은 아닌 것 같습니다.");
  }
}

// function getValueAtObject(obj, key) {
//   if (Object.prototype.hasOwnProperty.call(person, key)) {
//     return obj[key];
//   } else {
//     throw new Error("getValueAtObject 함수의 인수로 오는 내용은 아닌 것 같습니다.");
//   }
// }

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

function getNumberAtArray(arr, index) {
  if (index >= 0 && index < numbers.length) {
    return arr[index];
  } else {
    throw new TypeError("'getNumberAtArray' 함수의 두 번째 인수로 잘못된 값을 입력했습니다.");
  }
}

const numbers = [10, 20, 30, 40, 50];

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.log(getNumberAtArray(numbers, 0)); // 10
console.log(getNumberAtArray(numbers, 5)); // Error!
console.log(getNumberAtArray(numbers, -1)); // Error!
