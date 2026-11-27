---
title: "REST API란? (REST의 설계 원칙)"
created: '2022-02-09'
---

**REST API**

클라이언트에서 서버의 리소스에 액세스 할 수 있도록 해주는 메커니즘

**REST 디자인 원칙 6가지**

균일한 인터페이스: 요청이 어디서 오든지 동일한 리소스에 대한 요청은 동일하게 보여야 함

클라이언트-서버 디커플링: 서로 간 독립적이어야 함. 클라이언트가가 아는 유일한 정보는 URI

Stateless: 각 요청에서 처리에 필요한 모든 정보가 포함되어야 함. 서버 측 세션 필요 없음

캐싱 가능성: 클라이언트 혹은 서버에서 캐싱 가능해야 함 ⇒ 서버 측 확장성 증가 & 클라이언트 성능 향상

계층 구조 아키텍처: 호출과 응답이 서로 다른 계층 통과. 서로 직접 연결 아님. 중개자 있음

코드 온디맨드: 정적 리소스 전송하지만 특정 경우는 실행코드(jaca 애플릿) 포함할 수도 있음

**HTTP 메서드**

GET : 조회

POST : 생성

PUT : 갱신

DELETE : 삭제

**설계 가이드**

URI (Uniform Resouce Identifier)를 사용하여 리소스를 처리

▷ 명사를 사용하여 자원을 나타냄

▷ 일관성이 핵심: 일관성 있는 리소스 명명 규칙

- 슬래시로 계층적 관계 나타냄

- 글꼴에 따라 안 보일 수 있는 밑줄(\_) 지양 & 하이픈(-)으로 가독성 향상

- URI에 소문자 사용

▷ URI에는 CRUD함수 사용하지 않음. 오직 리소스를 식별하기 위해서만 사용

▷ 쿼리 구성 요소를 사용하여 리소스 컬렉션 필터링

출처

[https://www.ibm.com/kr-ko/cloud/learn/rest-apis](https://www.ibm.com/kr-ko/cloud/learn/rest-apis)

[https://restfulapi.net/resource-naming/#:~:text=1.3.-,URI,intuitive%20and%20easy%20to%20use](https://restfulapi.net/resource-naming/#:~:text=1.3.-,URI,intuitive%20and%20easy%20to%20use.)
