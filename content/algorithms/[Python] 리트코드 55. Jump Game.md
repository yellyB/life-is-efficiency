---
title: "[Python] 리트코드 55. Jump Game"
date: '2021-09-02'
---

[https://leetcode.com/problems/jump-game/](https://leetcode.com/problems/jump-game/)

[Jump Game - LeetCode](https://leetcode.com/problems/jump-game/)

\==문제==

nums배열에서 각 요소들은 오른쪽으로 최대 점프할 수 있는 칸 수이다.

첫 번째 인덱스에서 출발할 때 마지막 인덱스까지 도달할 수 있다면 True를 그렇지 않으면 False를 반환하는 문제이다.

\==방법==

최대로 갈 수 있는 maxIdx를 저장하고 반복문을 돌면서 maxIdx를 갱신해준다.

i와 \[i\] 값을 더해서 그 값이 maxIdx보다 크다면 갱신한다.

마지막에 maxIdx가 제일 마지막 인덱스에 도달했는지 확인하면 된다.

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        maxIdx = 0
        target = len(nums) - 1
        for i,num in enumerate(nums):
            if maxIdx >= i:
                maxIdx = max(maxIdx, i+num)
        return maxIdx >= target
```

\--------------------------------------------------------------------------------------------------------------

↓이전 방법

\==방법==

nums = \[2,3,0,1,4\]라면 처음 위치에서 시작하니까 점프 가능한 최대 인덱스는 2번까지다.

만약 최대로 점프해서 2번 인덱스로 갔다면 0을 만나게 된다.

하지만 0은 더 이상 점프 가능한 칸 수가 없기 때문에 여기로 점프하면 안 된다.

그러니 다시 0번 인덱스에서 한 칸만 점프하자.

그러면 1번 인덱스인 3을 만나게 되고 거기서 최대 점프 숫자인 3칸을 점프하면 마지막 인덱스로 갈 수 있다.

여기서 알 수 있는 건 중간에 0을 만났을 경우 모든 앞 요소의 최대 점프 숫자가 이 0을 뛰어넘지 못하면 결코 마지막 인덱스로 갈 수 없다는 것이다.

그러니 nums를 돌면서 최대로 갈 수 있는 인덱스의 위치를 계속 갱신하고 0을 만난다면 이제까지 구한 최대 점프 가능 인덱스와 비교해서 답을 구하면 된다.

정리하자면

 - 한 방법이라도 마지막 인덱스에 도달한다면 True반환 => 모든 경우의 수가 전부 불가능하면 False란 뜻

 - 전부 불가능한 경우 : 0을 만났을 때 이 인덱스를 뛰어넘지 못함

 - \[0\]~\[len-1\]까지 반복문 -> 최대 점프할 수 있는 인덱스를 계속 갱신해주다가 0을 만났을 때 결과를 도출

    -> 현재 인덱스가 최대 인덱스보다 같거나 작으면 뛰어넘을 수 없다.

 - 반복문을 다 돌았다면 최대 점프 가능 인덱스가 마지막 인덱스보다 같거나 큰지 확인

    -> 최대 점프 가능 인덱스가 더 크다면 True 반대면 False

\==코드==

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        maxIdx = nums[0]  # 최대 점프 가능 인덱스
        for i in range(len(nums)-1):
            if nums[i] == 0 and maxIdx <= i:
                return False
            maxIdx = max(maxIdx, i+nums[i])

        # 다 돌고 맨마지막 인덱스보다 최대 점프위치가 크면 True
        if len(nums)-1 <= maxIdx:
            return True
        else:
            return False
```
