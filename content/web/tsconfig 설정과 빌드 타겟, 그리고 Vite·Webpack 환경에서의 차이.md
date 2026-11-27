---
title: "tsconfig 설정과 빌드 타겟, 그리고 Vite·Webpack 환경에서의 차이"
created: '2025-08-13'
---

“tsconfig의 target이나 lib를 바꿨는데, 왜 빌드 결과물 문법은 그대로일까?”

이 글은 **target과 lib이 실제로 어떤 역할**을 하는지, **문법 변환과 타입(표준 API) 제공**이 어떻게 다른지,

그리고 **Vite(Esbuild 기반)와 Webpack(Babel 기반) 환경**에서 이 설정들이 어떻게 다르게 작동하는지를 정리해 봤다.

* * *

## **1\. tsconfig.json의 역할**

`tsconfig.json`은 타입스크립트 컴파일러(tsc)가 코드를 어떻게 해석하고 어떤 기준으로 타입 검사를 할지 가이드를 준다.

그래서 이 파일은 Vite나 Webpack 환경에서 빌드된 JS 결과물에는 영향을 거의 주지 않는다.

**compilerOptions 몇 가지:**

-   **target**: 타입 검사 기준과 기본 표준 API 세트를 결정
-   **lib**: 타입 검사할 때, 기본으로 쓸 수 있게 넣어주는 자바스크립트 내장 기능 목록
-   **useDefinedForClassFields**: 클래스 필드 초기화 방식(true: 표준 동작. false: 옛 방식)
-   **strict**: 타입 검사 엄격 모드
-   **paths**: import시 쓸 별칭과 실제 경로 매핑(이 설정은 빌드물엔 적용되지 않기 때문에 vite.config등에서 resolve.alias로 따로 지정필요)
-   **baseUrl**: 사용하는 경로들의 기준점이 될 기본 폴더 지정

## **2\. target vs lib**

위에서 적었던 것처럼 `target` 옵션은 타입스크립트를 어떤 세대의 자바스크립트 환경 기준으로 타입 검사할지 결정한다.

이 값에 따라 Promise, Map 같은 표준 API 타입이 기본으로 포함된다.

> "target": "es5" → Promise, Map, Symbol, includes 모두 타입 에러
> "target": "es2015" → Promise, Map, Symbol 타입 제공, includes는 여전히 타입 에러
> "target": "ESNext" → includes 포함, 최신 표준 + Stage 3 API까지 타입 제공

**\[target\]**

-   문법 변환을 한다.
-   최종 JS 코드의 문법 수준(다운레벨링 기준)
-   기본 포함할 표준 API 타입 세트를 자동 선택

예시)

> "target": "es5" → 문법을 ES5로 변환, API 타입은 ES5 세트만 포함 → Promise, Map 등 사용 시 타입 에러
> "target": "es2015" → es5보다 빌드 결과물이 현대적. 문법은 ES2015 이상 유지, API 타입은 ES2015 세트 포함 → Promise 타입 제공

**\[lib\]**

-   타입 검사 시 포함할 표준 API 타입을 직접 지정
-   target보다 우선 적용(문법 변환에는 해당 없음)

예시)

> "lib": \["ESNext"\] → 최신 API 타입 전부 제공 (includes, Promise.any, Array.at 등)

target이 "es5"여도 최신 API 타입 사용 가능 (단, 문법은 여전히 ES5로 변환됨)

\*문법과 타입

**문법**

-   브라우저/런타임이 이해할 수 있는 코드 형태
-   ex) target이 낮으면 const -> var, async -> generator로 변환

**타입**

-   TypeScript가 컴파일 시 참고하는 표준 API 목록(lib이 결정, target은 기본값만 제공)
-   ex) Promise가 타입 정의에 있는지 없는지를 검사(없으면 타입 에러 발생)

## **3\. vite.config.ts**

Vite + Rollup에서 빌드 결과물에 영향을 주는 건 `vite.config.ts`이다.

Vite + Rollup 환경의 빌드 흐름은 다음과 같다.

1.  esbuild가 TypeScript 문법을 JS로 변환
2.  Rollup이 번들링
3.  build.target 값에 맞춰 빌드 문법이 결정

```python
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build',
    target: ['es2015'] // 여기서 빌드 문법 수준 결정
  }
});
```

\* Webpack환경에서는 Babel이 browerslist를 읽어서 다운레벨링 수준을 결정한다. (package.json이나 browserslistrc에서 설정)

\* 다운레벨링?

