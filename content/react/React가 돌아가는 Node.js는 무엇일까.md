---
title: "React가 돌아가는 Node.js는 무엇일까?"
created: '2021-09-17'
---

Nods.js

확장성 있는 네트워크 애플리케이션을 만들 수 있도록 설계된 자바스크립트 런타임 환경이다.

자바스크립트를 브라우저 밖에서 사용할 수 있게 도와준다고 생각하면 된다.

\* 런타임 :  프로그램이 실행되는 상태를 뜻함

Node.js 환경에 express 등의 프레임워크를 구동하면 서버가 되고

Node.js 환경으로 React를 제작하면 프론트엔드가 된다.

바벨이라는 컴파일러 도구를 가지고 있어 JSX문법을 사용할 수 있다.

Nods.js 특징

-   이벤트 기반 : 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
-   논 블로킹 I/O 모델 : 이전 작업이 완료될 때까지 대기하지 않고 다음 작업을 수행 (=비동기)
-   싱글 스레드 : 싱글 스레드를 사용하지만 child\_process.fork() API를 사용해 자식 프로세스 생성할 수 있음

Nods.js 장점

-   훌륭한 퍼포먼스 - 단위 시간당 처리량과 애플리케이션 확장성을 최적화
-   순수 자바스크립트 - 브라우저와 웹 서버 코드를 같은 자바스크립트로 사용할 수 있음
-   NPM : 수천만 개의 재사용 가능한 패키지
-   활발한 개발 커뮤니티

NPM

  - 노드 패키지 매니저(Node Pakacge Manager)의 약자

  - Node.js에서 사용할 수 있는 모듈들을 패키지화하여 관리한다.

Express

Node.js 웹 애플리케이션 프레임워크

풀어쓰자면 쉽게 서버를 구성할 수 있도록 도와주는 클래스와 라이브러리의 집합체이다.

Nods.js와 React

▶ webpack

  - 모던 JavaScript 애플리케이션을 위한 정적 모듈 번들러

\* 모듈 번들러 : 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미한다.

  - webpack이 애플리케이션을 처리할 때 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 번들을 생성함

▶ Babel

  - 자바스크립트 컴파일러

  - 현재 및 이전 브라우저 또는 환경에서 ECMAScript 2015+ 코드를 이전 버전의 JavaScript로 변환하는 데 주로 사용되는 도구 체인이다.

  - Babel은 JSX 구문을 변환할 수 있다.

\* JSX : JavaScript를 확장한 문법

웹브라우저에서 JavaScript가 해석되면 Web API를 통해서 웹브라우저에서 결과가 나타난다.
Node.js에서 JavaScript가 해석되면 libuv를 통해서 OS에서 결과가 나타난다.

그래서 Node.js를 통해 webpack과 Babel을 사용하면 (이 과정을 보통 빌드라고 함) React 코드가 compatible version of JavaScript로 바뀌고, 다시 bundle 되어
브라우저에 올리기만 하면 되는 결과물이 나타납니다.

참고

MDN - Express/Node소개 [https://developer.mozilla.org/ko/docs/Learn/Server-side/Express\_Nodejs/Introduction](https://developer.mozilla.org/ko/docs/Learn/Server-side/Express_Nodejs/Introduction)

바벨 공식 문서 [https://babeljs.io/docs/en/](https://babeljs.io/docs/en/)
