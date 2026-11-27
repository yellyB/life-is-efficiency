---
title: "[JavaScript] == vs === (동등 연산자와 동치 연산자)"
created: '2021-12-10'
---

다른 언어와 다르게 자바스크립트에는 비교 연산자로 == 과 === 두 가지가 있는데 둘은 수행하는 역할이 다르다.

## \== 동등 연산자(Equal Operator)

비교하려는 값이 타입이 다르다면 같은 타입으로 변경하여 비교를 한다.

쉽게 말하자면 자바스크립트가 어떻게든 둘을 같은 값으로 보기 위해 노력한다고 할 수 있다. (귀여운 js...)

```javascript
console.log('1' == 1);  //true
console.log(true == '1');  //true
console.log(true == 1);  //true
console.log(false == 0);  //true
console.log('' == 0);  //true
console.log([] == 0);  //true
```

위의 경우 전부 true를 반환한다.

## \=== 동치 연산자(Strict Equal Operator)

두 비교 대상 데이터를 타입을 변환시키지 않고 일치 여부를 엄격하게 검사한다.

```javascript
console.log('1' === 1);  //false
console.log(true === '1');  //false
console.log(true === 1);  //false
console.log(false === 0);  //false
console.log('' === 0);  //false
console.log([] === 0);  //false
```

이번엔 모두 false를 반환한다.

코딩을 할 때 혼란을 줄이고 읽기 쉬운 코드를 작성하려면 두 값을 엄격하게 검사하는 동치 연산자를 이용하는 게 도움이 된다.
