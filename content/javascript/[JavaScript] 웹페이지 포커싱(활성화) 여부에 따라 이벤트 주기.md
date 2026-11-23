---
title: "[JavaScript] 웹페이지 포커싱(활성화) 여부에 따라 이벤트 주기"
date: '2022-12-09'
---

웹 개발을 하다 보면 다른 탭으로 이동했다가 다시 작업 중이던 탭으로 돌아왔을 때에 특정 이벤트를 주어야 하는 경우가 있다.

document.visibilityState를 이용하면 간단하게 구현할 수 있다.

```javascript
const onVisible = async function () {
  if (document.visibilityState) {
    // 페이지(탭) 활성화 시 동작
  }
};
document.addEventListener('visibilitychange', onVisible);
```

참고:

[https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)

[Document.visibilityState - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)
