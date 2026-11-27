---
title: "[Python] 프로그래머스 문제 : 전화번호 목록"
created: '2021-05-15'
---

NCPC(Nordic Collegiate Programming Contest)문제

[programmers.co.kr/learn/courses/30/lessons/42577](https://programmers.co.kr/learn/courses/30/lessons/42577)

[코딩테스트 연습 - 전화번호 목록](https://programmers.co.kr/learn/courses/30/lessons/42577)

리스트의 요소 중 한 가지가 다른 리스트들 요소의 접두어인 경우가 있다면 false를 반환하는 해시 알고리즘 문제이다.

처음에는 이중 반복문을 사용해서 리스트의 \[i+1\]을 \[i\]의 길이만큼 슬라이싱 해서 두 가지가 동일하다면 접두어로 판단하여 false를 리턴하는 방식을 사용했다.

```python
def solution(phone_book):
    answer = True
    phone_book.sort()
    for i in range(0,len(phone_book)):
        length = len(phone_book[i])
        for j in range(i+1,len(phone_book)):
            if len(phone_book[i])<len(phone_book[j]):
                if phone_book[i] == phone_book[j][:length]:
                    return False
    return answer
```

하지만 이중 반복문을 사용하기도 하고 슬라이싱을 사용해서인지 효율성 테스트를 통과하지 못해서 코드를 수정했다.

반복문을 하나만 사용하려면 \[i\] 번째 이전 요소들은 검사하지 않고 그 이후로만 검사해야 한다.

그래서 먼저 리스트를 정렬하였다.

그리고 리스트 len-1만큼 반복문을 실행하고 find()를 사용해 \[i+1\] 요소에 \[i\]의 위치가 0이라면 접두어로 판단하여 false를 리턴하였다.

```python
def solution(phone_book):
    answer = True
    phone_book.sort()
    for i in range(0,len(phone_book)-1):
        if phone_book[i+1].find(phone_book[i]) == 0:
            return False
    return answer
```
