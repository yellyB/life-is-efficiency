---
title: "[React] CRA로 생성한 리액트 환경변수가 development, production를 제외하고 적용되지 않을 때"
date: '2023-01-18'
---

CRA로 리액트 프로젝트를 생성하면 자동으로 환경변수 두 가지 development, production 가 적용된다.

package.json의 스크립트에 환경변수에 따라 빌드를 할 수 있게 되어있는데

개발환경과 운영환경 말고 스테이징 환경도 필요하게 되어서 staging 을 추가하고 싶었다.

그래서 .env.staging 파일을 추가하고 빌드 스크립트도 아래와 같이 추가하였다.

```javascript
  "scripts": {
  	...
    "build:staging": "REACT_APP_ENV=staging react-scripts build",
    ...
  },
```

하지만 빌드를 하고 나면 환경변수가 스테이징 환경으로 적용되지 않았다.

## 문제 원인

CRA로 생성한 프로젝트는 기본적으로 development, production 두 가지밖에 없어, 빌드 스크립트에서 두 가지 환경만을 커버할 수 있게 되어있다.

## 해결 방법

**방법 1 :  eject**

eject로 웹팩을 설정할 수 있게 처리하여 직접 설정을 해주는 방법이 있다.

하지만 단지 이 설정만을 위해 굳이 웹팩을 직접 설정할 필요가 있을지 의문이 든다.

**방법 2 : craco**

craco로 웹팩을 한 겹 감싸서 웹팩 설정을 간접적으로 해줄 수 있다.

그러나 방법 역시 환경 변수 설정을 위해 굳이 이 라이브러리를 사용하기에는 너무 거창하게 느껴졌다.

**방법 3 : env-cmd**

env-cmd 패키지를 사용하여 빌드 환경에 따라 환경변수를 사용할 수 있도록 해주는 방법을 택했다.

```javascript
  "scripts": {
    ...
    "build:staging": "env-cmd -f .env.staging react-scripts build",
    ...
  },
```
