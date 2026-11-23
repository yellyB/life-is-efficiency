---
title: "[Python] 리트코드 1470 : Shuffle the Array (Array)"
date: '2021-06-08'
---

[https://leetcode.com/problems/shuffle-the-array/](https://leetcode.com/problems/shuffle-the-array/)

[Shuffle the Array - LeetCode](https://leetcode.com/problems/shuffle-the-array/)

주어진 nums배열에서 0부터 n씩 건너뛰면서 숫자를 골라 새로운 배열을 만들어내면 된다.

nums=\[0,1,2,3,4,5\], n=3이라면 nums\[0\]인 0이 새 배열의 첫 번째가 되고 3칸 뒤인 3이 두 번째가 된다.

3의 3칸 뒤는 배열을 한 바퀴 돌아서 0이 되야하는데 0은 이미 새 배열에 들어갔으니 그다음인 1이 세 번째에 오면 된다.

위의 방법으로 짠 코드이다.

```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        answer = []
        k = 0
        while len(answer) != len(nums):
            while nums[k] == 0:
                k = k + 1
            answer.append(nums[k])
            nums[k] = 0
            k = k + n
            if k >= len(nums):
                k = k - len(nums)
        return answer
```

풀고나서 nums.length가 n\*2라는게 문제의 조건이란걸 알게되어서 더 간결한 코드를 짤 수 있었다.

```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        answer = []
        for i in range(0, n):
            answer += [nums[i]]
            answer += [nums[i+n]]
        return answer
```

배열의 길이는 n의 두배이니까 n만큼 반복문을 길이가 n인 배열 두개가 합쳐졌다고 생각하고 각 배열에서 \[i\]를 가져오면 된다.

내장함수 zip을 사용하는 방법도 있다.

위와 원리는 같다.

```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        answer = []
        for i, j in zip(nums[:n],nums[n:]):
            answer += [i,j]
        return answer
```
