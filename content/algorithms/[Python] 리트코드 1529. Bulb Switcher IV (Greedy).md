---
title: "[Python] 리트코드 1529. Bulb Switcher IV (Greedy)"
date: '2021-08-25'
---

[https://leetcode.com/problems/bulb-switcher-iv/](https://leetcode.com/problems/bulb-switcher-iv/)

[Bulb Switcher IV - LeetCode](https://leetcode.com/problems/bulb-switcher-iv/)

방 안에 전구들이 모두 꺼진 상태이다.

이 전구들을 target상태와 똑같이 만드는 데에 몇 번 스위치를 눌러야 하는지 구하는 문제이다.

i번째 전구를 선택하면 i~len(arr)까지의 전구의 상태가 반전된다.

만약 전구가 00111인 상태에서 두 번째 두 번째 전구를 선택했다면 두 번째~다섯 번째 전구의 상태가 반전되어 01000이 된다.

target = 10111을 예시로 들어보자.

맨 처음 상태는 00000에서 시작하니까 처음 인덱스부터 확인해서 현재 상태가 target과 다르다면 전구를 끄거나 켜면 된다.

현재 상태는 00000인데 target은 10111이니까 첫 번째 전구 스위치를 누른다.

뒤의 값도 전부 반전되어 현재 상태는 11111이 된다.

두 번째 인덱스로 넘어가서 현재 상태의 두 번째 전구는 1인데 target은 0이니 이번에도 전구 스위치를 누른다.

뒤의 값도 반전되어 10000이 된다.

세 번째 인덱스도 값이 서로 다르니 반전시키면 10111이 된다.

target과 같은 상태가 되었으니 종료한다.

스위치를 누르면 그 뒤의 전구는 0 아니면 1로 전부 같은 값을 가지고 있다.

그러니 값이 반전될 때마다 리스트를 전부 업데이트할 필요 없이 현재 인덱스 뒤의 값이 무엇인지만 알고 있으면 된다.

```python
class Solution:
    def minFlips(self, target: str) -> int:
        flipCnt = 0
        restBulbsVal = '0'  # 반전시킨 뒤에 애들 현재 값
        for bulb in target:
            if bulb != restBulbsVal:
                flipCnt += 1
                restBulbsVal = '1' if restBulbsVal == '0' else '0'  # 값 반전
        return flipCnt
```
