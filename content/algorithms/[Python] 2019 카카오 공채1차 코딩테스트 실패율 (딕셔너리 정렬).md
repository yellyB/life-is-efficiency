---
title: "[Python] 2019 카카오 공채1차 코딩테스트 : 실패율 (딕셔너리 정렬)"
created: '2021-04-29'
---

[programmers.co.kr/learn/courses/30/lessons/42889?language=python3](https://programmers.co.kr/learn/courses/30/lessons/42889?language=python3)

[코딩테스트 연습 - 실패율](https://programmers.co.kr/learn/courses/30/lessons/42889?language=python3)

\==풀이==

-   총 유저 수 구함(=스테이지 1에 도전한 유저 수)
-   반복문을 돌며 각 스테이지에 머물러있는 유저 수 구함
-   총 유저 수 - 현재 스테이지에 머무른 유저 수  = 다음 스테이지에 도전한 유저 수
-   실패율이 저장된 딕셔너리를 정렬하여 답 리턴

스테이지에 도전 한 유저 수를 계산하기 위해 총 유저 수를 구해준다.
맨 처음 스테이지에 도전한 유저수는 총 유저수랑 동일할 것이다.
그리고 그다음 스테이지에 도전한 유저수는 총 유저수에서 처음 스테이지에서 통과하지 못한 유저 수를 빼주면 된다.

스테이지 개수 N만큼(1~N)만큼 for문을 돌린다.
count()로 해당 스테이지에 머물러있는 유저 수를 구한다.
머물러있다는 건 해당 스테이지를 통과 못했다는 뜻이니 실패 수에 저장해준다.

스테이지에 도전 한 유저 수를 이용해 실패율을 구하고 딕셔너리에 저장한다.
그리고 다음 스테이지에 도전한 유저 수를 새로 업데이트해준다.
마지막에 정렬로 답을 리턴하면 끝이다.

\==코드==

```python
def solution(N, stages):
    answer = []
    failRateDict = {}  # 스테이지:실패율
    users = len(stages)  # 총 유저 수

    for i in range(1, N+1):
        failCnt = stages.count(i)  # 실패수
        failRate = 0  # 실패율

        if failCnt != 0:  # 실패 수가 0이면 어차피 실패율도 0이라 계산 안함
            failRate = failCnt/users

        failRateDict[i] = failRate
        users -= failCnt  # 해당 스테이지에 머물러있는 사람은 다음 스테이지의 도전자수에서 빼줌
    answer = sorted(failRateDict, key=lambda x: failRateDict[x], reverse=True)  # 내림차순 정렬
    return answer
```

\* 딕셔너리 정렬 방법 :

```python
dict = {0: 'chicken', 1: 'apple', 2: 'bear', 3: 'fire'}
a = sorted(dict.items(), key=lambda x: x[1], reverse=False)
b = sorted(dict, key=lambda x: dict[x], reverse=False)
print(a) #[(1, 'apple'), (2, 'bear'), (0, 'chicken'), (3, 'fire')]
print(b) #[1, 2, 0, 3]
```

reverse=True로 바꾸면 내림차순 정렬이 된다.
