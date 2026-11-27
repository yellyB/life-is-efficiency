---
title: "[Python] 리트코드 : 402. Remove K Digits"
created: '2021-08-27'
---

[https://leetcode.com/problems/remove-k-digits/submissions/](https://leetcode.com/problems/remove-k-digits/submissions/)

[Remove K Digits - LeetCode](https://leetcode.com/problems/remove-k-digits/submissions/)

num에서 주어진 k횟수만큼 숫자를 하나씩 삭제해서 가장 작은 숫자가 나오도록 하는 문제이다.

만약 num=1726, k=2라면 숫자 두 개를 지워서 나올 수 있는 가장 작은 숫자 12를 반환하면 된다.

만약 숫자를 단 하나만 지워서 가장 작은 숫자를 만들고 싶다면 숫자를 왼쪽부터 확인해서 앞 숫자가 뒤 숫자보다 큰 경우 앞 숫자를 지우면 된다.

이 과정을 k만큼 반복하면 된다.

바깥 while문은 횟수 k만큼 반복하고 안쪽 while문은 num을 0번 인덱스부터 검사한다.

안쪽 반복문에서 앞 숫자가 클 경우 바깥 반복문으로 빠져나와 앞 숫자를 제외하여 다시 배열을 만든다.

k가 num의 길이와 같은 경우는 최종적으로 num이 " "이 되기 때문에 이 경우는 0을 반환하도록 하였다.

또 마지막의 str->int->str 형 변환은 맨 앞에 0이 붙어있는 경우를 위한 처리이다.

```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        # k만큼 반복, num에서 현재 값이 뒤 값보다 크면 현재값 삭제
        # 삭제하고 나면 k줄이고 다시 num의 처음부터 검사
        while k > 0:
            i = 0
            # for문 쓰는 경우에 num길이가 1이면 아예 안돌고 넘어가는데
            # 이럴경우 i가 선언되지 못해서 에러남
            while i < len(num)-1:
                if num[i] > num[i+1]:
                    break
                i += 1
            num = num[:i] + num[i+1:]
            k -= 1

        if num == "": return "0"
        return str(int(num))
```
