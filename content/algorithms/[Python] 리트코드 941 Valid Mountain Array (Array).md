---
title: "[Python] 리트코드 941 : Valid Mountain Array (Array)"
date: '2021-06-05'
---

[https://leetcode.com/problems/valid-mountain-array/](https://leetcode.com/problems/valid-mountain-array/)

[Valid Mountain Array - LeetCode](https://leetcode.com/problems/valid-mountain-array/)

등산하는 것처럼 배열의 정점까지 숫자가 계속 증가했다가 이후에 계속 감소하는 경우에 True를, 이외의 경우엔 False를 반환한다.

```python
class Solution:
    def validMountainArray(self, arr: List[int]) -> bool:
        maxNum = max(arr)
        maxNumIdx = arr.index(maxNum)
        if maxNumIdx == 0 or maxNumIdx == len(arr) - 1 :
            return False
        for i in range(0,maxNumIdx):
            if arr[i] >= arr[i+1]:
                return False
        for i in range(maxNumIdx, len(arr) - 1):
            if arr[i] <= arr[i+1]:
                return False
        return True
```

배열에서 가장 큰 숫자를 구해서 그 index를 구해 maxNumIdx에 저장한다.

반복문으로 0부터 maxNumIdx까지 앞 숫자보다 뒤 숫자가 큰지 확인한다.

뒤 숫자가 앞 숫자보다 작거나 같다면 False를 반환하고 종료한다.

종료되지 않았다면 이번엔 maxNumIdx부터 arr의 끝까지 반복문을 실행한다.

이번엔 반대로 뒤 숫자가 앞 숫자보다 크거나 같으면 False를 반환한다.

여기까지 전부 통과했다면 True를 반환한다.

내장 함수 max()를 쓰지 않고 풀 방법이 있는지 생각해봤다.

처음에 든 생각은 isUp이라는 flag값을 설정해서 숫자가 증가할 때와 감소할 때를 구분해주는 방법을 떠올렸는데 코드가 복잡해질 것 같아서 포기했다.

리트코드에 올라온 풀이를 보고 알고리즘을 짜 보았다.

```python
class Solution:
    def validMountainArray(self, arr) -> bool:
        i = 0
        length = len(arr) - 1
        while i < length and arr[i] < arr[i+1]:
            i = i + 1
        if i == 0 or i == length:
            return False
        while i < length and arr[i] > arr[i+1]:
            i = i + 1
        return i == length
```

배열의 길이만큼 반복문을 돌려서 숫자가 증가했다가 감소하는 경우에만 i 가 배열의 길이만큼 증가하도록 짰다.

예를 들어 숫자가 증가 -> 감소 -> 증가하는 경우에 i가 length만큼 증가하기 전에 두 번째 while문을 탈출하기 때문에 false를 리턴한다.

배열의 가독성을 생각하거나 주어진 배열의 길이가 짧다면 첫 번째 코드가 효율적이다.

하지만 배열의 길이는 10^4까지라는 문제의 제약조건을 고려하면 두 번째 코드가 더 효율적이라는 결론이다.
