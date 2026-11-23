---
title: "[CSS] 말줄임(...)표: 한줄 또는 여러줄 말줄임 표시"
date: '2023-03-30'
---

아래처럼 말줄임표를 표시하는 방법을 알아보자.

![](./1.png)

## 1\. 한 줄일 때 말줄임표

말줄임표를 적용해야 하는 텍스트가 한 줄인 경우는 아래처럼 css를 작성한다.

```css
div {
  width: 200px;  /* 오버되면 말줄임 적용할 최대 넓이 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

###  **결과**

![](./2.png)

## 2\. 여러 줄일 때 말줄임표

말줄임표를 적용해야 하는 텍스트가 한 줄인 이상인 경우는 아래처럼 css를 작성한다.

```css
div {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;  /* 2줄 넘어가면 말줄임 */
  -webkit-box-orient: vertical;
}
```

### 결과

![](./3.png)

예를 들어 5줄이 넘어갈 때 말줄임표를 표시하고 싶다면 아래와 같이 설정해 주면 된다.

\-webkit-line-clamp: 5;
