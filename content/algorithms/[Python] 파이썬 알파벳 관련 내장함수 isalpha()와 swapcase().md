---
title: "[Python] 파이썬 알파벳 관련 내장함수 isalpha()와 swapcase()"
date: '2021-11-20'
---

[https://leetcode.com/problems/letter-case-permutation/](https://leetcode.com/problems/letter-case-permutation/)

[Letter Case Permutation - LeetCode](https://leetcode.com/problems/letter-case-permutation/)

위 문제를 풀다가 사용하게 되었다.

이름에서도 알 수 있듯이 isalpha()는 해당 문자가 알파벳인지 아닌지 검사해주며 swapcase()는 소문자는 대문자로 대문자는 소문자로 바꿔준다.

알고리즘을 풀 때 아스키코드 함수 ord()를 이용해 알파벳을 판별하고 소문자와 대문자를 전환할 수도 있지만 간편하게 내장 함수를 사용할 수도 있다.

```python
class Solution:
    def letterCasePermutation(self, s: str) -> List[str]:
        answer = [s]
        for i,letter in enumerate(s):
            if letter.isalpha():
                temp = []
                for word in answer:
                    temp.append(word[:i] + word[i].swapcase() + word[i+1:])
                answer.extend(temp)
        return answer
```
