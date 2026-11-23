---
title: "[React/CSS] 리액트 줄 바꿈: 자바스크립트 줄 바꿈(\\n) 안됨"
date: '2022-11-16'
---

## **문제 상황**

문자열을 줄바꿈을 해주고 싶을때가 있다.

문자열 자체에 정규식 개행문자를 추가했지만 JSX 안에서 보여줄 때, 줄바꿈이 먹히지 않는다.

```javascript
const str = '줄바꿈\n테스트';
```

![](./1.png)

줄바꿈 html 태그인 &lt;br/>을 넣어도 태그가 문자 그대로 출력된다.

![](./2.png)

## **해결방법**

JSX안에서는 개행문자 \\n 이 먹히지 않아서 일어나는 문제이다.

이럴때는 CSS에서 아래처럼 설정해준다.

```css
white-space: pre-line;
```

![결과](./결과.png)

*결과*

\* 참고로 여기서 줄바꿈 뿐 아니라 들여쓰기도 필요하다면 아래 옵션으로 설정해준다.

```css
white-space: pre-wrap;
```

공식 문서:

[https://developer.mozilla.org/en-US/docs/Web/CSS/white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)

[white-space - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
