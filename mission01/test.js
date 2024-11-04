const person = {
  name: "Alice",
  age: 25,
  city: "Wonderland",
};

// 에러 메시지 출력 조건문
function getValueAtObject(obj, key) {
  if (Object.hasOwn(person, "name")) {
    return obj[key];
  } else {
    throw new ReferenceError("잘못 작성하였습니다. 올바른 내용을 작성해주세요.");
  }
}

console.log(getValueAtObject(person, "name")); // 'Alice'
console.log(getValueAtObject(person, "age")); // 25
console.log(getValueAtObject(person, "city")); // 'Wonderland'
console.log(getValueAtObject(person, "country")); // Error !
