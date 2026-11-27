---
title: "[Python] 리트코드 309. Best Time to Buy and Sell Stock with Cooldown"
created: '2021-10-27'
---

[https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

[Best Time to Buy and Sell Stock with Cooldown - LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

이 문제는 \[121. Best Time to Buy and Sell Stock\] 이랑 \[122. Best Time to Buy and Sell Stock II\] 의 다음 단계라고 할 수 있다.

이 두 문제는 121: 총 1회만 사고팔 수 있음 / 122: 여러 번 사고팔 수 있음 의 조건일 때 가장 큰 이익을 내도록 하는 것이었다.

이번 문제는 여러 번 사고팔 수 있지만 팔고 난 바로 다음날은 cooldown 때문에 주식을 다시 사지 못한다는 조건이 추가로 붙는다.

**\[풀이\]**

전 문제를 풀 때는 어제-오늘의 가격만 비교하면 됐었다.

하지만 이번엔 cooldown을 생각해서 그저께-어제-오늘 총 3일의 경우를 생각해야 한다.

내가 오늘 주식을 사려고 마음먹었다면 어제는 반드시 아무런 행동도 하지 않은 cooldown날이어야만 한다.

그 말은 최소 그저께에는 주식을 팔았어야 한다는 뜻이다.

경우의 수를 따져서 최고의 잔고 상태를 알려면 max() 함수를 이용해 비교를 할 텐데 어떤 값을 비교할지 정해야 한다.

내가 취할 수 있는 행동은 buy와 sell 두 가지이다.

buy에는 오늘 사는 행위를 통해 얻는 최고의 이익을 뜻한다.

실제로 오늘 매수를 한 지 안 한지는 모른다.

어제 매수했던 경우가 더 이득이라면 어제의 잔고를 오늘 잔고로 갱신할 것이기 때문이다.

sell도 마찬가지이다.

**\[식 세우기\]**

sell을 먼저 살펴보자면 오늘 sell에는 아래 두 개의 경우 중 max값을 저장할 것이다.

1\. 어제의 sell(어제 매도를 했을지 안 했을지는 모른다. 단지 어제 파는 행위를 통해 얻을 수 있는 가장 큰 잔고 상태가 저장되어 있다.)

2\. 어제의 buy에 오늘 주식 가격을 더한 것 (팔았으니 그 가치만큼 +가 될 것이다.)

buy도 비슷하지만 이틀 전에 sell을 이용해 비교한다는 점이 다르다.

1\. 어제의 buy

2\. 그제의 sell에 오늘 주식 가격을 뺀 것 (샀으니 가격만큼 지불)

오늘을 i, 어제를 i-1, 그제를 i-2라고 해보자.

  sell = max( buy i-1 + todayPrice,   sell i-1 )

  buy = max( sell i-2 - todayPrice,   buy i-1 )

위와 같이 계산할 수 있다.

**\[추가 설명\]**

맨 처음엔 잔고에 아무것도 없기 때문에 파는 행위를 할 수 없다. (sell = 0)

그럼 buy만 구할 수 있는데 첫날의 가격만큼 지불해야 하니까 -prices\[0\]이 최초의 buy값이 된다.

마지막에 리턴하는 값은 buy(i), buy(i-1), sell(i), sell(i-1), sell(i-2) 중에 sell(i)가 되어야 한다.

최대 이득을 얻으려면 마지막에는 무조건 팔고 난 상태가 되어야 하기 때문이다.

**\[정리\]**

▶ 파는 경우는 최소 i-1 이전에 샀던 최적의 가격과 i에 판 가격을 이용해 이익을 구함

▶ 사는 경우는 cooldown 때문에 i에서 사려면 최소 i-2에서 팔았어야 함

▶ buy랑 sell에는 사는/파는 행위를 통한 내 잔고를 저장
▶ sell은 팔고 난 오늘의 내 잔고, sell1은 어제의 팔고 난 내 잔고, sell2는 그저께 팔고 난 잔고(buy도 동일)
▶ 맨 마지막에는 sell을 리턴(실제로 이득이 주어지는 것은 파는 행위를 통해서이니까)

\# 오늘 = i일 때
\# 사는 경우 : \[i-2에서 팔고 i에서 사는 경우\] \[i-1에 저장된 i-1에 사는 경우의 최댓값\]  => 두 가지 비교
\# 파는 경우 : \[i-1에서 산 걸 파는 경우\] \[i-1에 저장된 i-1에 파는 경우의 최댓값\] => 두 가지 비교

**\[코드\]**

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buy, buy1 = -prices[0], -prices[0]  # buy -> 맨 처음에는 일단 사야지 뭘 파니까 비용을 먼저 지불하기 때문에 무조건 마이너스다.
        sell, sell1, sell2 = 0, 0, 0  # sell1 -> i-1번째 판거 / sell2 -> i-2번째 판거
        for i in range(len(prices)):
            todayPrice = prices[i]
            buy = max(sell2 - todayPrice, buy1)  # 이틀전에 팔고난 잔고에 오늘 가격을 뺌 (샀으니까 빼줌)
            sell = max(buy1 + todayPrice, sell1)  # 어제 샀던 경우에 오늘가격 더하면 = 내잔고

            # 하루씩 밀어주기 (오늘은 어제로, 어제는 그제로 바꿈)
            buy1 = buy
            sell1, sell2 = sell, sell1

        return sell  # 마지막엔 판 상태의 잔고 리턴
```

또 다른 응용 문제: 714. Best Time to Buy and Sell Stock with Transaction Fee

[https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)
