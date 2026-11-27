---
title: "[WEB] CORS의 개념과 해결 방법"
created: '2022-05-19'
---

#### **출처(Origin)란?**

CORS를 알아보기 이전에 '출처'라는 것이 무엇인지 먼저 알아야 한다.

출처는 서버의 위치를 뜻하고 프로토콜, 호스트, 포트로 구성되어있다.

우리가 로컬에서 개발하면서 자주 보는 아래 같은 주소를 구분하자면 이렇다.

**https://localhost:3000**

Protocol Host Port

경우에 따라서 이 뒤에 Path, Query string, Fragment가 붙을 때도 있지만 **출처(Origin)는** 위의 URL구성을 뜻한다.

콘솔로 location객체의 origin프로퍼티를 출력해보면 현재 출처를 알 수 있다.

#### **CORS의 뜻**

개발을 하다 보면 CORS를 자주 접하게 되는데 이와 관련해서 SOP라는 정책이 있다.

SOP는 간단하게 설명해서 같은 출처에서 리소스를 공유할 수 있다는 정책을 뜻한다.

위에서 보았듯이 같은 출처인지 확인하려면 Protocol, Host, Port 세 가지가 동일한지 확인하면 된다.

이 셋 중에 하나라도 일치하지 않으면 Cross Origin이라고 하는데 이때 CORS가 등장한다.

CORS는 Cross-Origin Resouce Sharing의 약자로 다른 출처의 자원에 접근할 수 있는 권한을 부여하는 정책이라고 보면 된다.

이러한 정책이 있는 이유는 HTTP 요청 시 자동으로 쿠키가 첨부되기 때문에 보안상 이유 때문이다.

(HTTP 요청이 아닌, 예를 들어 HTML에서 img태그 같은 경우는 Cross-Origin정책을 따르기 때문에 다른 리소스에 접근하는 것이 가능하다.)

#### **CORS 요청 과정**

CORS 요청이 어떤 식으로 진행되는지 아래 그림을 통해 잘 알 수 있다.

![CORS 요청의 흐름을 설명하는 다이어그램](./CORS%20요청의%20흐름을%20설명하는%20다이어그램.png)

*CORS 요청의 흐름을 설명하는 다이어그램*

브라우저는 중재인으로 Cross-Origin 요청을 보낼 때에 항상 Origin 헤더를 요청에 추가한다.

A 출처에서 B 출처로 요청을 보낼 때 Origin 헤더에는 A 출처가 담겨서 요청이 전송된다.

서버는 이를 확인하고 요청을 받아들이기로 한 상태라면 Access-Control-Allow-Origin을 응답에 추가한다.

이 헤더에는 허가된 출처의 정보나 \* 이 담긴다.

이 정보를 바탕으로 브라우저는 응답의 성공/실패 여부를 결정하는 것이다.

그런데 브라우저는 서버로 보낼 요청이 안전한지 아닌지의 여부를 preflighted 요청으로 미리 확인한 후 본 요청을 보낸다.

이는 크게 4 단계로 구분할 수 있다.

\[1단계\]

본 요청을 보내기 전에 브라우저가 자체적으로 preflight요청을 보낸다.

\[2단계\]

서버는 예비 요청에 대한 응답을 보낸다.

> Access-Control-Allow-Methods: GET
> Access-Control-Allow-Headers: Content-Type, API-Key

위와 같은 응답을 받으면 브라우저는 전송하려는 요청 메서드가 서버에서 허용하는 메서드에 부합하는지 등의 여부를 판단하여 본 요청을 보낸다.

\[3단계\]

preflight요청이 성공적으로 이뤄졌다면 브라우저는 본 요청을 전송한다.

이때 Cross-Origin 요청이기 때문에 Origin헤더가 붙어서 전송된다.

\[4단계\]

서버에서 Access-Control-Allow-Origin 헤더에 출처가 들어간 응답을 보낸다.

![CORS 요청 과정 4단계](./CORS%20요청%20과정%204단계.png)

*CORS 요청 과정 4단계*

그런데 아래의 경우를 만족한다면 preflight 요청을 생략하는 경우도 있다.

1\. safe method: GET, HEAD, POST 중 한 가지를 사용한 요청

2\. safe header: 안전한 응답 헤더로 분류되는 헤더에 접근할 때

-   Cache-Control
-   Content-Language
-   Content-Type
-   Expires
-   Last-Modified
-   Pragma

#### **CORS 해결방법**

가장 중요한 CORS 에러 시 해결방법.

여러 가지 해결 방법이 있지만 보편적으로 사용하는 방법 두 가지를 소개한다.

1\. 가장 간단하고 해결방법인 서버에서 Access-Control-Allow-Origin 세팅하기

> res.setHeader('Access-Control-Allow-origin', '\[허용할 출처\]')

위와 같은 방법으로 CORS를 허용한다.

2\. 클라이언트에서 proxy 설정을 통해

외부 API를 사용하는 등 서버를 직접 제어할 수 없는 경우도 있을 것이다.

이럴 때는 proxy 설정을 통해 브라우저를 통하지 않고 API요청을 하여 해결할 수 있다.
