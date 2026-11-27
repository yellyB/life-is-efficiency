---
title: "[Python] 리트코드 1340. Jump Game V (Sorting, DP)"
created: '2021-08-08'
---

[https://leetcode.com/problems/jump-game-v/](https://leetcode.com/problems/jump-game-v/)

[Jump Game V - LeetCode](https://leetcode.com/problems/jump-game-v/)

\==문제==

막대기의 높이가 담긴 배열 arr과 한 번에 점프할 수 있는 막대기의 최대 숫자 d가 주어질 때, 가장 많이 건너뛸 수 있는 횟수를 구하는 문제이다.

\==접근방법==

arr요소의 인덱스를 차례로 dp함수로 보내서 각 막대기 별로 이동할 수 있는 최대 횟수를 구한다.

dp함수에서는 제일 먼저 idx가 딕셔너리에 저장되어있는지 확인한다.

저장이 안 되어 있다면 초기값 0을 저장하고 저장된 값이 있다면 그 값을 반환한다.

그다음으로 이동할 수 있는 범위를 for문을 돌려서 max함수를 이용해 이동할 수 있는 가장 큰 값을 구할 것이다.

처음에는 dp함수 안에서 1부터 d만큼 반복하는 for문 하나만 사용했었는데 이렇게 하니까 문제점이 두 가지 있었다.

하나는 한쪽이 막히더라도 반대쪽으로 점프해야 하는데 이 경우를 처리하다 보니 반복문 안에 if문이 추가로 들어가야 해서 코드가 복잡해진다.
또 하나는 만약 한 칸 왼쪽 막대기가 현재 막대기보다 더 높아서 점프할 수 없다면 더 왼쪽의 막대기로는 이동이 불가능하다.
그렇지만 오른쪽으로는 이동이 가능하다면 for문을 계속 돌아야 하는데 그때마다 이미 갈 수 없는 왼쪽 방향을 if문으로 체크해줘야 한다.
불필요한 코드가 실행되고 있기 때문에 이 두 가지 문제점을 고려해서 for문을 왼쪽과 오른쪽의 경우로 나누었다.

이동할 수 있는 범위는 (현재 위치-d) ~ (현재 위치+d)이며 여기서 현재 위치는 확인할 필요가 없으니 제외한다.

왼쪽으로 점프하는 for문과 오른쪽으로 점프하는 for문을 따로 실행해서 각 경우의 수 중에 큰 횟수를 딕셔너리에 저장한다.

현재 위치보다 큰 막대기를 만나면 그다음 막대기로는 점프할 수 없으니 break를 건다.

두 for문을 돌았다면 딕셔너리에 현재 위치에서 갈 수 있는 최대 점프 횟수가 저장되어있을 것이다.

마지막에 딕셔너리의 현재 위치 값을 반환해주면 dp함수가 완성된다.

최종적으로 딕셔너리에 저장된 값 중 가장 큰 값을 구하고 시작 위치에 디딘 횟수를 더해줘야 하기 때문에 1을 더해서 답을 구한다.

\==코드==

```python
class Solution:
    def maxJumps(self, arr: List[int], d: int) -> int:
        jumpCnt = {}  # 각 막대기별 딴 막대기로 이동 할 수 있는 최대 숫자
        maxIdx = len(arr)
        def getMaxJumpCnt(idx):  # 인덱스 받아서 그 인덱스에서 최대 이동 할 수 있는 횟수 구하기
            if idx not in jumpCnt:
                jumpCnt[idx] = 0
            else:
                return jumpCnt[idx]

            now = arr[idx]  # 현재위치

            # 이동할 수 있는 범위 : (현재위치 - d) ~ (현재위치 + d) -> 현재위치는 제외

            # 왼쪽으로(현재위치 ~ 왼쪽으로 d칸까지)
            for moveIdx in range(idx-1, max(0,idx-d)-1, -1):
                if now <= arr[moveIdx]:  # 막히면 끝
                    break
                # 위에를 통과했다는건 이동이 가능하단뜻이니 +1해줌
                jumpCnt[idx] = max(jumpCnt[idx], getMaxJumpCnt(moveIdx) + 1)

            # 오른쪽으로
            for moveIdx in range(idx+1, min(idx+d+1,maxIdx)):
                if now <= arr[moveIdx]:
                    break
                jumpCnt[idx] = max(jumpCnt[idx], getMaxJumpCnt(moveIdx) + 1)

            return jumpCnt[idx]

        for i in range(len(arr)):
            getMaxJumpCnt(i)
        return max(jumpCnt.values()) + 1  # 맨 처음에 해당 위치에 디딘 횟수 더함
```
