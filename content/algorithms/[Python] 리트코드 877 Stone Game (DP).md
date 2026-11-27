---
title: "[Python] 리트코드 877 : Stone Game (DP)"
created: '2021-06-16'
---

[https://leetcode.com/problems/stone-game/submissions/](https://leetcode.com/problems/stone-game/submissions/)

[Stone Game - LeetCode](https://leetcode.com/problems/stone-game/submissions/)

짝수개의 돌무더기가 있을 때 Alex와 Lee가 한 무더기씩 번갈아가면서 가져갈 것이다.

양쪽 끝에 있는 돌무더기만 가져갈 수 있을 때 Alex가 이길 수 있으면 True를 반환한다.

piles의 첫 번째를 piles\[i\]라고 하고 끝을 piles\[j\]라고 할 때 piles\[i, i+1, i+2, ..., j\]로 표현할 수 있다.

양 끝만 선택할 수 있으니까 piles\[i\]와 piles\[j\]중 Alex가 piles\[i\]를 골랐다고 가정한다면 Lee가 고를 수 있는 선택지는 piles\[i+1\], piles\[j\]이다.

그럼 번갈아가며 Alex와 Lee에게 선택할 수 있는 새로운 i와 j를 전달해주어 첫 무더기를 선택한 경우와 끝 무더기를 선택한 경우를 비교하면 된다.

1\. dp함수 하나로 처리

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        result = {}
        def dp(i, j):
            if i > j:
                return 0
            if (i, j) in result:
                return result[(i, j)]
            if (i + j) % 2 == 1:  # 선택가능한 piles의 첫+끝 index를 더한게 홀수면 Alex차례
                result[(i, j)] = max(piles[i] + dp(i+1, j), piles[j] + dp(i, j-1))
                return result[(i, j)]
            else:  #Lee차례
                result[(i, j)] = max(-piles[i] + dp(i+1, j), -piles[j] + dp(i, j-1))
                return result[(i, j)]
        return dp(0, len(piles)-1) > 0  #Alex점수는 +하고 Lee점수는 -해서 반환한 가장 큰 점수가 0보다 크면 알렉스 이김
```

piles는 항상 짝수개의 돌무더기를 가지고 있으니 i와 j를 이용해서 누구의 차례인지 구할 수 있다.

i가 j보다 크다면 더 이상 남아있는 돌무더기가 없다는 뜻이니 0을 리턴하여 종료한다.

Alex의 선택에서 Lee의 선택을 빼주고 최종 결과가 0보다 크면 Alex의 점수가 더 높다는 뜻이니 알렉스가 이긴다면 True를 반환한다.

piles의 length는 500까지 있을 수 있기 때문에 i와 j값이 들어왔을 때의 결과를 딕셔너리 result에 저장한다.

2\. Alex와 Lee의 차례를 구분하여 함수 생성

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        tempResult = {}
        def dpAlexTurn(i, j):
            # i>j인 경우는 Alex의 차례에만 발생함
            if i > j:
                return 0
            if (i, j) in tempResult:
                return tempResult[(i, j)]
            # Alex의 선택 + Lee가 선택하고 남은 것 중 Alex의 선택
            tempResult[(i, j)] = max(piles[i] + dpLeeTurn(i + 1, j), piles[j] + dpLeeTurn(i, j - 1))
            return tempResult[(i, j)]

        def dpLeeTurn(i, j):
            if (i, j) in tempResult:
                return tempResult[(i, j)]
            tempResult[(i, j)] = min(dpAlexTurn(i + 1, j), dpAlexTurn(i, j - 1))
            return tempResult[(i, j)]

        alex = dpAlexTurn(0, len(piles) - 1)
        lee = sum(piles) - alex
        return alex > lee
```

첫 번째 방법과 로직은 비슷하지만 이번에는 Alex의 선택 값을 따로 저장한다.

dpAlexTurn에서 dpLeeTurn을 호출해 Lee가 선택하고 난 뒤의 piles를 반환한다.

그리고 이번 턴에서 선택한 값 + Lee가 선택하고 남은 piles 중 선택한 값을 alex에 저장하고 마지막에 두 사람의 점수를 비교하면 된다.

방법 1은 코드가 깔끔하다는 장점이 있고 방법 2는 모르는 사람이 봤을 때 읽기가 더 쉽다는 장점이 있다.
