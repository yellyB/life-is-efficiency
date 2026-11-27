---
title: "[JavaScript] 비밀번호 유효성 검사 정규식(숫자, 영문, 특수문자 체크)"
created: '2021-10-14'
---

```javascript
 //숫자,영문,특수문자 3개 이상 사용했는지 체크
  const pwdValidationChk = (password: string) => {
    const regPwd = /^.*(?=.*\d)(?=.*\W)(?=.*[a-zA-Z])/;
    if (!regPwd.test(password)) {
      return false;  //3개이상 사용x
    } else {
      return true;  //3개이상 사용함
    }
  };
```

password를 받아서 숫자, 영문, 특수문자를 3종류 이상 사용했는지 체크한다.
(?=.\*\\d)는 숫자, (?=.\*\\W)는 특수문자, (?=.\*\[a-zA-Z\])는 영문을 체크한다.
만약 특수문자 체크가 필요 없다면 특수문자 체크 부분을 빼고

const regPwd = /^.\*(?=.\*\\d)(?=.\*\[a-zA-Z\])/;
로 체크하면 된다.
