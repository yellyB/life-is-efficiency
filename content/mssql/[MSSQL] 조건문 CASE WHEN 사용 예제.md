---
title: "[MSSQL] 조건문 CASE WHEN 사용 예제"
created: '2021-04-02'
---

유저 아이디, 티어, 플레이 시간이 다음과 같이 저장되어 있는 Temp\_user 테이블에서 case문을 이용해 데이터를 가져올 것이다.

&lt;Temp\_user 테이블>

userId   tear     play\_time
\-------- -------- -----------
player1  1        100
player2  2        1500
player3  3        350

player4  1        980
player5  2        90

player6  3        1900

유저의 티어 값에 따라 \[골드\]\[실버\]\[브론즈\]로 나타내는데

브론즈일 경우 플레이 시간이 1000시간 이상이라면 티어를 \[심해\]로 가져오자.

```sql
SELECT
	userId AS 아이디, play_time AS 플레이시간,
	CASE
		WHEN tear = '1' THEN '골드'
		WHEN tear = '2' THEN '실버'
		WHEN tear = '3' AND play_time > 1000 THEN '심해'
		ELSE '브론즈'
	END AS 티어
FROM Temp_user
```

&lt;결과>

아이디    플레이 시간  티어
\--------   -----------   ------
player1    100          골드
player2    1500        실버
player3    350         브론즈

player4    980         골드
player5    90           실버
player6    1900        심해

표시할 데이터가 다른 테이블에 저장되어 있어서 그 값대로 select 해야 하는 경우라면 조인을 이용하면 된다.

```sql
SELECT
	u.userId AS 아이디, u.play_time AS 플레이시간,
	CASE
		WHEN u.tear = '1' THEN t.tear_text
		WHEN u.tear = '2' THEN t.tear_text
		WHEN u.tear = '3' AND u.play_time > 1000 THEN '심해'
		ELSE t.tear_text
	END AS 티어
FROM Temp_user u
LEFT OUTER JOIN Temp_tear t ON u.tear = t.tear_val
```

&lt;Temp\_tear 테이블>

tear\_val  tear\_text
\--------  ---------
1          골드
2          실버
3          브론즈

티어 테이블에서 유저 테이블의 tear 값과 동일한 티어 정보를 가져온다.
결과는 동일하다.
