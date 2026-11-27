---
title: "[Python] 리트코드 1014. Best Sightseeing Pair"
created: '2021-10-26'
---

[https://leetcode.com/problems/best-sightseeing-pair/](https://leetcode.com/problems/best-sightseeing-pair/)

[Best Sightseeing Pair - LeetCode](https://leetcode.com/problems/best-sightseeing-pair/)

values\[i\] + values\[j\] + i - j 를 계산했을 때 최댓값을 구하는 문제이다.

values\[i\] + values\[j\] + i - j 값이 최대가 되려면 values\[i\] + i는 최대가 되어야 하고 values\[j\] - j도 최대가 되어야 한다.

values의 임의의 위치를 i라고 할 때 values\[ : i+1\]중 values\[i\] + i (=vali 라고 하겠음) 값이 이 subarray에서 최대 값이라면 이 이후인 values\[i+1 : \]에서 values\[j\] - j (=valj)의 최댓값을 구해야 한다. (i &lt; j이기 때문)

그렇다면 vali의 값을 계속 갱신하더라도 최종 값에는 반영하지 않고 있다가 valj가 갱신되는 순간에만 그때의 최고값인 vali를 이용해 최종 계산 값을 갱신한다.

이렇게 하면 vali는 j번째 전 요소들의 값에서 max값을 구한 것이 된다.

▶ values\[i\] + values\[j\] + i - j 의 max값

= \[ values\[i\]+i의 max \]  +  \[ values\[j\]-j의 max \]

▶ max(\[i\]+i)값이 계산된 이후의 리스트에서 max(\[j\]-j)를 계산해야 함
       => \[j\]-j가 갱신될 때에만 \[i\]+i와의 계산 값을 갱신해주자
            \* 그래야 \[i\]+i가 이 턴 전에서의 최대 값일 테니까

```python
class Solution:
    def maxScoreSightseeingPair(self, values: List[int]) -> int:
        vali = values[0]
        valj = values[1] - 1
        answer = vali + valj
        for i in range(1, len(values)):
            val = values[i]
            tempValj = val-i  # [j]-j값이 갱신될 때에만 answer를 갱신함
            temp = vali + tempValj
            if temp >= answer:
                answer,valj = temp, tempValj
            vali = max(vali, val+i)
        return answer
```
