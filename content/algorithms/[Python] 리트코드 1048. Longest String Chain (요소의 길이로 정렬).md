---
title: "[Python] 리트코드 1048. Longest String Chain (요소의 길이로 정렬)"
created: '2021-07-19'
---

[https://leetcode.com/problems/longest-string-chain/](https://leetcode.com/problems/longest-string-chain/)

[Longest String Chain - LeetCode](https://leetcode.com/problems/longest-string-chain/)

\==문제==

소문자로 구성된 words 배열을 받는다.

알파벳이 하나씩 추가되어 'a' 'ab' 'dab' 같은 식으로 이어질 때 이것을 word chain이라고 부른다.

words배열 안에서 가장 길게 연결할 수 있는 word chain 개수를 구하라.

\==처음 코드==

각 단어의 길이 순으로 정렬을 한다.

단어의 한 알파벳씩 제거하여 이 전의 단어와 같다면 cnt를 하나씩 증가시켰다.

```python
class Solution:
    def longestStrChain(self, words):
        cnt = 1
        sortedList = []
        for word in sorted(words, key=len):  # 길이순 정렬
            sortedList.append(word)
        prevStr = sortedList.pop(0)  # 비교할 첫번째꺼 뺌
        for str in sortedList:  # 정렬된 리스트 반복
            for i in range(len(str)):  # 단어의 각 알파벳 하나씩 없애서 비교할거임
                if prevStr == str[:i]+str[i+1:]:
                    cnt += 1
                    prevStr = str
                    answer.append(str)
                    break
        return cnt
```

이 로직의 문제점은 크게 세 가지가 있다.

첫 번째, 만약 가장 긴 word chain이 두 번째 문자열부터 시작한다면 이 로직은 원하는 결과를 주지 않는다.

두 번째, 처음의 두 문자열을 체크했는데 두 문자열이 chain관계가 아니라면 첫 번째 문자열과 세 번째 문자열을 비교하게 되는데 첫 번째 문자열의 길이는 1이고 세 번째 문자열의 길이는 3이라면 cnt는 무조건 1로 끝나게 될 것이다.

세 번째, \["a", "ab", "ac", "bd", "abc", "abd", "abdd"\]가 주어졌을 때 원하는 결과는 4로 word chain의 리스트는 \["a", "ab", "abd", "abdd"\]가 나와야 하는데 \["a", "ab", "abc"\]로 3개가 카운팅 된다.

전체적으로 봤을 때 무조건 맨 처음 문자열을 word chain의 첫 번째 문자열로 가정하고 시작하는 것, word chain이 여러 개 나올 수 있지만 그중에 가장 긴 것을 선택하는 부분이 빠져 있다는 점을 수정해야 한다.

이 두 가지를 해결하려면 각 문자열이 몇 개의 chain을 가질 수 있는지 전부 알아야 하기 때문에 DP알고리즘을 써야 한다는 결론을 내렸다.

새로운 로직▼

이전과 비슷하지만 알파벳을 하나씩 제거한 임시 문자열이 dict에 있다면

현재 문자열 값을 임시 문자열이 이제까지 가지고 있을 가장 큰 word chain 값과 제거하기 전 현재 문자열의 word chain값 중 큰 값으로 대체한다.

이 과정을 다 거치고 최종적으로 dict에서 가장 큰 value값을 리턴하면 된다.

\==최종 코드==

```python
class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        strDict = {}  # str : wordChain몇개?
        for str in words:
            strDict[str] = 1  # 초기값 전부 1
        for str in sorted(words, key=len):  # 정렬된 리스트 반복
            for i in range(len(str)):
                prevStr = str[:i]+str[i+1:]  # 알파벳 하나씩 제거
                if prevStr in strDict:  # 알파벳 하나 제거한게 dict에 있으면
                    strDict[str] = max(strDict[prevStr]+1, strDict[str])
        return max(strDict.values())
```
