---
title: "[Python] 리트코드 216. Combination Sum III"
date: '2021-09-02'
---

[https://leetcode.com/problems/combination-sum-iii/](https://leetcode.com/problems/combination-sum-iii/)

[Combination Sum III - LeetCode](https://leetcode.com/problems/combination-sum-iii/)

\==문제==

1~9까지의 숫자를 k개 사용해서 n이 되는 조합을 찾는 문제이다.

각 숫자는 한 번씩만 사용할 수 있고 모든 조합 경우의 수를 리턴하면 된다.

이 문제는 전에 풀었던 문제가 한단계 업그레이드 된 버전이다.

  ▼풀이

[2021.07.12 - \[알고리즘\] - \[Python\] 리트코드 39. Combination Sum (Array)](https://bomoto.tistory.com/35)

[Python 리트코드 39. Combination Sum (Array)](https://bomoto.tistory.com/35)

이 전 문제와 차이점은 아래와 같다.

  1. 주어진 후보 숫자들 중에서 고르는 것이 아닌 1~9까지의 숫자를 사용함

  2. 한 번 사용한 숫자는 다시 사용할 수 없음

  3. 골라야하는 숫자의 갯수가 정해져있음

그래서 전에 푼 코드를 참고하여 문제를 풀었다.

dp함수 getNextElement에서 현재까지 고른 숫자 배열, 타겟 숫자, 인덱스를 받는다.

여기서 타겟 숫자는 문제에서 주어진 진짜 목표숫자에서 지금까지 고른 숫자를 뺀 값이다.

인덱스의 의미는 1~9까지 숫자를 한번씩만 사용할 수 있기때문에 1에서 9까지 반복문을 실행해 현재 이후 숫자만 사용하기 위한 것이다.

이 세 값들을 받아서 먼저 함수로 전달받은 인덱스부터 9까지 반복문을 돌린다.

반복문안에서 i번째 숫자를 골랐을 경우 타겟까지 남은 숫자 rest를 구한다.

1\. rest가 0보다 크다면 숫자를 추가적으로 골라야한다는 뜻이니 다시 dp함수를 실행한다.

2\. rest가 0보다 작아졌다면 타겟숫자를 넘어갔다는 뜻이니 함수를 종료한다.

3\. 반복문안에서 i번째 숫자를 골랐을 경우 타겟까지 남은 숫자가 0이라면 지금까지 고른 숫자들 합이 최종 타겟이다.

하지만 선택한 숫자들을 정답에 추가하기 전에 k개의 숫자만 골라야 한다는 조건이 있으니 마지막으로 배열의 개수까지 확인해서 정답에 추가한다.

\==코드==

```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        targetLen = k
        targetNum = n
        answer = []
        def getNextElement(nums, target, i):
            for n in range(i, 10):
                temp = nums[:]
                rest = target - n  # 타겟까지 남은 숫자
                length = len(temp)

                if rest == 0:
                    if length == targetLen-1:  # 고른 숫자의 개수 확인
                        temp.append(n)
                        answer.append(temp)

                elif rest > 0:  # 아직 target에 도달 못했단 뜻
                    if length < targetLen:
                        temp.append(n)
                        getNextElement(temp, rest, n+1)

                else: # target 넘어가버림
                    return

        getNextElement([], targetNum, 1)

        return answer
```
