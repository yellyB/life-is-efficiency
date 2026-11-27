---
title: "[JavaScript] 익명 함수, 화살표 함수에 대해(함수 선언식과 함수 표현식)"
created: '2021-12-10'
---

기존의 방식으로 사용하던 함수에는 필요 없는 부분이 많다.

이런 부분을 전부 걷어내고 사용하자는 의도로 만들어진 것이 화살표 함수다.

## **화살표 함수**

화살표 함수에는 =>만 있을 뿐 function키워드나 return키워드, 인수의 괄호, 중괄호가 모두 생략되었다.

&lt;기존의 방식>

```javascript
    function getFirstLetter(str) {
      return str[0];
    }
```

이와 같은 함수를 이름이 함수의 일부분으로 선언되었다는 뜻으로 기명 함수라고 한다.

혹은 아래와 같이 이름이 지정되지 않은 익명 함수를 선언하고 변수에 할당하는 방식도 있다.

```javascript
    const getFirstLetter = function () {
      return str[0];
    };
```

여기서 화살표 함수를 만들기 위해 function키워드와 인수를 감싸던 괄호를 제거해보자.

```javascript
    const getFirstLetter = str => {
      return str[0];
    };
```

하지만 아직 더 줄일 수 있을 것 같으니 return과 중괄호도 없애버리자.

```javascript
    const firstLetter = str => str[0];

    console.log(firstLetter('bomoto'));  // b
```

세 줄짜리 함수를 불필요한 부분을 모두 제거하여 한 줄로 간단하게 작성했다.

## **함수 선언식과 함수 표현식**

위에서 기존 함수 방식을 설명하면서 기명 함수와 익명 함수를 언급했는데 왜 두 가지 방식이 있고 둘의 차이점은 무엇일까?

둘은 함수 선언식(fucntion declaration)과 함수 표현식(function expression)으로 얘기할 수 있다.

가장 큰 차이는 호이스팅 되는지의 여부인데 이 부분은 호이스팅 관련 글에서 자세히 다루도록 하겠다.

[2021.12.14 - \[TypeScript\\JavaScript\] - \[JavaScript\] 호이스팅: 변수와 함수의 호이스팅 차이점](https://bomoto.tistory.com/89)

[JavaScript 호이스팅: 변수와 함수의 호이스팅 차이점](https://bomoto.tistory.com/89)

참고:

함수 표현식을 사용하지 않아야 하는 경우

[https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/](https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/)
