---
title: "[이진탐색 알고리즘] with 예시 문제"
date: '2022-02-11'
---

이진 탐색 알고리즘은 검색 범위를 절반씩 줄여나가면서 탐색하는 알고리즘이다.

흔히 술자리에서 소주 뚜껑에 있는 숫자를 맞추는 게임을 할 때의 방식과 동일하다.

> **&lt;0~50중에서 19 찾기>**
>
> 1\. 25 제시. 타깃 숫자는 더 작음 => 범위를 0~25로 줄임
> 2\. 12 제시. 타깃 숫자는 더 큼  => 범위를 13~25로 줄임
> 3\. 19를 제시 => 정답

이렇게 숫자가 오름차순 혹은 내림차순의 일정한 순서로 정렬되어 있는 경우 이진 탐색 알고리즘을 사용하면 탐색 시간을 많이 줄일 수 있다.

이 방법을 응용한 문제 3가지를 풀어볼 것이다.

**\[문제 1\]**

**배열 nums에서 target숫자가 위치한 인덱스를 반환하라. (target이 nums에 존재하지 않으면 -1 반환)**

```javascript
// JavaScript
const searchIndex = (nums, target) => {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.round((start + end) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
};
```

```python
# Python
def search(self, nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1
    while left <= right:
        center = left + (right - left) // 2
        if nums[center] == target:
            return center
        elif nums[center] < target:
            left = center + 1
        elif nums[center] > target:
            right = center - 1

    return -1
```

처음에 예시로 든 방법에서 찾는 숫자가 없을 경우 -1을 리턴하는 부분만 추가된 문제이다.

while문에서 중간 인덱스를 구한 다음 그 인덱스의 값이 찾고자 하는 숫자라면 mid를 리턴, 찾지 못했다면 mid를 타깃 숫자와 비교해서 다음번에는 그 뒤의 범위를 검사할지 그 앞의 범위를 검사할지 결정하면 된다.

while문이 종료되었는데도 값을 찾지 못했다면 -1을 리턴한다.

관련 문제: [https://leetcode.com/problems/binary-search/](https://leetcode.com/problems/binary-search/)

**\[문제 2\]**

**불량품 찾기 문제. 특정 버전에 문제가 생겨 불량품이 나오게 되었는데 문제가 생긴 그 버전 이후로도 전부 불량품이기 때문에 제일 첫 불량품 버전을 찾아야 한다. (불량품 체크는 true/false를 리턴해주는 isBadVersion API 사용)**

```javascript
//JavaScript
const solution = (isBadVersion) => {
  return function (n) {
    let start = 0;
    let end = n;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (isBadVersion(mid)) end = mid - 1;
      else start = mid + 1;
    }
    return start;
  };
};
```

```python
# Python
def firstBadVersion(self, n):
    left = 1
    right = n-1
    while left <= right:
        mid = left + (right-left) // 2
        if isBadVersion(mid):
            right = mid - 1
        else:
            left = mid + 1

    return left
```

어쩌면 \[문제 1\]보다 간단한 문제일 수 있다.

이 문제도 동일하게 mid값을 구해서 해당 버전이 불량품인지 확인한 후

불량품이 아니라면 불량 버전은 더 뒤의 범위에 있단 뜻이니 다음에 찾을 범위의 시작을 mid+1로 설정하고

불량품이 맞다면 더 앞의 버전에 불량품이 존재할 수 있으니 다음에 찾을 범위의 끝을 mid-1로 설정해준다.

while문을 다 돌고 나면 시작 위치에는 가장 첫 불량품 위치가 담기게 된다.

관련 문제: [https://leetcode.com/problems/first-bad-version/](https://leetcode.com/problems/first-bad-version/)

**\[문제 3\]**

**오름차순 배열 nums에 주어진 target이 들어갈 위치를 반환하라.**

```javascript
// JavaScript
const searchInsert = (nums, target) => {
  let start = 0;
  let end = nums.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return end;
};
```

```python
# Python
def searchInsert(self, nums: List[int], target: int) -> int:
    left = 0
    right = len(nums)
    while left < right:
        half = left+ (right-left) // 2
        if nums[half] == target:
            return half
        elif nums[half] < target:
            left = half + 1
        elif nums[half] > target:
            right = half

    return left
```

이 문제도 숫자들이 순서대로 정렬되어 있기 때문에 이진 탐색에 적합하다.

중간 값을 target과 비교해서 들어갈 위치를 찾으면 된다.

while문을 탈출할 때까지 답을 못 찾았다면 \[문제 1\]과는 다르게 가장 뒤에 위치해야 한다는 뜻이므로 배열의 length를 반환한다.

관련 문제: [https://leetcode.com/problems/search-insert-position/](https://leetcode.com/problems/search-insert-position/)
