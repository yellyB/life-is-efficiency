---
title: "[MSSQL] where절에 if문 같은 조건 사용하기"
date: '2021-05-21'
---

프로시저에서 데이터 조회 쿼리를 짤 때 where절에서 파라미터 값에 따라 다른 조건을 넣어줘야 하는 경우가 생겼다.

sql실행문을 string변수에 담아 실행하는 방법도 있지만 이미 짜 놓은 쿼리가 있어서 전부 string형으로 변경하려면 시간이 꽤 소요될 것 같았다.

```sql
create table #temp_table ( fruit varchar(10), quantity int )

insert into #temp_table values('apple',2)
insert into #temp_table values('pear',0)
insert into #temp_table values('banana',3)
insert into #temp_table values('strawberry',0)
insert into #temp_table values('melon',1)
```

> fruit         quantity
> \----------   -----------
> apple         2
> pear           0
> banana      3
> strawberry 0
> melon        1

위와 같은 임시 테이블을 만들었다.

여기에서 quantity가 0이면 전체 데이터를 조회하고 1 이상일 경우엔 입력된 quantity값을 조건으로 설정해서 조회할 것이다.

간단하게 if문으로 표현하자면 이렇다.

if (@pQuantity == 0) &amp;#123;

    select \* from #temp\_table

&amp;#125; else if(@pQuantity \> 0) &amp;#123;

    select \* from #temp\_table where @param = quantity

&amp;#125;

이걸 sql문으로는 아래처럼 짜면 된다.

```sql
declare @pQuantity int = 0

select * from #temp_table
where 1=1
    and((@pQuantity > 0 and @pQuantity = quantity)or --@pQuantity에 해당하는 값만
        (@pQuantity = 0 and quantity >= 0)) --전체
```

정확히는 if문처럼 조건에 따라서 where절이 다르게 세팅되는 것이 아니라 조건을 추가해서 비교하는 것이다.

조건을 따로 써주지 않은 경우는 조회되지 않아서 if문에서의 else처럼 아무것도 해당하지 않는 경우를 조회하지 못한다.

그것만 유의한다면 간단하게 조건을 줄 때 사용하기 좋을 것 같다.
