---
title: "[JavaScript] 호이스팅: 변수와 함수의 호이스팅 차이점"
date: '2021-12-14'
---

자바스크립트에는 **호이스팅**이라는 개념이 있다.

호이스팅은 코드를 실행하기 전 선언한 변수가 해당 스코프 최상단으로 끌어올려져 실행되는 것을 말한다.

```javascript
  function getData() {
    console.log(greeting);
    var greeting = 'hi';
  }
  getData();
```

이와 같은 코드를 실행하면 어떻게 될까?

greeting변수가 console.log 아래에 선언되어있기 때문에 에러가 날 것이라 예상할 수 있지만 var로 선언한 greeting이 최상단으로 끌어올려져

```javascript
    var greeting;
    console.log(greeting);  // undefined
    greeting = 'hi';
```

과 같이 실행되는 것과 동일하다.

변수 할당이 아닌 변수 선언만 최상단으로 끌어올려지기 때문에 값은 undefined로 출력되지만 선언은 되었기 때문에 에러가 나지는 않는다.

변수가 선언조차 안되었을 경우 Cannot find name 'greeting'으로 에러가 뜨는 것과 비교해보면 차이를 알 수 있다.

그렇다면 함수 선언의 경우엔 어떨까?

```javascript
  console.log(func);
  function func() {}
```

앞에서 살펴본 변수의 호이스팅과 자바스크립트에서는 함수가 타입의 한 종류로 취급되는 걸 생각해보면 func함수 선언 자체는 위로 끌어올려질 테니 에러는 나지 않지만 undefined라는 결과를 출력할까?

코드를 실행해보면 func함수 자체인 ƒ func() {} 가 출력된다.

자바스크립트에서 변수는 변수의 선언부만 끌어올리지만 함수의 경우엔 함수 전체를 끌어올린다.

여기서 또 등장하는 개념이 함수 선언식과 함수 표현식이다.

[2021.12.10 - \[TypeScript\\JavaScript\] - \[JavaScript\] 익명 함수, 화살표 함수에 대해(함수 선언식과 함수 표현식)](https://bomoto.tistory.com/84)

[JavaScript 익명 함수, 화살표 함수에 대해(함수 선언식과 함수 표현식)](https://bomoto.tistory.com/84)

```javascript
  function func1() {}  // 함수 선언식
  var func2 = function () {};  // 함수 표현식 (익명함수)
  var func3 = function func4() {};  // 함수 표현식 (기명함수)
```

위와 같이 구분할 수 있다.

앞에서 봤던 호이스팅 개념을 떠올려보면 함수 자체를 선언하는 함수 선언식은 호이스팅에 영향을 받는다.

스코프 내에서 함수를 선언하면 맨 마지막에 선언된 함수라도 첫 줄에서 호출할 수 있는 것이다.

반면에 함수를 변수에 할당하는 함수 표현식은 함수가 할당된 변수의 선언부만 호이스팅 되기 때문에 변수에 할당된 시점 이전에 호출하면 undefined 을 내놓기 때문에 할당 이후부터 의도대로 호출할 수 있다.

이 때문에 호이스팅의 영향을 받는 함수 선언식은 지양하는 게 좋다.

또 변수를 선언할 때 var를 사용하기보다는 블록 스코프인 let과 const를 사용해야 코드 관리가 편하다.
