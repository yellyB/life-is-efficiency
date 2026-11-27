---
title: "[Sliding Window] with 예시문제 2가지"
created: '2022-02-16'
---

슬라이딩 윈도우는 네트워크를 공부할 때 배웠던 개념인데 이 방식을 알고리즘 문제에 적용시켜 풀기도 한다.

범위를 일정하게 고정시켜서 그 범위를 이동시켜가면서 데이터를 비교한다.

two pointer알고리즘과 비슷한 알고리즘이다.

**\[문제 1\]**

**문자열 s에서 반복되는 알파벳이 없는 가장 긴 substring의 길이를 구하라.**

&lt;JavaScript>

```javascript
var lengthOfLongestSubstring = function (s) {
  let max = 0;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const idx = s.slice(l, r).indexOf(s[r]);
    if (idx === -1) {
      max = Math.max(max, r + 1 - l);
    } else {
      l += idx + 1;
    }
  }
  return max;
};
```

&lt;Python>

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        length = len(s)
        left = 0
        maxVal = 0
        for right in range(length):
            findIdx = s[left:right].find(s[right])
            if findIdx == -1:
                maxVal = max(maxVal, len(s[left:right])+1)
            else:
                left += findIdx + 1

        return maxVal
```

▷ left와 right포인터 두 개를 사용

▷ right는 s의 인덱스를 가리킨다.

▷ right를 ++하면서 \[left:right-1\]에 \[right\] 값이 존재하는지 확인

   - 없다면 max를 갱신해주고

   - 있다면 중복 알파벳을 제거해야 하기 때문에 \[right\]의 인덱스 바로 다음을 시작 위치로 갱신

문제: [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**\[문제 2\]**

**문자열 s1과 s2가 주어질 때 s2가 s1의 permutation을 포함하면 true, 아니면 false를 반환하라.**

&lt;JavaScript>

```javascript
var checkInclusion = function (s1, s2) {
  const len = s1.length;
  const arr1 = Array(26).fill(0);
  const arr2 = Array(26).fill(0);

  for (const s of s1) {
    const idx = s.charCodeAt() - 97;
    arr1[idx] += 1;
  }

  for (const i in s2) {
    const s = s2[i];
    const idx = s.charCodeAt() - 97;
    arr2[idx] += 1;

    if (i >= len) arr2[s2[i - len].charCodeAt() - 97] -= 1;
    if (arr1.toString() == arr2.toString()) return true;
  }
  return false;
};
```

&lt;Python>

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        len1 = len(s1)
        list1 = [0] * 26
        list2 = [0] * 26

        for s in s1:
            list1[ord(s)-97] += 1

        for i, s in enumerate(s2):
            list2[ord(s)-97] += 1
            if i >= len1:
                list2[ord(s2[i-len1])-97] -= 1
            if list1 == list2:
                return True
        return False
```

이 문제는 방법만 떠올린다면 아주 간단한 문제이다.

s1과 s2에서 각 알파벳이 등장하는 횟수를 따로 기록한 다음 s1의 길이만큼 window크기를 설정해서 탐색하는 방법이다.

▷ s1과 s2에 각 알파벳만큼 0으로 초기화 한 리스트를 만듦(list1, list2)
▷ list1에 아스키코드를 이용해 알파벳 freq를 체크
▷ list2에서
     - 현재 인덱스가 s1의 길이와 같아지면 앞으로는 window크기(s1의 len)를 고정시켜 그 크기대로 이동한다.
     - window크기를 초과하는 만큼 제일 앞의 알파벳은 검사 대상에서 빼준다.

문제: [https://leetcode.com/problems/permutation-in-string/](https://leetcode.com/problems/permutation-in-string/)
