---
title: "[Python] 리트코드 1002 : Find Common Characters (String)"
created: '2021-07-11'
---

[https://leetcode.com/problems/find-common-characters/](https://leetcode.com/problems/find-common-characters/)

[Find Common Characters - LeetCode](https://leetcode.com/problems/find-common-characters/)

\==문제==

문자열이 담긴 배열이 주어졌을 때 그 배열의 모든 문자열에 포함된 단어를 반환해야 한다.

\==설명==

기준이 될 단어를 하나 정하고 그 기준 단어 속의 알파벳들이 나머지 단어들에 포함되어있나 확인한다.

그런데 만약 기준 단어가 cook이라면 알파벳 o가 두 개이기 때문에 다음 비교할 단어가 sock인 경우에는 o가 중복으로 체크된다.

그래서 알파벳이 포함되어있다고 판단했다면 그 알파벳은 빼줘야 한다.

replace를 사용해서 해당 알파벳을 한 개만 없애주도록 하였다.

\==코드==

```python
class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        first = words[0]  # 기준이 될 단어
        answer = []
        for s in first:
            inAllStr = True  # 기준 단어의 각 글자가 나머지 단어들에 포함되어있는지
            for i, word in enumerate(words[1:]):
                if s not in word:
                    inAllStr = False
                    break
                else:
                    words[i+1] = word.replace(s,'',1)  # word에서 s를 한개만 바꾸겠다
            if inAllStr:
                answer.append(s)
        return answer
```
