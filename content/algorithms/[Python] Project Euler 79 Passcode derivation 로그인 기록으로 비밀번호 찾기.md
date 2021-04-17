---
title: "[Python] Project Euler 79 : Passcode derivation 로그인 기록으로 비밀번호 찾기"
date: '2021-04-17'
---

[projecteuler.net/problem=79](https://projecteuler.net/problem=79)

[Problem 79 - Project Euler](https://projecteuler.net/problem=79)

79번 문제)

> A common security method used for online banking is to ask the user for three random characters from a passcode. For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.
> The text file, [keylog.txt](https://projecteuler.net/project/resources/p079_keylog.txt), contains fifty successful login attempts.
> Given that the three characters are always asked for in order, analyse the file so as to determine the shortest possible secret passcode of unknown length.

사용자가 로그인할 때마다 비밀번호에서 랜덤으로 3가지 숫자를 뽑아내어 keylog에 저장한다.

그 세 숫자의 순서는 동일하다.

50개의 log를 보고 비밀번호를 찾는 문제이다.

```python
f = open("keylog.txt", 'r')
lines = f.readlines()

passcode = []

for line in lines:
    for i in line:
        while i not in passcode:
            passcode.append(i)

    for j in range(0, 2):
        firstIdx = passcode.index(line[j])
        secondIdx = passcode.index(line[j + 1])
        if firstIdx > secondIdx:
            temp = passcode[firstIdx]
            passcode[firstIdx] = passcode[secondIdx]
            passcode[secondIdx] = temp

print(passcode)
f.close()
```

keylog에서 한 줄씩 읽어와서 반복문을 실행한다.

그 줄의 세 숫자가 passcode에 있는지 확인해서 없으면 passcode에 추가한다.

읽어온 세 숫자를 num\[0\], num\[1\], num\[2\] 라고 할 때, 먼저 passcode에서의 num\[0\]과 num\[1\]의 위치를 확인한다.

만약 num\[0\]의 위치가 num\[1\]보다 뒤쪽이면 passcode에서 num\[0\]의 위치를 한 칸씩 앞으로 이동한다.

num\[0\]과 num\[1\], num\[1\]과 num\[2\] 두 가지 경우만 비교하면 되기 때문에 반복문은 2회만 실행한다.

결과는 73162890이다.
