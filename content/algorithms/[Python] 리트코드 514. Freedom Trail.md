---
title: "[Python] 리트코드 514. Freedom Trail"
created: '2021-09-15'
---

[https://leetcode.com/problems/freedom-trail/](https://leetcode.com/problems/freedom-trail/)

[Freedom Trail - LeetCode](https://leetcode.com/problems/freedom-trail/)

> 리스트 ring은 \[0\]번 요소가 12시 방향에 위치하고 뒤따르는 요소들이 시계방향으로 위치한 다이얼 모양 원이다.
> 선택해야 하는 알파벳인 key가 주어진다.
> ring을 시계방향 혹은 반시계 방향으로 돌리면서 key에 해당하는 알파벳을 순서대로 고를 건데 이때 다이얼을 가장 적게 돌리는 경우의 횟수를 구하라.

ring = godding, key = gd 라고 해보자.

ring의 처음 위치에서 오른쪽으로 가는 경우와 왼쪽으로 가는 경우를 독립적으로 비교해서 계속 더 작은 횟수인 경우를 선택하면 된다.

하지만 ring = gffffig, key = gfi 라면 각 경우를 독립적으로 비교할 수 없다.

key의 첫 글자인 g는 ring에서 처음과 끝에 위치하는데 처음의 g를 선택하는 게 나으니 이걸 선택하고 그다음 key는 f니까 ring의 두 번째인 f를 선택한다면 key의 마지막 글자인 i를 선택하기 위해서 중간에 fff를 거쳐야 한다.

처음으로 돌아가서 key의 g를 선택할 때 ring의 마지막 g를 선택했다면 3번 만에 key를 얻어낼 수 있다.

그렇다면 알파벳을 선택할 때 뒤의 경우도 고려해서 알파벳을 선택해야 한다.

처음부터 끝까지 모든 경우의 수를 다 알 필요는 없다.

위의 예시로 설명하면 첫 번째 key인 g를 ring에서 찾는다.

0번과 7번에 g가 있으니  두 경우로 가기 위한 최소 횟수인 0과 1을 각각 저장한다.

두 번째 key인 f는 총 4개가 있는데 이 전의 key였던 g의 위치 두 군데를 모두 확인해서 왼쪽으로 갔을 때와 오른쪽으로 갔을 때의 최솟값으로 저장한다.

무슨 말이냐면 f묶음 중 첫 번째 f는 이 전 key였던 두 개의 g중 ring\[0\]인 g에서 오른쪽으로 한 칸을 가는 게 최소 횟수이다.

f묶음 두 번째 f도 역시 ring\[0\]인 g에서 갔을 때가 최소 횟수이다.

하지만 f묶음 중 마지막 f는 끝에 있는 g에서 왼쪽으로 가는 게 최소 횟수이다.

이런 식으로 계속 진행하면 결국 key를 얻을 수 있는 최소 횟수를 알 수 있다.

여기서 저장하고 있어야 할 데이터는 마지막으로 선택한 위치들(=이 전 key가 ring에서 위치한 모든 곳)과 그 위치까지 가는데 걸린 최소 횟수이다.

key가 마지막까지 돌았을 때 이 데이터에 저장된 최솟값을 반환하면 된다.

문제에서 ring에서 알파벳 선택 시 버튼을 누른 횟수도 카운트한다고 했으니 마지막에 key의 길이만큼 더해주면 된다.

정리하자면 이렇다.

▷ 전체 로직 : 다이얼 돌리기 전 위치에서 가야 할 위치까지 가는데

1. ring에서 어떤 알파벳에서 시작해야 짧은지 비교

2. 시계방향, 반시계 방향 비교

이전 값에 최솟값을 누적 저장하여 최종 값 구함

▷ 저장하고 있어야 할 데이터 : 마지막 선택 위치와 그 위치까지 가는데 걸린 횟수(딕셔너리)

\[for 1\] key -> 반복. 이번 반복문에서 선택될 마지막 위치를 새로 저장한다.
\[for 2\] 마지막 선택 정보가 저장된 딕셔너리 -> 반복 (이 전 key의 ring에서의 인덱스들)
\[for 3\] ring -> 반복

- 마지막 선택했던 위치에서 현재 위치까지 도달하는 데에 왼, 오 중 최소 횟수 선택 = minValue

- 마지막 선택했던 위치까지 가는데 걸렸던 횟수에 minValue 더해줌 -> 딕셔너리에 저장

- 딕셔너리에 이미 저장된 값이 있다면 더 작은 값 저장

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        lastIdxs = {0:0}  # (마지막선택위치 : 걸린 거리) 초기값 지정
        for k in key:
            temp = {}  # 선택한 알파벳 위치 저장하기 위한 임시변수
            for lastIdx in lastIdxs:
                for i, r in enumerate(ring):
                    if k == r:
                        minGap = min(abs(lastIdx-i), len(ring)-abs(lastIdx-i))  # 왼, 오 중에 더 작은 간격
                        if i not in temp:
                            temp[i] = minGap + lastIdxs[lastIdx]  # 이전의 최소 횟수에 현재 횟수 더해줌
                        else:
                            temp[i] = min(temp[i], minGap + lastIdxs[lastIdx])
            # 이번 for문에서 key에 해당했던 ring 위치를 last선택에 저장하고 다음for문으로
            lastIdxs = temp

        return min(lastIdxs.values()) + len(key)  # 버튼 누른 횟수 추가
```
