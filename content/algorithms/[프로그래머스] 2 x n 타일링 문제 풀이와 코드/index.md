---
title: "[프로그래머스] 2 x n 타일링 문제 풀이와 코드"
date: '2023-01-10'
---

[https://school.programmers.co.kr/learn/courses/30/lessons/12900?language=python3#](https://school.programmers.co.kr/learn/courses/30/lessons/12900?language=python3#)

[프로그래머스](https://programmers.co.kr/)

![](./1.png)

### \[풀이방법\]

타일 크기는 2x1이기 때문에 결국 가로길이인 n에서 1과 2를 조합한 경우의 수를 구하는 문제나 마찬가지이다.

n=0인 경우는 타일을 배치할 수는 없지만 경우의 수로 따졌을 때는 타일이 0개 배치된 한 가지 방법이 있다.

n=1인 경우는 타일을 세로로 배치하는 한 가지 방법밖에 없다.

n=2는 가로와 세로 배치가 모두 가능한데, 세로배치 같은 경우는 n=1의 경우에 새로운 타일을 세로로 배치하는 한 가지가 있고 가로배치는 가로길이 2칸을 차지해야 하기 때문에 n=0의 경우에 가로배치하는 한 가지 경우가 있어서 n=2는 총 두 가지 경우의 수가 있다.

여기서 규칙을 발견할 수 있는데

n의 경우의 수는 곧 n-1이었던 모든 경우에 세로로 타일을 배치하는 경우의 수와 n-2의 모든 경우에 가로로 타일을 배치하는 경우의 수를 더한 값이다.

### \[코드\]

처음에는 탑다운 방식을 생각했는데 리턴값이 크다 보니 내부 dp함수에서 리턴할 때마다 값을 나눠줘야 했다.

테스트케이스는 통과했지만 코드 제출을 했을 때 전부 통과가 안되었다.

depth가 깊어지면 매번 나누어져야 해서 속도 이슈가 있는 것으로 추측된다.

&lt;top-down>

```python
def solution(n):
    answer = 0
    mod = 10**9+7

    def dp(n):
        res = 0
        if n == 0:
            return 1
        if n >= 2:
            res += dp(n-2)
        if n >= 1:
            res += dp(n-1)
        return res

    return dp(n) % mod
```

그래서 메모이제이션을 하는 방식으로 수정하였다.

값을 저장할 배열을 만들어서 bottom-up 방식으로 코드를 짰다.

top-down방식과 로직은 같은데, 역시 bottom-up 풀이는 코드 제출 시 모두 통과할 수 있었다.

&lt;bottom-up>

```python
def solution(n):
    answer = 0
    mod = 10**9+7
    dp = [0] * (n+1)

    dp[0] = 1
    dp[1] = 1

    for i in range(2, n+1):
        dp[i] = (dp[i-2] + dp[i-1]) % mod

    return dp[n]
```
