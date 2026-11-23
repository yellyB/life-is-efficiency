---
title: "[Python] 리트코드 1636. Sort Array by Increasing Frequency(딕셔너리 초기화, 딕셔너리 정렬)"
date: '2021-10-19'
---

[https://leetcode.com/problems/sort-array-by-increasing-frequency/](https://leetcode.com/problems/sort-array-by-increasing-frequency/)

[Sort Array by Increasing Frequency - LeetCode](https://leetcode.com/problems/sort-array-by-increasing-frequency/)

\- 반복되는 횟수가 적은 순서대로 정렬

\- 횟수가 동일하다면 내림차순 정렬

**Example)** **Input:** nums = \[1,1,2,2,2,3\] **Output:** \[3,1,1,2,2,2\]

1.  횟수가 동일할 경우 내림차순 정렬이기 때문에 처음에 한 번 내림차순 정렬을 해준다.
2.  숫자가 나올 때마다 +1을 해주어 {num:count} 형태로 딕셔너리에 저장한다.
3.  딕셔너리를 value 기준으로 정렬해서 정렬한 순서대로 하나씩 꺼낸다.
4.  키값을 밸류(횟수)만큼 반복한다.

```python
class Solution:
    def frequencySort(self, nums: List[int]) -> List[int]:
        answer = []
        nums.sort(reverse=True)  # 횟수 같을 때는 내림차순 정렬이니까
        freq = collections.defaultdict(int)

        for num in nums:
            freq[num] += 1

        sort = sorted(freq.items(), key=lambda x: x[1], reverse=False)  # 밸류 기준 정렬

        for item in sort:
            answer.extend([item[0]] * item[1])
        return answer
```
