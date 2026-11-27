---
title: "[HTML5] html의 data attribute (데이터 속성)"
created: '2022-06-02'
---

### data attributes

html5는 특정 엘리먼트와 연관되어있지만 어떤 의미를 가질 필요가 없는 데이터에 대한 확장성을 고려하여 디자인되었다.

data-\* 속성을 사용하여 비표준 속성이나 DOM의 추가 속성을 사용하는 등의 hack 없이도 의미론적인 추가 정보를 저장할 수 있다.

### 사용 예시

HTML에서 아래와 같이 data- 속성을 사용하여 시각적으로 나타낼 필요가 없는 추가 정보를 저장할 수 있다.

```html
<article
  id="electric-cars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```

이를 자바스크립트에서 읽으려면 아래와 같이 작성한다.

```javascript
const article = document.querySelector('#electric-cars');
// The following would also work:
// const article = document.getElementById("electric-cars")

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

html에서 대시("-")를 사용했던것을 자바스크립트에서는 카멜 케이스로 바꿔서 읽어들인다.

dataset뒤에 읽어들이려는 속성을 기재하여 값을 가져온다.

모든 값은 string형이고 읽고 쓸 수 있다.

만약 값을 수정하고 싶다면 아래와 같이 작성하면 된다.

```javascript
article.dataset.columns = 5
```

### CSS 접근

data attributes는 HTML이기 때문에 CSS에서도 접근 할 수 있다.

atricle의 상위 데이터를 표시하려면 attr()을 이용해 아래와 같이 사용한다.

```css
article::before {
  content: attr(data-parent);
}
```

또 CSS의 속성 셀렉터를 사용할 수도 있다.

```css
article[data-columns='3'] {
  width: 400px;
}
article[data-columns='4'] {
  width: 600px;
}
```

### 주의점

볼 수 있어야하고 접근 가능해야 하는 데이터는 data attributes에 저장하면 안된다.

그리고 검색 엔진은 data attributes의 값을 인덱싱 하지 못할 수도 있다.

출처

[https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use\_data\_attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
