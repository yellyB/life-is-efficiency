---
title: "[JavaScript] 스페이스바를 엔터로, 공백을 엔터로 바꾸는 정규식"
created: '2021-10-18'
---

공백을 엔터로 바꾸어서 한 줄로 되어있던 데이터를 여러 줄로 나타낼 것이다.

```javascript
const value = '123 456 789'

const removeSpace = value.replace(/\s/g, '\n'); //공백을 엔터로 바꿈
console.log(removeSpace);
//123
//456
//789
```

123 456 789 같이 공백으로 구분된 데이터를 정규식을 이용해 엔터로 바꿔주면 아래처럼 여러 줄로 나오게 된다.
123
456
789

이걸 응용해서 공백이 아니라 콤마로 구분되어 있는 데이터를 여러 줄로, 혹은 공백으로 구분되어 있는 데이터를 콤마로 바꿔줄 수도 있다.

```javascript
const comma = '123,456,789'

const removeComma = comma.replace(',', '\n'); //콤마를 엔터로 바꿈
console.log(removeComma);
//123
//456
//789

const space = '123 456 789'

const toComma = space.replace(/\s/g, ','); //공백을 콤마로 바꿈
console.log(toComma); //123,456,789
```
