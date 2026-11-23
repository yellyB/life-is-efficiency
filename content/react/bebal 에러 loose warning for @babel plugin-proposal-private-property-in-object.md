---
title: "bebal 에러: \"loose\" warning for @babel/plugin-proposal-private-property-in-object"
date: '2022-10-12'
---

```javascript
["@babel/plugin-proposal-private-methods", { "loose": true }]
```

젠킨스 빌드를 돌리는데 빌드가 30분째 돌아가고 있는 것이다.

원래는 5분쯤이면 빌드 완료가 떴기 때문에 무엇이 문제인지 로그를 확인해봤다.

> Though the "loose" option was set to "false" in your @babel/preset-env config, it will not be used for @babel/plugin-proposal-private-property-in-object since the "loose" mode option was set to "true" for @babel/plugin-proposal-class-properties.

위와 같은 warning이 console에서 반복되면서 빌드가 계속 진행 중 상태였다.

워닝 내용에도 나와있듯이 바벨 설정에 loose를 true로 설정해주면 된다.

> \["@babel/plugin-proposal-private-methods", { "loose": true }\]

이렇게 하면

```javascript
{
  ...,
  "plugins": [
    ...,
    ["@babel/plugin-proposal-private-methods", { "loose": true }]
  ]
}
```

빌드 문제는 해결된다.

도대체 저 설정이 뭐길래 이런 상황이 벌어지는 건지 babel 공식 문서를 살펴봤다.

[https://babeljs.io/docs/en/babel-plugin-proposal-private-methods](https://babeljs.io/docs/en/babel-plugin-proposal-private-methods)

[Babel · The compiler for next generation JavaScript](https://babeljs.io/)

loose의 기본값은 false 인 상태인데, true로 설정되었다면 private method가 WeakSet에 할당되는 것이 아니라 자신의 부모에게 직접적으로 할당된다고 나와있다.

WeakSet이 뭔지 몰라서 또 이걸 찾아봤더니

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global\_Objects/WeakSet](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

[WeakSet - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

객체만 저장할 수 있는 Set이라고 생각하면 될 것 같다.

내가 코드 수정을 하면서 리액트 스토어에

```javascript
        this.orderData.bankAccount && this.orderData.bankAccount.id !== 0
          ? {
              ...response.data,
              bankAccount: { ...this.orderData.bankAccount },
            }
          : {
              ...response.data,
            };
```

이런 코드를 짰었는데 이 부분에서 객체 사용 관련된 부분이 문제가 있었나 보다.

위 코드를

```javascript
        const data = response.data;
        if (this.orderData.bankAccount && this.orderData.bankAccount.id !== 0) {
          data.bankAccount = { ...this.orderData.bankAccount };
        }

        this.orderData = data;
```

이렇게 수정하고 바벨 설정을 추가했더니 해결되었다.

그런데 코드를 아래처럼 수정했을 때도 바벨 에러가 나긴 했었으니까 리팩터링 할 때 더 자세히 찾아보고서 수정해야 할 것 같다.
