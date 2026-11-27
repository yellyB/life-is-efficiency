---
title: "트리 쉐이킹(Tree Shaking)으로 자바스크립트 성능 개선하기"
created: '2023-05-09'
---

# 자바스크립트 성능 개선 필요성

네트워크 전송 시 자바스크립트의 평균 전송 크기는 350KB 정도이다.

이것은 압축된 것이기 때문에 파싱되고 컴파일 및 실행되면 900KB로 늘어난다.

![파싱되고 컴파일 및 실행되면 900KB로 크기 증가](./파싱되고%20컴파일%20및%20실행되면%20900KB로%20크기%20증가.svg)

*파싱되고 컴파일 및 실행되면 900KB로 크기 증가*

![동일한 170KB 크기의 자바스크립트 파싱/컴파일 수행 비용 vs JPEG 이미지 디코딩 시간](./동일한%20170KB%20크기의%20자바스크립트%20파싱%20컴파일%20수행%20비용%20vs%20JPEG%20이미지%20디코딩%20시간.png)

*동일한 170KB 크기의 자바스크립트 파싱/컴파일 수행 비용 vs JPEG 이미지 디코딩 시간*

자바스크립트라는 자원을 수행하는데 비용이 많이 들어가는데, 웹 애플리케이션은 대부분 자바스크립트로 만들어진 것이라서 자바스크립트 엔진 효율성 향상을 위한 지속적인 개선이 이루어지고 있다.

자바스크립트 성능을 개선하기 위한 기술 중 코드 스플리팅은 자바스크립트 청크로 애플리케이션을 분할하고, 청크를 필요로 하는 애플리케이션의 경로에만 청크들을 배분하여 성능을 향상시키는 기법이 있다.

그러나 코드 스플리팅을 사용한다고 해서 사용되지 않는 코드를 포함한 자바스크립트 애플리케이션의 문제를 해결하지는 못한다.

이 문제의 해법을 트리 쉐이킹에서 찾을 수 있다.

# 트리 쉐이킹이란?

사용하지 않는 코드를 제거하는 방식이다.

tree shaking이라는 용어는 트리 구조에서 유래했는데, 나무로 따지면 가지치기라고도 볼 수 있다.

트리 쉐이킹이라는 용어는 Rollup 때문에 인기를 얻게 되었으나, 이와 같은 개념은 이미 존재했으며 이 개념을 webpack에서도 찾아볼 수 있다.

애플리케이션이 만들어진지 얼마 되지 않은 상태라면 적은 양의 디펜던시를 가지고 있을 것이고 또 추가된 디펜던시 대부분을 사용할 것이다.

하지만 애플리케이션이 오래될수록 많은 디펜던시들이 추가될 수 있고, 오래된 디펜던시들이 코드에서 제거되지 못할 수도 있다.

이 때문에 사용하지 않는 대량의 자바스크립트 코드들이 앱에 남아있게 된다.

트리 쉐이킹은 정적 ES6 모듈의 특정 부분을 가져오는 import 구문을 사용해 이러한 문제를 해결한다.

```javascript
// 모든 배열 유틸리티들을 가져온다.
import arrayUtils from "array-utils";

// 유틸의 일부만 가져온다.
import { unique, implode, explode } from "array-utils";
```

development 환경에서는 아무 설정도 하지 않아 import 된 것과 상관없이 전체 모듈을 가져온다.

그러나 production 빌드에서는 명시적으로 import 되지 않은 ES6 모듈로부터 export 를 “shake”하기 위해서 webpack을 설정하여 빌드 결과물 크기를 더 작게 만들 수 있다.

# 트리 쉐이킹이 필요한 지점 찾기

애플리케이션에서 아래와 같은 import 구문이 사용되었다고 해보자.

```capnproto
import * as utils from "../../utils/utils";
```

이 import 문은 “utils 모듈로부터 모든 것을 import 하여 utils 네임 스페이스에 넣어라” 라고 말한다.

실제로 utils 모듈의 모든 것들을 사용한다면 모르지만, utils의 일부분만 사용한다면 불필요하게 웹 성능에 안 좋은 영향을 미치게 된다.

# 적용 방법

### **1\. Babelrc 파일 설정**

Babel은 자바스크립트 문법이 브라우저에서 호환 가능하도록 ES5로 변환하는 라이브러리이다.

이 작업을 polyfill이라 부르고, Babel은 없어서는 안 될 도구이다.

그러나 Babel이 트리 쉐이킹을 방해할 수도 있다.

babel-preset-env를 사용하면 ES6 모듈을 CommonJS모듈로 변환해 준다.

이는 Babel이 import 를 require() 구문으로 변환시키는데, require은 export 하는 모든 모듈을 가져온다.

트리 쉐이킹은 이런 환경에서는 사용되기 어렵고 webpack은 번들에서 무엇을 제거해야 하는지 모르게 된다.