```typescript
// 원본 (ES2015 문법)
const add = (a: number, b: number) => a + b;

// 다운레벨링 결과 (ES5 문법)
var add = function (a, b) { return a + b; };
```

여기서 한 일:

-   const → var로 변환
-   화살표 함수 → 일반 function으로 변환

즉, **최신 문법**을 지원하지 않는 브라우저/런타임에서도 동작하게

**낮은 세대 문법**으로 바꿔주는 게 다운레벨링이다.

## **4\. Vite 환경과 Webpack 환경 비교**

우선 Webpack과 Vite 공통점은 둘 다 `tsconfig.target`이 **빌드엔 영향을 거의 주지 않는다**는 점이다.

그리고 둘 다 **타입 체크를 기본적으론 안 해서** 추가 설정을 해주어야 한다.

&lt;table style="border-collapse: collapse; width: 100%; height: 85px;" border="1" data-ke-align="alignLeft" data-ke-style="style15">&lt;tbody>&lt;tr style="height: 20px;">&lt;td style="width: 17.6357%; height: 20px;">&nbsp;&lt;/td>&lt;td style="width: 44.961%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">Webpack&lt;/span>&lt;/td>&lt;td style="width: 37.4032%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">Vite&lt;/span>&lt;/td>&lt;/tr>&lt;tr style="height: 20px;">&lt;td style="width: 17.6357%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">트랜스파일러&lt;/span>&lt;/td>&lt;td style="width: 44.961%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">Babel 중심(@babel/preset-env + browerslist)&lt;/span>&lt;/td>&lt;td style="width: 37.4032%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">esbuild 중심&lt;/span>&lt;/td>&lt;/tr>&lt;tr style="height: 25px;">&lt;td style="width: 17.6357%; height: 25px;">&lt;span style="font-family: 'Nanum Gothic';">타입 체크&lt;/span>&lt;/td>&lt;td style="width: 44.961%; height: 25px;">&lt;span style="font-family: 'Nanum Gothic';">기본은 안 함. CRA 등 일부 템플릿에서 fork-ts-checker-webpack-plugin으로 dev/build 중 타입 검사 추가 가능&lt;/span>&lt;/td>&lt;td style="width: 37.4032%; height: 25px;">&lt;span style="font-family: 'Nanum Gothic';">기본은 안 함. 필요 시 vite-plugin-checker로 dev/build 중 타입 검사 추가 가능&lt;/span>&lt;/td>&lt;/tr>&lt;tr style="height: 20px;">&lt;td style="width: 17.6357%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">빌드 문법 결정&lt;/span>&lt;/td>&lt;td style="width: 44.961%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">browerslist&lt;/span>&lt;/td>&lt;td style="width: 37.4032%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">vite.config.build.target&lt;/span>&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

## **5\. Vite 환경에서 타입 검사 전략**

Vite는 기본적으론 타입 검사를 하지 않는다.

그래서 개발서버나 빌드 과정에서 타입 오류가 있어도 그대로 통과해 버린다.

Vite가 esbuild로 TypeScript 문법을 제거만 할 뿐, 타입 정보를 전부 버리기 때문이다.

그래서 Vite환경에서 타입 안정성을 확보하려면 다음 중 하나의 방법을 사용해야 한다.

**1) 수동 검사: TypeScript 컴파일러 실행**

> npx tsc --noEmit

\* --noEmit 옵션은 JS 출력 없이 타입만 검사하겠다는 의미

**2) 자동 검사: vite-plugin-checker**

개발 서버나 빌드 시 타입 검사를 자동으로 실행해 준다.

> npm i -D vite-plugin-checker

```typescript
// vite.config.ts
import checker from 'vite-plugin-checker';

export default {
  plugins: [
    checker({ typescript: true })
  ]
};
```

\* 그런데 왜 Vite는 기본적으로 타입 검사를 안 해줄까?

\-> 빠른 빌드를 위해 타입 검사를 뺐다. 물론 webpack도 기본적으로는 타입 검사를 안 하지만, CRA로 만든 프로젝트는 자동 타입검사 기능이 포함되어 있다. 하지만 Vite는 공식 템플릿인 create-vite 에서도 자동 타입검사 기능을 넣지 않았다.

* * *

결국, **문법 변환은 빌드 도구 설정에서**, **타입 제공은 tsconfig에서** 각각 제어된다는 걸 이해하면

“왜 tsconfig.target을 바꿔도 빌드 결과물이 그대로인지” 헷갈리지 않게 된다.
