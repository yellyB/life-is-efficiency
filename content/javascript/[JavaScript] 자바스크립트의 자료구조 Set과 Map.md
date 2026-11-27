---
title: "[JavaScript] 자바스크립트의 자료구조 Set과 Map"
created: '2022-06-02'
---

### Set

중복되지 않는 유일한 값들의 집합이다.

배열과 비교했을 때 다음과 같은 차이점이 있다.

-   중복된 값을 가지지 않음
-   요소 순서에 의미가 없음
-   인덱스로 요소에 접근 불가

Set의 이런 특성을 이용해 배열에서 중복을 제거하고 싶을 때 유용하게 사용할 수 있다.

```javascript
const set = new Set();  // 빈 set 객체 생성

const set = new Set([1,2,3]);  // 중복 제거된 {1,2,3} 생성
```

```javascript
console.log(set.size);  // 요소 개수

set.add(1);  // 요소 추가

console.log(set.has(1));  // 요소 존재 확인

set.delete(1);  // 요소 삭제

set.clear();  // 요소 전부 삭제
```

Map

키-값으로 이루어진 컬렉션이다.

객체와 비교했을 때 다음과 같은 차이점이 있다.

-   키로 문자 또는 심벌을 사용할 수 있는 객체와는 달리 map은 키로 객체를 포함한 모든 값 사용 가능
-   이터러블임
-   요소 개수 확인 시 length가 아닌 size

아래처럼 map을 생성할 수 있다.

```javascript
const map = new Map();  // 빈 map 생성

const map = new Map([['k1', 'v1'], ['k2', 'v2']]);  // {"k1" => "v1", "k2" => "v2"}
```

Map 생성자 함수로 전달하는 인수는 키-값 쌍으로 이루어져 있어야 하며 그렇지 않은 경우는 에러가 난다.

```javascript
console.log(map.size);  // 요소 개수

map.set('key', 'value');  // 요소 추가

console.log(map.get(key));  // 요소 읽기

console.log(map.has(key));  // 요소 존재 확인

map.delete(key);  // 요소 삭제

map.clear();  // 요소 전부 삭제
```
