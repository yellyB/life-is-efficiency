---
title: "[JavaScript] n일 전 or n달 전 날짜 구하기 : moment.js와 moment TimeZone"
date: '2021-04-05'
---

![](./1.png)

moment.js는 날짜 형식을 바꿀 때나 날짜 간 계산을 해야 할 때 등등 사용하면 편한 자바스크립트 라이브러리이다.

나는 타입 스크립트 기반인 리액트 프로젝트에서 사용했다.

먼저 npm에서 moment.js를 설치해준다.

> npm install moment

그다음 작성하려는 타입 스크립트 파일에 import 해주고 한국어 설정도 해준다.

```javascript
import moment from 'moment';
moment.locale('ko');
```

이렇게 해주면 moment.js를 사용할 수 있다.

나는 보통 날짜 형식을 지정할 때 많이 사용했다.

```javascript
moment().format('YYYYMMDD')
moment().format('YYYY-MM-DD')
moment().format('YYYY/MM/DD')
```

혹은 3개월 후의 날짜, 날짜 사이 일 수 계산에도 사용하였다.

```python
moment().add(-3, 'M') //현재날짜 +3개월
moment().subtract(1, 'days') //하루 전 날짜
moment().subtract(3, 'month').format('YYYYMMDD') //현재날짜 -3개월을 지정된 형식으로
moment("20210402", "YYYYMMDD").fromNow(); //현재로부터 얼만큼 과거인지
```

이것 말고도 더 많은 사용법이 있다.

하단에 링크 해 둔 moment.js페이지에 예제들이 잘 나와있지만 귀찮은 사람들을 위해 여기에 올려놓겠다.

```javascript
//Format Dates
moment().format('MMMM Do YYYY, h:mm:ss a'); // April 5th 2021, 4:03:34 pm
moment().format('dddd');                    // Monday
moment().format("MMM Do YY");               // Apr 5th 21
moment().format('YYYY [escaped] YYYY');     // 2021 escaped 2021
moment().format();                          // 2021-04-05T16:03:34+09:00

//Relative Time
moment("20111031", "YYYYMMDD").fromNow(); // 9 years ago
moment("20120620", "YYYYMMDD").fromNow(); // 9 years ago
moment().startOf('day').fromNow();        // 16 hours ago
moment().endOf('day').fromNow();          // in 8 hours
moment().startOf('hour').fromNow();       // 4 minutes ago

//Calendar Time
moment().subtract(10, 'days').calendar(); // 03/26/2021
moment().subtract(6, 'days').calendar();  // Last Tuesday at 4:03 PM
moment().subtract(3, 'days').calendar();  // Last Friday at 4:03 PM
moment().subtract(1, 'days').calendar();  // Yesterday at 4:03 PM
moment().calendar();                      // Today at 4:03 PM
moment().add(1, 'days').calendar();       // Tomorrow at 4:03 PM
moment().add(3, 'days').calendar();       // Thursday at 4:03 PM
moment().add(10, 'days').calendar();      // 04/15/2021

//Multiple Locale Support
moment.locale();         // en
moment().format('LT');   // 4:04 PM
moment().format('LTS');  // 4:04:04 PM
moment().format('L');    // 04/05/2021
moment().format('l');    // 4/5/2021
moment().format('LL');   // April 5, 2021
moment().format('ll');   // Apr 5, 2021
moment().format('LLL');  // April 5, 2021 4:04 PM
moment().format('lll');  // Apr 5, 2021 4:04 PM
moment().format('LLLL'); // Monday, April 5, 2021 4:04 PM
moment().format('llll'); // Mon, Apr 5, 2021 4:04 PM
```

하지만 하다 보니 어떤 문제가 발생했는데,

날짜 형식을 변형시킨 게 DB에서 불러온 시간인 경우 실제 DB에 저장되어있는 시간과 달랐다.
DB에서 getDate()로 저장한 데이터를 프런트에서 2021-04-05T20:56:57.897Z 형식으로 가져오는데 이 데이터를 원하는 형식으로 나타내려고 하면 9시간이 빨랐다.(2021년 4월 5일 00시(DB) -> 2021년 4월 5일 09시 같은 식이었다.)

구글링 해보니 타임존 설정이 달라서 그렇다고 한다.

다행히 moment.js로 타임존 설정도 가능하다.

npm으로 moment-timezone을 설치해준다.

> npm install moment-timezone

그리고 import 해준다.

```javascript
import moment from 'moment-timezone';
```

DB 저장 시간보다 9시간 빠르게 가져오는 것이기 때문에 타임존을 9시간 느린 곳으로 설정해주었다.

```javascript
moment().tz('Atlantic/Azores').format('YYYY/MM/DD a hh:mm');
```

타임존을 대한민국보다 9시간 느린 Atlantic/Azores로 설정해주니 DB에 저장된 시간과 일치하는 시간이 나온다.

moment.js :

[https://momentjs.com/](https://momentjs.com/)

[Moment.js | Home](https://momentjs.com/)

moment.js 타입 스크립트 :

[momentjscom.readthedocs.io/en/latest/moment/00-use-it/09-typescript/](https://momentjscom.readthedocs.io/en/latest/moment/00-use-it/09-typescript/)

[Typescript - momentjs.com](https://momentjscom.readthedocs.io/en/latest/moment/00-use-it/09-typescript/)

타임존 :

[momentjs.com/timezone/](https://momentjs.com/timezone/)

[Moment Timezone | Home](https://momentjs.com/timezone/)
