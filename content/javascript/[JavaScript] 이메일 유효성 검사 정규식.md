---
title: "[JavaScript] 이메일 유효성 검사 정규식"
created: '2021-10-14'
---

```javascript
  static CheckEmail(email: string) {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[a-zA-Z]([-_.]?[a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regExp.test(email)) {
      return true; //형식에 맞음
    } else {
      return false;
    }
  }
```

이메일 유효성 검사하는 정규식

유효성 규칙 : \[알파벳(특수문자 불가, 언더바나 슬래쉬는 마지막에 쓸 수 없음)\] + \[@\] + \[알파벳\] + \[.\] + \[알파벳 2자리 이상\]

ex)

bomoto@gmail.com             true

bo\*oto@gmail.com              false

bomo\_to@gmail.com           true

bomoto\_@gmail.com           false

bomotogmail.com                false

bomoto@gmail                     false

```javascript
  static CheckEmail(email: string) {
    const regExp = /^.*@[a-zA-Z]([-_.]?[a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regExp.test(email)) {
      return true; //형식에 맞음
    } else {
      return false;
    }
  }
```

이메일 유효성 검사하는 정규식

유효성 규칙 : \[모든 문자\] + \[@\] + \[알파벳\] + \[.\] + \[알파벳 2자리 이상\]

ex)

bomoto@gmail.com             true

bo\*oto@gmail.com              true

bomo\_to@gmail.com           true

bomoto\_@gmail.com           true

bomotogmail.com                false

bomoto@gmail                     false
