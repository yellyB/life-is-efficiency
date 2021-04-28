---
title: "[Python] 프로그래머스 시저암호"
date: '2021-04-28'
---

[programmers.co.kr/learn/courses/30/lessons/12926](https://programmers.co.kr/learn/courses/30/lessons/12926)

[코딩테스트 연습 - 시저 암호](https://programmers.co.kr/learn/courses/30/lessons/12926)

카이사르 암호라고도 불리는 시저 암호 프로그램을 짜면 된다.

문자열과 정수 n을 입력받아서 n만큼 이동한 알파벳을 반환한다.
아스키코드로 변환하는 내장 함수만 알고 있으면 아주 쉽게 풀 수 있다.

```python
def solution(s, n):
    answer = ''
    for i in s:
        asc = ord(i)
        if i != ' ':
            if asc <= 90:
                if asc + n > 90:
                    asc = asc - 26
            else:
                if asc + n > 122:
                    asc = asc - 26
            asc = asc + n
        answer = answer + chr(asc)

    return answer

s = 'a B z'
n = 4

print(solution(s, n))
```

문자열이 공백인 경우는 제외하고 입력받은 문자열에 n만큼 더해서 새 문자열을 반환하면 끝!
