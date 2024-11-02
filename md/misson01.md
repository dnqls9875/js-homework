# 1주차 과제 mission01

- 객체와 배열의 값을 안전하게 호출하는 함수를 만들 것

## 목차

1. [객체](#객체)
2. [배열](#배열)
3. [결론](#결론)

## 객체

> 문제 : 객체에서 특정 키의 값을 안전하게 가져오는 함수를 작성할 것.
> 설명 : 객체와 키를 인수로(argument)로 받아, 객체와 해당 키가 존재하면 그 키에 해당하는 값을 반환하고, 존재하지 않으면 에러를 발생시키는 함수를 작성할 것.

> 객체와 키를 인수로(argument)로 받아, 객체와 해당 키가 존재하면 그 키에 해당하는 값을 반환하고, 존재하지 않으면 에러를 발생시키는 함수를 작성할 것.

함수에서는 코드 블록 안에서 `return`으로 반환해주지 않고, `console.log`를 이용해 참조하면 `undefined` 값이 출력된다. 그리고 함수에서 `return`으로 반환해주면 그 즉시 함수를 종료한다고 배웠다.

`getValueAtObject`함수의 **인자(parameter)** 를 obj, key로 설정하였고, 함수를 호출 시 **인수**로 여기 안에 값을 넣어 줘서 함수를 실행하는데 호출 시 **인자** 값을 **인수**로 받기 위해서는 함수 안에서 `return`으로 반환해줘야 한다. 이때 해당 객체의 프로퍼티 값을 가져오고 싶다면 대괄호 표기법으로 접근해야 한다. 그래서 `return`값을 **obj[key];** 라고 작성해줬다.

아래의 `console.log(getValueAtObject(user, "name"));` 를 살펴보면 console.log를 이용해 참조를 하고 그 안에서 함수를 호출하여 그 함수 값을 출력하는 내용이다. 함수의 인자로 obj, key를 설정해 주었기 때문에 **user = obj , "name" = key ** 로 설정이 되는 것이다. key값을 문자열로 받는 이유는 **함수에서 동적으로 프로퍼티 값을 가져와야 할 때** 문자열로 전달하는 것이 필요하기 때문이다.

```javascript
function getValueAtObject(obj, key) {
  return obj[key];
}

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
console.log(getValueAtObject(user, "hobby")); //  undefined
```

참조 결과 객체 프로퍼티에 포함된 식별자의 값을 잘 출력하는데, 참조 시 포함되어 있지 않은 프로퍼티 식별자와 값은 내용이 없기 때문에 `undefined`로 출력 되는 걸 확인 할 수 있다. 이제 객체와 해당 키가 존재하지 않으면 에러메시지를 반환하는 것도 조건문을 이용해 추가 시켜보겠다.

```javascript
function getValueAtObject(obj, key) {
  if (key in obj) {
    return obj[key];
  } else {
    console.error("잘못된 값입니다.");
  }
}
```

**key in obj** 는 해당 key를 가진 프로퍼티가 객체 내에 있는지 확인하고자 할 때 사용된다. 그래서 객체 내에 해당 키가 존재하면 키 값을 반환하고, 그렇지 않으면 에러메시지를 출력하겠다라는 내용이다.

### 결과

```javascript
console.log(getValueAtObject(user, "name")); // 이우빈
console.log(getValueAtObject(user, "age")); // 30
console.log(getValueAtObject(user, "email")); //  dnqls9875@gmail.com
console.log(getValueAtObject(user, "city")); // 양주
console.log(getValueAtObject(user, "hobby")); //  잘못된 값입니다. undefined
```

## 배열

> 문제 : 배열에서 특정 인덱스의 값을 안전하게 가져오는 함수를 작성할 것.
> 설명 : 배열과 인덱스를 인수로 받아, 인덱스가 배열의 유효한 범위 내에 있으면 그 인덱스에 해당하는 값을 반환하고, 유효하지 않은 인덱스일 경우 에러 메시지를 반환하는 함수를 작성할 것.
> 추가 설명 :
>
> > - 배열의 인덱스는 0부터 시작하며, 주어진 인덱스가 배열의 유효한 범위 내에 있는지 확인해야 합니다.
> > - 인수로 받은 대상이 배열이 아닐 경우 에러를 생성하고 생성한 에러를 반환해야 합니다.
> > - 유효한 인덱스일 경우 해당 인덱스의 값을 반환하고, 그렇지 않으면 에러를 생성하고 생성한 에러를 반환해야 합니다.

```javascript
function getNumberAtArray(arr, index) {
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
```

동작은 위에 객체와 비슷한 동작을 하므로 공통되는 부분의 내용은 생략하겠다. 조금 다른 부분은 `getNumberAtArray` 함수의 인자로 arr, index가 들어가고 이 인자를 반환해서 함수 호출 시 인수로 값을 입력하는데 **arr = numbers (배열)이고, index = 배열의 length** 이다. 배열은 `length`를 활용하여 배열에 담긴 요소가 몇개인지 알아낼 수 있는데 지금 배열은 총 5개 0~4이다. 그래서 0부터 4까지만 정상적으로 함수를 호출하고, 그 이외에 0보다 작거나 혹은 4를 넘어가는 `length`를 반환했을 땐 그 내용이 없기 때문에 에러 메시지를 출력한다는 내용이다.

`index >= 0 && index < arr.length` 배열의 인덱스는 0부터 시작해야 하므로 index가 0이상 일 때로 지정해줘야 0부터 시작할 수 있다. 그리고 index가 arr.length(10,20,30,40,50) 총 0~4까지의 인덱스 보다 작아야 0부터 4까지의 인덱스로 접근할 수 있다. 여기서 OR(논리곱 연산자)를 사용해서 앞에 내용과 뒤의 내용모두가 `true`일 때 해당 인덱스의 값을 반환하고, 그 밖에는 에러메시지를 반환한다는 내용이다.

## 결론

아직은 익숙하지 않은 함수, 배열, 객체를 모두 접하면서 어떤식으로 함수가 호출이 되며 어떤식으로 배열과 객체의 데이터 값에 접근 할 수 있는지에 대해 알게 되었고, 예전에는 if 문에 return을 사용했을 때 막연하게 왜 return이 불가능하네 라고만 생각했고, 함수안에서 if문을 사용시 return이 가능하네 라고만 생각했다. 하지만 이제는 아 연산자, 표현식 이런 곳에서는 return을 사용할 수 있지만 조건문, 반복문 같은 곳에서는 return을 반환할 수 없어서 불가능하구나, 혹은 아 함수는 return을 반환할 수가 있어서 if문 안에서 return을 사용해도 함수가 그 값을 반환하는구나 라고 이해를 하게 되어서 좋았고,

수업 때 잘하시는 분들은 빠르게 코드를 작성했지만 나같은 경우는 주제를 이해하는데 조금 시간이 걸렸던 것 같다. 한마디로 수업 내용은 이해했지만 한글로 그 내용을 이해하고 스크립트 로직을 빠르게 이해하고 작성하는데는 시간이 좀 필요했던 것 같다. 코드를 많이 접하고, 내용을 반복해서 읽고, 가능하다면 예습도 하면서 이 격차를 조금씩 줄이고 싶다라는 생각을 했다.
