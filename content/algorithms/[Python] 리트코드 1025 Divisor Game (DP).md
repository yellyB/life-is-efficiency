---
title: "[Python] 리트코드 1025 : Divisor Game (DP)"
created: '2021-06-16'
---

[https://leetcode.com/problems/divisor-game/](https://leetcode.com/problems/divisor-game/)

[Divisor Game - LeetCode](https://leetcode.com/problems/divisor-game/)

Alice와 Bob이 게임을 할 건데 Alice가 이길 수 있다면 True를 반환한다.

\--규칙--

n이 주어졌을 때 n의 약수인 x를 고른다.

n-x를 한 숫자가 다음 턴의 새로운 n이 된다.

이 과정을 반복해서 더 이상 제시할 x가 없다면 패배

result 리스트를 만들어서 result\[1\]~result\[n\]까지 Alice가 이길 수 있다면 True를 저장할 것이다.

```python
class Solution:
    def divisorGame(self, n: int) -> bool:
        result = [False] #헷갈리지않게 리스트를 1~n까지 구성하려고 0번째는 아무데이터나 넣음
        result.append(False)  # n이 1이면 짐

        #i를 n으로 생각하고 j를 내면 이기는지 확인할거임
        for i in range(2, n+1):
            result.append(False) #n의 약수가 있는지? 있다면 그 수를 냈을때 내가 이길지? 모르기때문에 일단 false
            for j in range(i-1, 0, -1): #n의 약수 중 가장 큰 수를 냈을때에 이길 확률 높기때문에 큰 수부터 거꾸로
                if i % j == 0: #약수인지?
                    if result[i-j] == False: #n-x한 새로운 n이 다음사람을 지게 만드는지?
                        result[i] = True
                        break

        return result[n]
```

만약에 n=8이면 최종 result는 \[False, False, True, False, True, False, True, False, True\] 과 같다.
