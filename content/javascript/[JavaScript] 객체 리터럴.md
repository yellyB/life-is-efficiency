---
title: "[JavaScript] 객체 리터럴"
date: '2021-12-26'
---

**객체 생성 방법**

-   객체 리터럴
-   Object 생성자 함수
-   생성자 함수
-   Object.create 메서드
-   클래스

객체 리터럴은 값으로 평가되는 표현식

**프로퍼티**

객체는 프로퍼티의 집합

\* 이미 존재하는 프로퍼티 키를 중복 선언하면 기존 프로퍼티를 덮어쓴다.

```javascript
var foo = {
    name: 'Lee',
    name: 'Kim'
};

console.log(foo.name);  // Kim
```

**메서드**

객체에 묶여 있는 함수. 함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있다.

일반 함수와 구분하기 위해 메서드라고 부른다.

**프로퍼티 읽기, 삭제**

\- 객체에 존재하지 않는 프로퍼티에 접근하면 ReferenceError가 아닌 undefined를 반환

```javascript
var person = {
    name: 'Lee'
};

console.log(person.age);  // undefined
```

\- 객체에 존재하지 않는 프로퍼티를 삭제하면 아무일도 일어나지 않음(에러 없음)
