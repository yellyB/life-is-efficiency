---
title: "[JavaScript] 펼침 연산자 효과적으로 사용하기"
date: '2021-11-30'
---

지금까지 펼침 연산자를 일부 데이터를 수정하는 데에만 사용하고 있었다.

```javascript
  const emp = { name: 'kim', age: 20, nick: 'bom' };
  const setPerson(emp) {
    return [{ ...emp, age: 30 }];
  }
  const newEmp = setPerson(emp);
  console.log(newEmp);  // {name: 'kim', age: 30, nick: 'bom'}
```

하지만 펼침 연산자는 더 많은 용도로 쓸 수 있다.

##  1

첫 번째로 코드를 알아보기 쉽게 만들어준다는 것이 있다.

```javascript
  const fruits = ['apple', 'banana', 'cherry'];

  const removeFruite = (fruits, willRemove) => {
    const index = fruits.indexOf(willRemove);
    return fruits.slice(0, index).concat(fruits.slice(index + 1)); // 이 방법보다는
    return [...fruits.slice(0, index), ...fruits.slice(index + 1)]  // 이 방법이 알아보기 쉽다
  }

  removeFruite(fruits, 'banana');
```

혹은

```javascript
  const fruits = ['apple', 'banana', 'cherry'];

  const copied = fruits.slice(); // 리스트 복사 됨. slice를 모르면 해석 어려움
  const copied = [...fruits]; // 직관적
```

이처럼 concat이나 slice 메서드를 사용해 배열을 조작하는 경우에 그 메서드를 모른다면 코드를 알아보기 어려울 수 있다.

펼침 연산자를 사용한다면 훨씬 직관적인 코드 작성이 가능하다.

##  2

펼침 연산자를 사용하는 또 다른 장점으로 원본 데이터 조작을 막을 수 있다는 것이 있다.

원본 데이터의 변경을 피하고 데이터를 조작하는 것의 예를 들어보자면

과일가게의 모든 고객에게 10% 할인을 해줄 것이고 과일을 3개 이상 산 고객에게는 덤으로 오렌지를 하나씩 줄 것이다.

```javascript
  const fruits = [
    { kind: 'apple', price: 200 },
    { kind: 'banana', price: 400 },
    { kind: 'cherry', price: 500 },
  ];
  const bonus = { kind: 'orange', price: 100 };

  const addFruit = (fruits) => {
    fruits.push(bonus);  // 원본 데이터인 fruits 변경됨
    return fruits;
  }

  const discount = (fruits) => {
    const totalPrice = fruits
      .map(function (x) {
        return x.price * 0.9;
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0);
    return totalPrice;
  }

  const saleEvent = (fruits) => {
    let cart: any[] = fruits;
    if (fruits.length >= 3) {
      cart = addFruit(fruits); // 덤을 줌
    }
    console.log(fruits.length);  // 4 출력
    const totalPrice = discount(fruits); // 10% 할인
    return { cart: cart, totalPrice: totalPrice };
  }

  const yourCart = saleEvent(fruits);
  console.log(yourCart);  // totalPrice: 1080
```

이 코드에서는 덤을 줄 때 fruits에 push를 한다.

이렇게 하면 원본 데이터인 fruits가 변경되어서 마지막에 결과 yourCart를 출력해보면 totalPrice에 덤으로 준 오렌지까지 합쳐진 가격이 나온다.

이럴 때 펼침 연산자를 사용하여 원본 변경을 피할 수 있다.

```javascript
  const fruits = [
    { kind: 'apple', price: 200 },
    { kind: 'banana', price: 400 },
    { kind: 'cherry', price: 500 },
  ];
  const bonus = { kind: 'orange', price: 100 };

  const addFruit = (fruits) => {
    return [...fruits, bonus];
  }

  const discount = (fruits) => {
    const totalPrice = fruits
      .map(function (x) {
        return x.price * 0.9;
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0);
    return totalPrice;
  }

  const saleEvent = (fruits) => {
    let cart: any[] = fruits;
    if (fruits.length >= 3) {
      cart = addFruit(fruits); // 덤을 줌
    }
    console.log(fruits.length); // 3 출력
    const totalPrice = discount(fruits); // 10% 할인
    return { cart: cart, totalPrice: totalPrice };
  }

  const yourCart = saleEvent(fruits);
  console.log(yourCart);  // totalPrice: 990
```

이처럼 addFruit메서드에서 펼침 연산자로 새 배열을 반환해주면 fruits의 변경 없이 덤이 추가된 배열을 얻을 수 있다.

최종 가격도 990으로 원래 구매한 3개의 과일의 가격만 출력된다.

##  3

마지막으로 매개변수에 펼침 연산자를 사용해 예외 상황을 방지할 수 있다는 것이 있다.

배열을 매개변수로 받아 그 length가 3이 넘는지를 판별하는 함수를 만든다고 해보자.

```javascript
    const foods = ['pizza', 'chicken', 'burger'];
    const isValidLength = (foods) => {
      return foods.every(item => item.length > 3);
    };
    console.log(isValidLength(foods));  // true
```

타입 스크립트에서는 그럴 일이 없겠지만 자바스크립트에서는 isValidLength 함수가 인수로 배열을 받는다는 걸 코드 내용을 확인하기 전까진 알 수 없다.

이 함수는 로직이 간단하니 쉽게 배열을 매개변수로 전달해야 한다는 걸 알 수 있지만 실제 프로젝트에서는 인수의 타입을 파악하지 못하고 함수를 사용할 가능성도 있다.

그래서 매개변수로 문자열을 전달하면 every는 배열 메서드이기 때문에 코드가 실행되지 않고 TypeError를 띄운다.

```javascript
    const foods = 'pizza';
    const isValidLength = (foods) => {
      return foods.every(item => item.length > 3);
    };
    console.log(isValidLength(foods));  // TypeError: foods.every is not a function
```

이때 매개변수에 펼침 연산자를 사용하여 깔끔하게 해결할 수 있다.

```javascript
    const foods = 'pizza';
    const isValidLength = (...foods) => {
      return foods.every(item => item.length > 3);
    };
    console.log(isValidLength(foods)); // true
```
