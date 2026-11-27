---
title: "[JavaScript] 숫자인지 문자인지 판단 정규식(+소수점 판단 정규식)"
created: '2021-10-14'
---

1\. 입력된 데이터가 숫자인지 문자인지 판단

```javascript
  static IsNumber = (value: any) => {
    const reg = /^[0-9\s]*$/;
    if (reg.test(value)) {
      return true;  //숫자
    } else {
      return false;  //문자
    }
  };
```

2\. 입력된 데이터가 숫자(소수점 포함)인지 문자인지 판단

```javascript
  static IsNumber = (value: any) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value)) {
      return true;  //숫자(소수점 포함)
    } else {
      return false;  //문자
    }
  };
```
