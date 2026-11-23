---
title: "[MSSQL] 테이블 조작 명령어 : 컬럼 추가, 수정, 삭제"
date: '2021-05-15'
---

sql의 테이블을 조작하는 명령어 DDL 중에서 컬럼을 수정하는 쿼리이다.

자주 사용하는게 아니라 항상 헷갈려서 정리해둔다.

```sql
--컬럼 추가
ALTER TABLE [table_name] ADD [column_name] INT

--컬럼 타입 변경
ALTER TABLE [table_name] ALTER COLUMN [column_name] VARCHAR(20)

--컬럼 삭제
ALTER TABLE [table_name] DROP [column_name]
```
