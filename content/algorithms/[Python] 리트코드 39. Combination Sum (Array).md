---
title: "[Python] 리트코드 39. Combination Sum (Array)"
date: '2021-07-12'
---

[https://leetcode.com/problems/combination-sum/](https://leetcode.com/problems/combination-sum/)

[Combination Sum - LeetCode](https://leetcode.com/problems/combination-sum/)

\==문제==

candidates로 후보 숫자들이 주어지고 target 숫자가 주어진다.

candidates에서 target숫자를 만들 수 있는 조합을 구하는 문제이다.

\==설명==

후보 숫자를 선택하면 만들어야 하는 목표 숫자에서 그 수를 빼준다.

남은 숫자가 0보다 크다면 아직 타깃에 도달하지 못한 것이니 함수를 계속 반복하면 된다.

남은 숫자가 0이라면 지금까지 선택한 숫자로 타깃 숫자를 만들 수 있다는 뜻이니 answer에 저장한다.

이렇게만 하면 중복된 답이 출력되기 때문에 answer에 추가하기 전에 그 값이 이미 answer에 저장된 값인지 확인한다.

이제까지 선택한 숫자 리스트를 정렬한 후 answer에 없다면 추가한다.

\==코드==

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        answer = []
        def dp(nums, target):  # nums:지금까지 선택한 숫자, target:이 전의 restNum
            for n in candidates:
                temp = nums[:]
                rest = target - n
                if rest > 0:
                    temp.append(n)
                    dp(temp, rest)
                elif rest == 0:
                    temp.append(n)
                    temp.sort()
                    if temp not in answer:  # 중복 제거를 위해 정렬해서 그게 이미 없는지?
                        answer.append(temp)

        dp([], target)

        return answer
```
