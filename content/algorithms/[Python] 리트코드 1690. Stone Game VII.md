---
title: "[Python] 리트코드 1690. Stone Game VII"
date: '2021-10-18'
---

[https://leetcode.com/problems/stone-game-vii/](https://leetcode.com/problems/stone-game-vii/)

[Stone Game VII - LeetCode](https://leetcode.com/problems/stone-game-vii/)

Alice와 Bob이 게임을 한다.
번갈아가며 첫 번째 혹은 마지막 돌무더기를 제거해서 남은 돌무더기 합계를 해당 턴의 점수로 가져간다.
stones = \[5,3,1,4,2\]라면 Alice가 제일 오른쪽 2를 제거하고 5 + 3 + 1 + 4 = 13를 얻는다.
그다음 Bob은 stones = \[5,3,1,4\] 중에서 제일 왼쪽 5를 제거해서 3 + 1 + 4 = 8을 얻는다.
이런 식으로 돌무더기가 없어질 때까지 반복해서 최종 점수를 계산한다.
Alice의 점수에서 Bob점수를 뺀 값을 구한다.

\==설명==

처음엔 Alice와 Bob의 차례를 구분해서 dp함수를 작성했다.
답은 맞았지만 한 번 계산한 값이 저장이 안 되어서 타임아웃 에러가 떴다.

그래서 한 번 계산한 값을 다시 계산하지 않기 위해 함수를 하나로 합치고 메모이제이션을 했다.
이렇게 하니 타임아웃 없이 답이 나왔다.

처음에 stones의 합계를 구하고 dp함수를 실행한다.
이 함수는 이 전 턴에서 얻은 합계, i, j를 전달받는다.
i가 j보다 크거나 같아졌다면 남은 돌무더기가 없다는 뜻이니 함수를 종료한다.
이중 배열에 이미 계산된 값이 있다면 그 값을 리턴한다.
앞의 두 경우에서 함수가 종료되지 않았다면 돌무더기를 제거해서 점수를 얻어야 한다.
선택할 수 있는 경우는 첫 번째 돌을 선택하는 것과 마지막 돌을 선택하는 것 두 가지이다.
첫 번째 돌을 선택한 경우의 점수는 함수로 전달받은 합계에서 첫 번째 돌을 빼는 것이고 마지막 돌도 마찬가지이다.
돌을 선택했다면 상대방의 차례가 된다.
상대방은 나와 마찬가지로 점수를 최대로 얻고 싶을 테니 max함수를 사용해 상대방이 최적의 선택을 했을 경우를 구한다.
결과를 얻는 대로 이중 배열에 메모이제이션을 하고 최종 답을 구한다.

\==코드==

```python
class Solution:
    def stoneGameVII(self, stones: List[int]) -> int:
        score = [[-1] * len(stones) for i in range(len(stones))]
        def dp(sums, i, j):
            if i >= j:
                return 0
            if score[i][j] != -1:
                return score[i][j]
            sumsF = sums - stones[i]  # 첫번째 선택했을때 점수
            sumsL = sums - stones[j]  # 마지막 선택했을때 점수
            result = max(sumsF-dp(sumsF, i+1, j), sumsL-dp(sumsL, i, j-1))
            score[i][j] = result
            return result

        sums = sum(stones)
        return dp(sums, 0, len(stones)-1)
```

\*Alice와 Bob의 턴을 분리

```python
class Solution:
    def stoneGameVII(self, stones: List[int]) -> int:
        def aliceTurn(sums, i, j, diff):
            if i >= j:
                return diff
            sumsF = sums - stones[i]  # 첫번째 선택했을때 점수
            sumsL = sums - stones[j]
            diffF = diff + sumsF
            diffL = diff + sumsL
            result = max(bobTurn(sumsF, i+1, j, diffF ), bobTurn(sumsL, i, j-1, diffL ))
            return result

        def bobTurn(sums, i, j, diff):
            if i >= j:
                return diff
            sumsF = sums - stones[i]
            sumsL = sums - stones[j]
            diffF = diff - sumsF
            diffL = diff - sumsL
            result = min(aliceTurn(sumsF, i+1, j, diffF), aliceTurn(sumsL, i, j-1, diffL))
            return result

        sums = sum(stones)
        return aliceTurn(sums, 0, len(stones)-1, 0)
```
