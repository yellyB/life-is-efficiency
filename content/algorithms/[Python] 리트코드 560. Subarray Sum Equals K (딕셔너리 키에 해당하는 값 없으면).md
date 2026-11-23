---
title: "[Python] 리트코드 560. Subarray Sum Equals K (딕셔너리 키에 해당하는 값 없으면)"
date: '2021-07-21'
---

[https://leetcode.com/problems/subarray-sum-equals-k/](https://leetcode.com/problems/subarray-sum-equals-k/)

[Subarray Sum Equals K - LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/)

\==문제==

nums배열에서 더해서 k가 되는 부분 배열의 가짓수를 구하는 문제이다.

\==풀이==

누적합계인 sums를 선언해서 합계에 어떤 숫자가 더해질 때마다 sums-k 값을 구한다.

이 값이 이 전에 구했던 sums의 이력 중 어떤 것이라도 일치하는 게 있다면 부분 배열 개수를 +1 해준다.

nums=\[2,1,2,3\]이고 k=3이라고 했을 때, 정답은 \[2,1\], \[1,2\], \[3\]으로 3이 나와야 한다.

누적합계 sums의 제일 처음 값은 0이니까 전체 이력은 \[0,2,3,5,8\]인데 0->3으로 갈 때, 2->5로 갈 때, 5->8로 갈 때 총 3가지 경우로 정답과 일치한다.

몇 단계를 거치건  0이나 2 혹은 5에서 +3 이 되는 값이 되기만 한다면 그 부분 배열은 더해서 3이 된다.

이번엔 nums=\[1,0,-1,0\]이고 k=0인 경우를 생각해보자.

이 경우는 \[0\], \[1,0,-1\], \[0\], \[1,0,-1,0\] 총 4가 나와야 한다.

누적합계 sums는 \[0,1,1,0,0\]으로 sums\[0\]에서 \[3\]과 \[4\]로 갈 때, sums\[3\]에서 \[4\]로 갈 때, sums\[1\]에서 \[2\]로 갈 때 총 4가지로 정답과 일치한다.

이 경우는 첫 번째 경우와 다르게 동일한 누적 합계 이력이 존재한다.

그래서 sums의 이력을 저장한 sumDict에 동일한 키 값이 존재하면 값을 하나씩 증가시킨다.

\==코드==

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        cnt = 0
        sums = 0  # 누적 합계
        sumDict = {0:1}  # hash
        for num in nums:
            sums = sums + num
            cnt = cnt + sumDict.get(sums-k, 0)
            sumDict[sums] = sumDict.get(sums, 0) + 1
        return cnt
```

sumDict.get()을 이용해 키 값에 해당하는 값을 가져오고 키가 존재하지 않는다면 0을 가져온다.

(현재 누적합계 - k)를 키로 설정해서 sumDict에 저장된 합계 이력이 없다면 cnt는 증가되지 않을 것이고 합계 이력이 존재하면 cnt + 1이 된다.

동일한 합계 이력이 있을 경우엔 그 값을 증가시켜줘야 하기 때문에 동일하게 dict.get()을 이용해 현재 누적합계를 키로 설정해서 값이 있다면 1을 증가시킨다.
