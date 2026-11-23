---
title: "[Two Pointer #1] 대표 문제 + 풀이"
date: '2022-02-13'
---

**\[문제 1\]**

오름차순 정렬된 nums배열의 모든 요소를 제곱한 값을 정렬된 배열로 반환하라.

(ex. nums = \[-4,-1,0,3,10\] 일 때 정답은 \[0,1,9,16,100\] 이다.)

&amp;lt;JavaScript>

```javascript
var sortedSquares = function(nums) {
    let left = 0;
    let right = nums.length-1;
    const answer = []
    while(left <= right){
        if(Math.abs(nums[left]) > Math.abs(nums[right])){
            answer.push(Math.pow(nums[left], 2));
            left ++
        }else{
            answer.push(Math.pow(nums[right], 2));
            right --
        }
    }
    return answer.reverse()
};
```

&amp;lt;Python>

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        left, right = 0, len(nums)-1
        answer = []

        while left <= right:
            if abs(nums[left]) >= abs(nums[right]):
                answer.append(pow(nums[left], 2))
                left += 1
            else:
                answer.append(pow(nums[right], 2))
                right -= 1
        return sorted(answer)
```

제곱했을 때 가장 큰 숫자를 고르려면 절댓값이 가장 큰 숫자를 고르면 된다.

nums는 오름차순 정렬이기 때문에 맨 앞 혹은 맨 뒤 숫자가 제곱했을 때 가장 큰 숫자가 될 것이다.

 1. 맨 앞, 맨뒤를 포인터로 잡고 큰 수부터 answer에 담는다.
 2. 마지막에 reverse()로 뒤집기

 또 다른 방법:
 1. 처음에 nums.lengh만큼 배열 공간을 미리 확보하고
 2. answer배열용 포인터를 하나 더 만들어서 뒤에서부터 차례대로 담기(이렇게 하면 마지막에 뒤집기 생략 가능)

관련 문제: [https://leetcode.com/problems/squares-of-a-sorted-array/](https://leetcode.com/problems/squares-of-a-sorted-array/)

**\[문제 2\]**

k만큼 nums를 rotate 시킨다.

ex. nums = \[1,2,3,4,5,6,7\], k = 3 일 때 정답은 \[5,6,7,1,2,3,4\] 이다.

&amp;lt;JavaScript>

```javascript
var rotate = function(nums, k) {
    const reverse = (left, right, arr) => {
        while (left < right){
            const temp = arr[left];
            arr[left] = arr[right]
            arr[right] = temp

            left ++;
            right --;
        }
    }

    if(k>nums.length) k = k % nums.length;  // k가 길이보다 더 길경우 처리

    reverse(0, nums.length-1, nums);  // 1. 전체 뒤집기
    reverse(0, k-1, nums);  // 2. 0 ~ k 뒤집기
    reverse(k, nums.length-1, nums);  // 3. k ~ 끝 뒤집기

};
```

&amp;lt;Python>

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        length = len(nums)

        if length < k:
            k = k % length

        cutIdx = length - k

        nums[:] = nums[cutIdx:] + nums[:cutIdx]
```

자바스크립트와 파이썬을 약간 다른 방식으로 풀었다.

k가 nums의 길이보다 클 경우에 k를 처리해주는 부분은 동일하다.

자바스크립트는 two pointer로 reverse함수로 배열을 rotate 시켜주었고 파이썬은 k만큼 nums의 뒷부분을 잘라서 앞에 붙여주었다.

관련 문제: [https://leetcode.com/problems/rotate-array/](https://leetcode.com/problems/rotate-array/)

**\[문제 3\]**

nums배열에서 모든 0을 배열의 뒷부분에 모아주자

&amp;lt;JavaScript>

```javascript
var moveZeroes = function(nums) {
    let p = 0;  // 0 위치를 가리킬 포인터
    for (const i in nums){
        const num = nums[i];
        if(nums[p] === 0 && num !== 0){
            const temp = nums[p];
            nums[p] = nums[i]
            nums[i] = temp
        }
        if(nums[p] !== 0) p ++;
    }
};
```

&amp;lt;Python>

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        pointer = 0

        for i in range(1, len(nums)):
            if nums[i] != 0 and nums[pointer] == 0:
                nums[i], nums[pointer] = nums[pointer], nums[i]

            if nums[pointer] != 0: pointer += 1
```

0의 위치를 가리킬 포인터를 만들어서 nums에서 0이 아닌 숫자가 나왔을 때 둘의 위치를 바꾸고 포인터는 증가시킨다.
여기서 주의해야 할 점은 0의 포인터는 0이 아닐 경우에만 증가시켜야 한다는 것이다.

관련 문제: [https://leetcode.com/problems/move-zeroes/](https://leetcode.com/problems/move-zeroes/)

**\[문제 4\]**

오름차순 정렬된 numbers에서 두 숫자를 골라 target이 되는 조합의 인덱스를 찾는 문제 (1-indexed)

ex. numbers = \[2,7,11,15\], target = 9 일 때

    9를 만들 수 있는 숫자 2와 7의 인덱스인 \[1, 2\]가 정답

&amp;lt;JavaScript>

```javascript
var twoSum = function(numbers, target) {
    let low = 0;
    let high = numbers.length - 1;
    while(low < high){
        const sums = numbers[low] + numbers[high];
        if(sums === target) break
        else if(sums < target) low ++;
        else high --
    }
    return [low+1, high+1]
};
```

&amp;lt;Python>

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        restDict = {}
        for i, num in enumerate(numbers):
            rest = target - num
            if rest in restDict:
                return [restDict[rest], i+1]
            else:
                restDict[num] = i + 1
```

자바스크립트는 two pointer로 풀고 python은 hash로 풀었다.

two pointer: 오름차순이기 때문에 numbers의 양 끝을 포인터로 잡고 두 숫자의 합계를 target과 비교하면서

합계가 target보다 작다면 작은 숫자를 가리키는 포인터를 1씩 증가시키고

반대면 큰 숫자를 가리키는 포인터를 1씩 감소시킨다.

hash: numbers의 요소별로 target에 도달하기 위해 필요한 나머지 숫자를 딕셔너리에 저장해두어서 다른 요소 중 저장한 그 나머지 숫자가 있을 때 그 두 값을 반환해준다.

관련 문제: [https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
