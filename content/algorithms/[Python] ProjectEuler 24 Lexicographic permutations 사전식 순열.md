---
title: "[Python] ProjectEuler 24:Lexicographic permutations 사전식 순열"
date: '2021-04-21'
---

[projecteuler.net/problem=24](https://projecteuler.net/problem=24)

[Problem 24 - Project Euler](https://projecteuler.net/problem=24)

문제24)

> A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:
>
> 012   021   102   120   201   210
>
> What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

간단하게 정리하면 0123456789로 만들 수 있는 경우의 수를 오름차순으로 정렬했을 때 백만번째에 올 조합을 찾으라는 문제이다.

첫번째 자리가 0인 경우의 수는 9!가지일 것이고 첫번째 자리가 1,2,3...인 경우의 수도 9!일 것이다.
9! = 362880 이니까 1000000-362880 은 0이 첫번째 자리인 경우를 제외한 것이다.
그리고 1이 첫번째 자리인 경우를 또 빼주면 274240이 나오는데 이 숫자는 362880보다 작기 때문에 백만번째 순열의 첫번째 자리는 2라는 결론이 나온다.
정확히 말하면 0123456789의 \[2\]번째 자리의 숫자일 것이다.

그 다음자리를 구하려면 위의 방법을 반복하면 된다.

```python
def factorial(n):
    result = 1
    for i in range(n,0,-1):
        result = result * i
    return result

dividend = 1000000 - 1 #피제수
digits = [0,1,2,3,4,5,6,7,8,9]
answer = []
i = 10
while i > 0 :
    i = i - 1
    divisor = factorial(i) #i!을 구해서 나눌 수에 저장
    quotient = dividend//divisor #몫

    n=digits.pop(quotient)
    answer.append(n)

    dividend = dividend%divisor #다음 피제수에 나머지 저장

print('answer',answer) #answer [2, 7, 8, 3, 9, 1, 5, 4, 6, 0]
```

이미 숫자들이 0123456789로 처음에 한번 정렬된 상태이기 때문에 1000000에서 1을 빼주었다.
