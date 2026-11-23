---
title: "[Python] 리트코드1556 : Thousand Separator (String)"
date: '2021-07-01'
---

[https://leetcode.com/problems/thousand-separator/](https://leetcode.com/problems/thousand-separator/)

[Thousand Separator - LeetCode](https://leetcode.com/problems/thousand-separator/)

\==문제==

천 단위마다 콤마(,)가 아닌 온점(.)을 찍어주면 된다.

\==코드==

```python
class Solution:
    def thousandSeparator(self, n: int) -> str:
        n = str(n)
        length = len(n)
        if length <= 3:
            return n
        i = 1
        while i < length:
            if i % 3 == 0:
                n = n[:length-i]+'.'+n[length-i:]
            i = i + 1
        return ''.join(n)
```

while문으로 i를 1부터 증가시켜 3의 배수일 때 n의 뒤에서부터 위치를 계산해 . 을 찍어준다.
