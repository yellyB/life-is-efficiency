---
title: "[MSSQL] 여러 행을 한 줄로 나타내는 방법"
created: '2021-08-02'
---

#temp 테이블

&lt;table style="border-collapse: collapse; width: 34.3023%; height: 187px;" border="1" data-ke-align="alignLeft" data-ke-style="style12">&lt;tbody>&lt;tr>&lt;td style="width: 33.3333%;">&nbsp;&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">name&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">clor&lt;/span>&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">apple&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">red&lt;/span>&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">banana&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">yellow&lt;/span>&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">peach&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">pink&lt;/span>&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">4&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">melon&lt;/span>&lt;/td>&lt;td style="width: 33.3333%;">&lt;span style="font-family: 'Nanum Gothic';">green&lt;/span>&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

1\. for xml path 사용

for xml path를 사용하면 결과가 xml태그로 나온다.

하지만 우린 xml태그는 필요 없기 때문에 3번째 줄처럼 select ','+name라고 써준다.

그러면 결과는 ,apple,banana,peach,melon 라고 나온다.

여기서 첫 번째 콤마는 필요 없기 때문에 이 콤마를 제거해준다.

substring이나 replace같은 방법도 있지만 STUFF를 사용해서 첫 번째 콤마만 제거해주었다.

```sql
SELECT
  STUFF((
    SELECT ',' + name
    FROM #temp
    WHERE 1=1
    FOR XML PATH('')
  ),1,1,'') AS fruits
```

&lt;table style="border-collapse: collapse; width: 35.7168%; height: 71px;" border="1" data-ke-align="alignLeft" data-ke-style="style12">&lt;tbody>&lt;tr style="height: 22px;">&lt;td style="width: 17.869%; height: 22px;">&nbsp;&lt;/td>&lt;td style="width: 101.075%; height: 22px;">&lt;span style="font-family: 'Nanum Gothic';">fruits&lt;/span>&lt;/td>&lt;/tr>&lt;tr style="height: 29px;">&lt;td style="width: 17.869%; height: 29px;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 101.075%; height: 29px;">&lt;span style="font-family: 'Nanum Gothic';">apple,banana,peach,melon&lt;/span>&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

2\. coalesce 사용

coalesce는 null값을 체크할 때 쓰는 함수인데 여러 행을 한 줄로 나타낼 때 쓸 수도 있다.

```sql
DECLARE @fruitsName VARCHAR(20)

SELECT @fruitsName = COALESCE(@fruitsName + ',' ,'')+name FROM #temp WHERE 1=1
SELECT @fruitsName AS fruits
```

이번엔 변수 @fruitsName 를 선언해 변수에 값을 담았다.

결과는 위와 같다.
