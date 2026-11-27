---
title: "[JavaScript] 자바스크립트 Promise.all() 메서드 활용하기"
created: '2022-01-28'
---

node.js 서버에서 데이터를 등록하는 API를 만드는데 이 API는 총 5개의 동작이 반드시 순서를 지켜서 실행되어야 한다.

처음에는 함수 내부에 promise객체를 만들어서 리턴하고 그 함수를 .then()으로 연결하였다.

1\. 함수에서 프로미스 객체 리턴 X 5

```javascript
const insertProfit = async cateJson => {
  const query = `insert into [table]
                ([col1], [col2], [col3], [col4]) values
                ('${month}', ${id}, ${aim}, ${rate}) `;
  let res: any;
  const promise = new Promise((resolve, reject) => {
    resolve(
      excuteQuery(query, next).then(result => {
        if (result) {
          return 'success';
        }
      }),
    ),
      reject(() => {
        return 'error';
      });
  });
  return promise;
};
```

2\. 체이닝으로 순서대로 처리

```javascript
insertProfit(params.category)
    .then(async result => {
        res.status(200).send(result);
    })
    .then(async result => {
      res.status(200).send(result);
      await baseData();
    })
    .then(async result => {
      res.status(200).send(result);
      await setDayAim(params.date);
    })
    .then(async result => {
      res.status(200).send(result);
      await setDayCateAim(params.category, params.date);
    })
    .then(async result => {
      res.status(200).send(result);
    });
```

순서를 지키는 것뿐 아니라 각 단계에서 error가 하나라도 있을 경우 다음 단계로 넘어가지 않고 중단시켜야 했다.

이렇게 작성하니 코드의 가독성도 떨어지고 각각의 경우에 결과에 따라 처리를 해주려니 너무 복잡해지는 문제가 있었다.

그래서 Promise.all() 메서드를 사용하기로 결정했다.

먼저 함수 안에서 프로미스 객체를 리턴했던 방식에서 함수는 빼고 프로미스 객체를 생성하는 방식으로 변경했다.

그리고 그 프로미스 객체를 Promise.all()로 5개의 프로미스를 실행한다.

Promise.all()은 프로미스 중 하나라도 거부당하면 즉시 Promise.all()이 거부되기 때문에 내가 만들려는 API의 기능과 맞아떨어진다.

그래서 아래와 같이 작성했다.

1, 프로미스 생성 X 5

```javascript
const setProfit = new Promise((resolve, reject) => {
  const query = `insert into [table]
                ([col1], [col2], [col3], [col4]) values
                ('${month}', ${id}, ${aim}, ${rate}) `;
  resolve(
    excuteQuery(query, next).then(result => {
      if (result) {
        return 'success';
      }
    }),
  ),
    reject(() => {
      return 'error';
    });
});
```

2\. Promise.all()로 5개의 프로미스 실행

```javascript
  Promise.all([setProfit, setCategoryAim, baseData, setDayAim, setDayCateAim]).then(result => {
    console.log(result); // [ 'success', 'success', 'success', 'error', 'success' ]
    res.status(200).send(result);
  });
```

위와 같이 Promise.all()은 각 프로미스를 실행하고 그 결과를 배열에 담아 돌려준다.

그럼 결과에 따라 원하는 처리를 해주면 된다.
