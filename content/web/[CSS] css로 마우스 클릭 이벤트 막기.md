---
title: "[CSS] css로 마우스 클릭 이벤트 막기"
date: '2023-01-27'
---

```css
  tr > td:nth-child(2) {
    pointer-events: none;  // 이벤트 막음
    span {
      pointer-events: all;  // 이벤트 허용
    }
  }
```

위 처럼

> pointer-events: none;

을 주면 아무런 클릭 이벤트가 실행되지 않는다.

그런데 만약 이벤트를 막은 요소 중에서도 특정 요소에는 이벤트를 주고 싶다면 예시의 span 에 사용한것처럼

> pointer-events: all;

을 주면 이벤트가 정상적으로 먹힌다.
