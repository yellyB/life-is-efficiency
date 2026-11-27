---
title: "[Python] Project Euler 112 : Bouncy numbers"
created: '2021-04-23'
---

[projecteuler.net/problem=112](https://projecteuler.net/problem=112)

[Problem 112 - Project Euler](https://projecteuler.net/problem=112)

> Working from left-to-right if no digit is exceeded by the digit to its left it is called an increasing number; for example, 134468.
> Similarly if no digit is exceeded by the digit to its right it is called a decreasing number; for example, 66420.
> We shall call a positive integer that is neither increasing nor decreasing a "bouncy" number; for example, 155349.
> Clearly there cannot be any bouncy numbers below one-hundred, but just over half of the numbers below one-thousand (525) are bouncy. In fact, the least number for which the proportion of bouncy numbers first reaches 50% is 538.
> Surprisingly, bouncy numbers become more and more common and by the time we reach 21780 the proportion of bouncy numbers is equal to 90%.
> Find the least number for which the proportion of bouncy numbers is exactly 99%.

왼쪽에서 오른쪽으로 읽었을 때 계속 증가하거나 계속 감소하지 않는 숫자를 bouncy number라고 하는데, 이 bouncy number의 비율이 99%가 되는 순간의 숫자를 찾는 문제이다.

```python
def isBouncy(n):
    list = []
    asc = []
    desc = []
    for i in str(n):
        list.append(i)
        asc.append(i)
        desc.append(i)
    asc.sort()
    desc.sort()
    desc.reverse()
    if list != asc or list != desc:
        return True
    else:
        return False

num = 0
bouncyCnt = 0
rate = 0

while True:
    if isBouncy(num):
        bouncyCnt = bouncyCnt + 1
        rate = (bouncyCnt / num) * 100

        if rate == 99:
            print(num) #1587000
            break
    num = num + 1
```

isBouncy함수는 입력받은 숫자를 오름차순 혹은 내림차순으로 정렬하여 입력받은 원래 숫자와 같은지를 검사한다.

둘 다 다르다면 bouncy number로 판단하고 True를 반환한다.

bouncy number가 맞다면 bouncyCnt를 하나 증가시키고 전체 숫자에서 bouncyCnt의 비율을 구한다.
