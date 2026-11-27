---
title: "[Python] 리트코드 78 : Subsets (Array)"
created: '2021-06-10'
---

[https://leetcode.com/problems/subsets/](https://leetcode.com/problems/subsets/)

[Subsets - LeetCode](https://leetcode.com/problems/subsets/)

주어진 배열로 나올 수 있는 모든 부분집합을 반환하는 문제이다.

\[1,2,3\]이 주어졌다면 \[\[\], \[1\], \[2\], \[1,2\], \[3\], \[1,3\], \[2,3\], \[1,2,3\]\]이 나오면 된다.

처음에 문제를 보고서 역추적을 사용해야 하는 건지 고민했는데 문제 카테고리가 array인걸 떠올리고 복잡하게 생각하지 않아야겠다고 생각했다.

그리고 예시로 나온 output의 부분집합들의 순서를 참고해서 문제를 풀었다.

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        answer = [[]]
        for num in nums:
            for i in range(len(answer)):
                answer.extend([answer[i]+[num]])
        return answer
```

먼저 빈 배열을 answer에 초기값으로 넣어주고 nums\[i\]를 차례대로 반복한다.

그 반복문 안에서 다시 answer를 반복문으로 돌려서 answer의 요소 값 전부에 nums\[i\]를 붙인 배열을 만들어 answer에 새로 추가한다.

nums=\[1,2,3\]이라면

num=1일 때 answer는 \[\]만 가지고 있는 상태이니 nums반복문의 첫 실행 결과는 answer = \[\[\], \[1\]\]이다.

num=2일 때 answer의 요소 값 전부에 2를 더한 것은 \[2\] \[1,2\]니까 이것을 answer에 추가해주면 \[\[\], \[1\], \[2\], \[1,2\]\]이다.

이 방법을 사용하면 예시에 나온 결과와 부분집합들의 순서도 똑같기 때문에 문제에서 요구하는 풀이에 가깝다고 생각한다.

answer에 새로 만들어진 배열을 추가할 때 처음에는 append를 썼더니 원하던 결과가 안 나와서 extend로 배열을 추가해주니까 원하는 결과가 나왔다.

배열을 추가하고 삭제하는 방법을 더 알아보고 상황에 맞게 쓸 수 있도록 연습해야겠다.
