---
title: "[Python] 리트코드 43 : Multiply Strings (String)"
date: '2021-06-22'
---

[https://leetcode.com/problems/multiply-strings/](https://leetcode.com/problems/multiply-strings/)

[Multiply Strings - LeetCode](https://leetcode.com/problems/multiply-strings/)

\==문제==

스트링 타입인 두 숫자를 곱해서 결과를 스트링으로 반환

\==접근방법==

파이썬 내장함수 Int()를 쓰면 아주 간단하게 풀 수 있지만 직접 타입을 변환하지 말라고 문제에 적혀 있다.

아스키 코드를 이용해서 (각 숫자의 아스키코드 번호) - (0의 아스키코드 번호)를 해주면 int()를 쓰지 않고 int형 숫자를 얻을 수 있다.

다음으로 각 자리수를 곱한 숫자에 0을 몇개 붙여 줄 지 정해야 한다.
일의자리x일의자리는 그대로 sum에 더하면 되지만 십의자리x일의자리를 한 경우에는 10을 곱해준다음 sum에 더해야하고 백의자리x십의자리는 1000을 곱해줘야 한다.
함수 pow는 0이 몇개 붙어야 하는지 계산해준다.
num1이 백의자리면 pow(3)=100, num2가 십의자리면 pow(2)=10이라서 100\*10인 1000이 각 숫자를 곱한값에 추가로 곱해진다.

\==코드==

```python
class Solution:
    def pow(self, n):
        result = 1
        for i in range(1,n):
            result = result * 10
        return result

    def multiply(self, num1, num2):
        sum = 0
        for i in range(len(num1)-1,-1,-1):  # 스트링길이가 3이라면 i는 2부터 거꾸로 2,1,0
            for j in range(len(num2)-1,-1,-1):
                numberPosition1 = self.pow(len(num2)-j)  # 자리 수 구하기
                numberPosition2 = self.pow(len(num1)-i)  # 자리 수 구하기
                sum += (ord(num1[i])-ord('0'))*(ord(num2[j])-ord('0'))*numberPosition1*numberPosition2
        return str(sum)
```
