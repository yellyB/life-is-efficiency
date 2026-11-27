---
title: "[JavaScript] 읽기쉬운 코드를 위해서 const를 사용하자: const, let, var에 대해"
created: '2021-12-10'
---

변수를 선언할 때 깔끔하고 읽기 쉬운 코드를 작성하고 싶다면 const를 즐겨 써야 한다.

설명에 앞서 const, let, var의 특징에 대해 알아보자.

유효 범위

lexical scope: var / block scope: let, const

재할당 가능 여부

가능: let, var / 불가능: const

##  1

먼저 유효 범위에 대해 알아보면

블록 스코프인 let과 const는 변수를 선언한 중괄호를 벗어나면 변수에 접근할 수 없는 반면 var는 한 번 선언하면 어디서든 접근할 수 있다.

\* 여기서 헷갈리면 안 되는 게 자바스크립트는 함수 레벨 스코프를 사용하기 때문에 여기서 말하는 중괄호는 if문이나 for문 같은 제어문을 말하는 것이다. 자세한 사항은 스코프에 대해 더 알아보기

아래의 예시처럼 var를 사용해 address='seoul'로 변수를 할당하고 내부 if문에서 address를 재선언하면 바깥에서 선언한 address의 값까지 바뀌게 된다.

&lt;var>

```javascript
    const lexicalScope = () => {
      var address = 'seoul';
      if (true) {
        var address = 'busan';
        console.log(address); //busan
      }
      console.log(address); //busan
    };
```

하지만 const와 let은 다르다.

바깥에서 선언한 변수와 내부에서 선언한 변수명이 같더라도 내부에서 선언한 address는 중괄호를 벗어나면 값이 유효하지 않다.

&lt;let>

```javascript
    const blockScope = () => {
      let address = 'seoul';
      if (true) {
        let address = 'busan';
        console.log(address); //busan
      }
      console.log(address); //seoul
    };
```

심지어 var는 같은 범위 내에서도 같은 이름의 변수 선언이 가능하기 때문에 var를 사용한다면 많은 혼란을 줄 수 있다.

##  2

다음으로 재할당 가능 여부에 대해 알아보자면

const는 변수를 선언한 후 이후에 값을 바꿀 수 없다.

```javascript
const address = 'seoul';
address = 'busan';

//Cannot assign to 'address' because it is a constant
```

위처럼 address를 다른 값으로 변경 시도하면 에러를 뿜어낸다.

이 특징으로 인한 장점은 해당 값은 이 이후에도 변하지 않는다는 걸 다른 개발자들에게 알려줄 수 있다는 것이다.

let으로 선언된 변수는 다른 줄에서 언제 무슨 값으로 변할지 신경을 계속 쓰면서 코드를 읽어야 한다.

함수가 몇 줄 내로 끝난다면 크게 상관없겠지만 만약 몇백 줄이 넘는 함수라면 const를 활용한 코드보다 읽기 어려워질 것이다.

여기서 기억해야 할 점은 const는 값을 재할당할 수는 없지만 값을 바꿀 수는 있다는 것이다.

이 말은 무슨 뜻이냐면 자바스크립트에는 값 자체로 저장되는 데이터 타입과 값이 저장된 주소를 담고 있는 데이터 타입이 있다.

후자의 경우 주소 값을 수정하는 게 아닌 이상 값을 수정하는 건 가능하다는 뜻이다.

대표적으로 주소 값을 저장하는 배열 타입을 살펴보자.

```javascript
const color = ['red','green'];
const color = ['yellow', 'purple'];
//불가
```

이 처럼 color배열을 재할당하면 해당 배열의 주소 값이 바뀌어 버리기 때문에 불가능하다.

```javascript
const color = ['red','green'];
color.push('yellow');
//가능
```

하지만 위처럼 배열에 값을 추가하는 것은 color의 주소 값을 변경하는 것이 아니기 때문에 가능하다.

결론!!

-   블록 스코프가 아니어서 읽는 사람에게 혼란을 주는 var의 사용을 지양하자
-   재할당이 불가능해 명확한 값을 알려줄 수 있는 const를 사용하자