이 상황의 해결책은 ES6 모듈만 남도록 babel-preset-env를 설정하는 것이다.

```clojure
{
  “presets”: [
    [
      “@babel/preset-env”,
      {
	    "modules": false
      }
    ]
 ]
}
```

이렇게 설정을 해주면 Babel은 의도대로 import, export 구문을 ES5로 변환시키지 않는다.

###  ********2\. 모듈 내**** 사이드 이펙트 발생 여부 확인****

사용하지 않는 디펜던시들을 제거할 때 고려해야 할 점은 프로젝트의 모듈들이 사이드 이펙트를 발생시키는지 여부이다.

사이드 이펙트의 단순한 예시로 함수가 스코프 밖의 무언가를 변경할 때를 들 수 있다.

```javascript
let fruits = ["apple", "orange", "pear"];

const addFruit = function(fruit) {
  fruits.push(fruit);
};

addFruit("kiwi");
```

fruits 배열은 addFruit 함수 스코프 밖에 위치하는데, addFruit 함수는 fruits 배열을 변경시켜 사이드 이펙트를 발생시킨다.

바깥 변수의 값을 변경하지 않고, 모듈 내 코드로만 봤을 때 인풋 값으로 아웃풋 값을 예측할 수 있도록 되어야 트리 쉐이킹을 하기 안전한 모듈이다.

그럼에도 개발자가 봤을 때 해당 모듈이 사이드 이펙트를 발생시키지 않는다고 판단하였다면 사이드 이펙트가 일어나지 않는 모듈이라고 설정을 해줄 수 있다.

package.json 파일에서 아래와 같이 sideEffects: false 로 설정하면 패키지와 디펜던시들이 사이드 이펙트를 발생시키지 않는다는 것이다.

```json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": false
}
```

혹은 특정 파일만 사이드 이펙트의 영향을 받지 않는 모듈이라고 따로 선언할 수도 있다.

```json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": [
    "./src/utils/utils.js"
  ]
}
```

위 방법 말고도 webpack 설정파일에서도 플래그 값을 지정할 수 있다.

```ruby
module.rules: [
  {
    include: path.resolve("node_modules", "lodash"),
    sideEffects: false
  }
]
```

### **3\. 필요한 것만 import 하기**

만약 utils 모듈에서 필요한 함수가 한 가지여서 필요한 함수 한 가지만 import 하는 경우의 webpack 결과물 차이점을 확인해 보자.

위에서 보았던 utils 전체를 import 하는 것과 다르게 아래와 같이 필요한 simpleSort라는 함수만 가져온다고 해보자.

```capnproto
import { simpleSort } from "../../utils/utils";
```

아래 두 경우의 webpack 결과물 main의 용량을 확인해 보자

![트리 쉐이킹을 하기 전](./트리%20쉐이킹을%20하기%20전.png)

*트리 쉐이킹을 하기 전*

![트리 쉐이킹 후](./트리%20쉐이킹%20후.png)

*트리 쉐이킹 후*

main 번들 파일에 이점이 생긴 것을 확인할 수 있다.

스크립트 다운로드 시간을 줄일 뿐 아니라 처리 시간도 단축할 수 있다.

# 트리 쉐이킹이 잘 되지 않을 때

트리 쉐이킹은 webpack 최신 버전에서 잘 동작하지만 모든 조건을 만족하는데도 트리 쉐이킹이 되지 않는 외부 코드 혹은 라이브러리가 있을 수 있다.

이럴 땐 import 해서 불러오려는 코드가 ES6로 export 되고 있는지 확인해봐야 한다.

만약 ES6가 아니라 CommonJS(modules.export)로 export 하고 있다면, 이는 트리 쉐이킹을 할 수 없는 모듈인 것이다.

이 예시로, Lodash가 이런 트리 쉐이킹이 잘 동작하지 않는 경우에 해당된다.

이 경우는 Lodash 설계 방식 때문에 일어나는 경우인데, 오래된 lodash 대신 lodash-es를 설치하고, 조금 다른 구문인 ‘cherry-picking’을 사용한다.

```clean
// 설정이 잘 되어있어도 lodash 모든 것들을 가져온다.
import { sortBy } from "lodash";

// sortBy 경로에서 가져온다. (cherry-picking)
import sortBy from "lodash-es/sortBy";
```

하지만 만약 일관된 import 문을 사용하기 원한다면, babel-plugin-lodash를 설치하고 Babel 설정 파일에 플러그인을 추가하여 기존의 표준 Lodash을 import 하면서도 사용하지 않는 다른 모듈을 제거할 수 있다.

출처

****[트리 쉐이킹으로 자바스크립트 페이로드 줄이기](https://ui.toast.com/weekly-pick/ko_20180716)****

****[웹 성능 최적화를 위한 Tree Shaking 소개](https://helloinyong.tistory.com/305)****
