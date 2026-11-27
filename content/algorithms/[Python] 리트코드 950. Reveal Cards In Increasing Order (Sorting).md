---
title: "[Python] 리트코드 950. Reveal Cards In Increasing Order (Sorting)"
created: '2021-08-09'
---

[https://leetcode.com/problems/reveal-cards-in-increasing-order/submissions/](https://leetcode.com/problems/reveal-cards-in-increasing-order/submissions/)

[Reveal Cards In Increasing Order - LeetCode](https://leetcode.com/problems/reveal-cards-in-increasing-order/submissions/)

\==문제==

카드 덱이 배열로 주어질 때 다음과 같은 순서로 카드를 뒤집을 것이다.

 1. 덱의 제일 위 카드를 뒤집는다.

 2. 그다음 카드는 뒤집지 않고 제일 바닥에 끼워 넣는다.

 3. 그다음은 1로 돌아가서 덱이 없어질 때까지 반복한다.

카드를 뒤집어서 나오는 숫자가 오름차순으로 정렬되려면 어떤 순서로 덱이 배치되어야 하는지 구하는 문제이다.

\==풀이==

문제에 나온 예시처럼 \[2,13,3,11,5,17,7\] 같은 순서로 덱이 배열되어 있다면 맨 윗 장 카드인 2를 뒤집는다.

\[**0**,13,3,11,5,17,7\]

그다음 카드인 13은 덱의 맨 밑으로 갈 테니 13의 다음 카드인 3을 뒤집는다.

\[**0**,13,**0**,11,5,17,7\]

그다음 카드인 11은 덱의 맨 밑으로 가고 11의 다음 카드인 5를 뒤집는다.

\[**0**,13,**0**,11,**0**,17,7\]

이 과정을 반복하면 \[**0**,13,**0**,11,**0**,17,**0**\] -> \[**0**,13,**0**,**0**,**0**,17,**0**\] -> \[**0**,****0****,**0**,****0****,**0**,17,**0**\] -> \[**0**,******0******,**0**,****0****,**0**,****0****,**0**\] 같은 순서로 카드를 뒤집는다.

여기서 규칙을 알아낼 수 있는데 빈 위치는 고려하지 않은 채 카드가 있는 곳만 두 칸씩 건너뛰면서 카드를 뒤집는다.

우리는 덱 배열을 만드는 것이 목적이니까 카드를 꺼내는 것과 반대로 0으로 채워진 배열에 같은 순서대로 카드를 끼워 넣으면 된다.

변수 i는 덱의 위치를 나타낼 것이고 변수 x는 (카드가 채워지지 않은) 빈칸을 두 칸 지났는지 확인할 때 사용할 것이다.

i를 1씩 증가시키면서 빈칸을 한 번 지났다면 x를 1로 바꾼다.

그러면 다음 루프에서 현재 위치가 빈칸이면서 x가 1인 것을 확인하고 카드를 넣는다.

그러고 다시 x를 0으로 바꾼다.

i가 덱의 길이를 넘어갔다면 다시 처음으로 돌아가서 반복한다.

\==코드==

```python
class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        length = len(deck)
        answer = [0] * length

        deck.sort(reverse=True)

        i = 0
        isPassOnce = True  # 빈 칸 한 번 건너뛰었는지 체크하는 용도
        while len(deck) > 0:
            if answer[i] == 0:
                if isPassOnce == True:
                    answer[i] = deck.pop()
                    isPassOnce = False
                else:
                    isPassOnce = True

            i += 1
            if i > length - 1:
                i = length - i

        return answer
```
