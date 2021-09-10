---
title: "[Python] 리트코드 403. Frog Jump (Array, DP)"
date: '2021-09-10'
---

[https://leetcode.com/problems/frog-jump/](https://leetcode.com/problems/frog-jump/)

[Frog Jump - LeetCode](https://leetcode.com/problems/frog-jump/)

> 개구리가 강을 건너는데 그 강은 몇 개의 유닛으로 쪼개져 있다.
> 각 유닛엔 돌이 있을 수도 있고 없을 수도 있다.
>
> 오름차순 리스트인 stones가 주어질 때 개구리가 맨 끝까지 갈 수 있다면 true를 반환한다.
> 맨 처음에는 1칸을 뛸 수 있으며 개구리가 마지막에 k유닛을 점프했다면 다음에 점프할 수 있는 유닛의 간격은 k-1, k, k+1이다.

개구리가 n번째 돌 위에서 점프할 수 있는 다음 돌을 알기 위해선 현재 위치로 오기 전에 어떤 돌에 있었는지 알아야 한다.

그래야 현재 돌과 이전 돌의 차이를 알아내 k-1 ~ k+1 범위를 구할 수 있다.

그러면 여기서 알 수 있는 건 다음 돌의 위치를 알기 위해선 현재 돌과 과거의 돌 위치를 알고 있어야 한다는 것이다.

맨 처음에 1칸을 뛸 수 있다는 걸 알고 있으니 거기서부터 시작하자.

stones\[0\]에서 \[1\]로 한 칸 갈 수 있으니 그다음엔 0,1,2가 stones\[1\]에서 뛸 수 있는 간격들이다.

돌 번호로 얘기하자면 1,2,3번 돌로 갈 수 있단 뜻이다.

그 각각의 돌로 갔을 때 stones\[1\]에서 뛰었던걸 이용해 그다음에 뛸 수 있는 간격을 알 수 있다.

그렇다면 딕셔너리를 만들어서 어떤 돌에서 어떤 돌로 뛸 수 있는지를 저장하고 있으면 된다.

딕셔너리 canJumpIdxs를 만들어 키 값엔 stones에 있는 돌 번호들을, 밸류 값엔 빈 배열을 저장한다.

그리고 0번 돌에서 1번 돌로 갈 수 있단 뜻으로 \[0\]에 1을 저장한다.

먼저 for문을 이용해 stones리스트에서 stone을 하나씩 확인할것이다.

stone을 현재 개구리가 있는 돌 번호라고 가정하자.

for문 안에 다시 for문을 사용해 이번엔 canJumpIdxs 딕셔너리를 확인할 것이다.

현재 돌 번호가 키값인 데이터들을 하나씩 가져오자.

이 데이터는 현재 위치(nowIdx)에서 뛸 수 있는 다음 돌 번호(nextIdx)들을 기록한 것이다.

그럼 이제 이 둘을 이용해 개구리가 점프 한 간격을 구할 수 있다.

얼마큼 점프를 했는지 알고 있으니 nextIdx에서 다음 칸으로 뛸 때 gap-1 ~ gap+1까지 뛸 수 있단 걸 알 수 있다.

그럼 또 for문을 이용해 gap-1 ~ gap+1 범위만큼 실행한다.

이 값은 점프 가능한 간격이니 jump라고 하자.

nextIdx + jump의 값이 현재 위치에서 다음 돌로 뛰었을 때 다음 돌의 위치에서 점프할 수 있는 또 그 다음돌의 위치이다.

이 다음다음 돌을 canJumpIdx라고 했을 때 nextIdx에서 점프할 수 있는 돌이라는 의미로 nextIdx가 키값인 딕셔너리에 저장한다.

여기서 그냥 더해주는 것이 아니라 확인해야 할 것이 두 가지 있다.

첫 번째는 canJumpIdx가 이미 nextIdx에 저장되지 않았는지 두 번째는 물이 아닌 돌이어야 하니까 stones 리스트에 있는지 확인한다.

그리고 점프 가능 돌의 모든 목록이 저장되어 있는 canJumpIdxs를 그때그때 확인해서 그중 맨 마지막 돌이 밸류 값에 있다면 바로 true를 반환하면 된다.

정리해보자면 이렇다.

&amp;lt;초기 선언>

-   stones가 키 값인 딕셔너리를 만든다.
-   밸류 값은 초기값 \[ \]로 설정
-   이 딕셔너리에는 해당 위치에서 점프할 수 있는 돌들이 저장될 것임
-   dict\[0\]에는 1을 저장한다.

&amp;lt;1 for문>

-   stones 리스트 -> 반복
-   각 돌 stone은 현재 위치(nowIdx)라고 가정

&amp;lt;2 for문>

-   현재 위치를 키 값으로 하는 딕셔너리 밸류 -> 반복
-   밸류 = 현재 위치에서 뛸 수 있는 돌(nextIdx)
-   몇 칸 점프했는지(gap) 계산한다. (nextIdx - nowIdx)

&amp;lt;3 for문>

-   gap을 이용해 알아낸 범위(-1 ~ +1) -> 반복
-   이 반복문의 값이 nextIdx에서 뛸 수 있는 칸 수임(jump)
-   갈 수 있는 위치 canJumpIdx는 nextIdx+jump로 구할 수 있음
-   그럼 딕셔너리\[nextIdx\]에 갈 수 있는 위치를 저장
-   하지만 여기서 canJumpIdx는 물인지 돌인지 모름
-   그래서 그 위치가 stones에 있는지 확인한 후 저장
-   또 그 위치가 이미 저장되지 않았는지도 확인

&amp;lt;결과 체크>

-   제일 바깥 반복문을 돌 때 맨 마지막 돌(target)이 딕셔너리\[현재 위치\]에 있다면 즉시 True반환
-   True를 만나지 못했다면 마지막에 False를 반환

\==코드==

```python
class Solution:
    def canCross(self, stones: List[int]) -> bool:
        canJumpIdxs = {}  # n번째 돌에서 뛸 수 있는 인덱스들 저장
        target = stones[-1]

        if stones[1] != 1:
            return False

        for stone in stones:
            canJumpIdxs[stone] = []  # 일단 빈 값 넣어줌

        canJumpIdxs[0] = [1]  # 0에서 1갈때 1칸뛰는건 고정이니까

        for nowIdx in stones:  # 현재 돌 위치 = nowIdx
            if target in canJumpIdxs[nowIdx]:
                return True
            # ▽ 갈 수 있는 위치들 저장한것 차례로 꺼냄(거기로 갔다고 가정)
            for nextIdx in canJumpIdxs[nowIdx]:
                gap = nextIdx - nowIdx
                canJumpIdx = nextIdx + gap

                for jump in range(gap-1, (gap+1)+1):
                    canJumpIdx = nextIdx + jump  # 여기서 갈 수 있는 인덱스
                    if nextIdx == canJumpIdx:  # 자기 자신으로 점프는 걍 패쓰
                        continue
                    # 이미 저장되지 않았고 / 가려는 곳이 물이 아닌 돌 이면
                    if canJumpIdx not in canJumpIdxs[nextIdx] and canJumpIdx in stones:
                        canJumpIdxs[nextIdx].append(canJumpIdx)

        return False
```
