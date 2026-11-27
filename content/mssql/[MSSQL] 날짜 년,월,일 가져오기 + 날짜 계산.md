---
title: "[MSSQL] 날짜 년,월,일 가져오기 + 날짜 계산"
created: '2021-10-26'
---

년, 월, 일 가져오기

```sql
SELECT year(getdate())	--년도 2021
SELECT month(getdate())	-- 월 10
SELECT day(getdate())	--일 26
```

날짜 계산

```sql
SELECT DATEADD(ss, 1, getDate())	--1초 뒤

SELECT DATEADD(mi, 1, getDate())	--1분 뒤

SELECT DATEADD(hh, 1, getDate())	--1시간 뒤

SELECT DATEADD(dd, 1, getDate())	--1일 뒤

SELECT DATEADD(mm, 1, getDate())	--1달 뒤

SELECT DATEADD(yy, 1, getDate())	--1년 뒤

--이전의 시간을 가져오고 싶다면 마이너스를 써줌
SELECT DATEADD(dd, -1, getDate())	--1일 전
```
