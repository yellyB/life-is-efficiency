---
title: "[Python] 리트코드 983 : Minimum Cost For Tickets (DP)"
created: '2021-06-18'
---

[https://leetcode.com/problems/minimum-cost-for-tickets/submissions/](https://leetcode.com/problems/minimum-cost-for-tickets/submissions/)

[Minimum Cost For Tickets - LeetCode](https://leetcode.com/problems/minimum-cost-for-tickets/submissions/)

\==문제==

days에 365일 중에 어떤 날짜에 여행할지 저장되어있다.

여행 티켓은 1일권, 7일권, 30일권 세 종류가 있는데 이 가격 정보는 costs에 차례로 들어있다.

어떤 날짜에 며칠권을 사야 가장 적은 돈으로 여행을 할 수 있는지 묻는 문제이다.

\==접근방법==

총 365일이 있지만 내가 계획한 여행 날짜의 가장 마지막 날까지만 가격을 확인하면 되기 때문에 먼저 lastTravelDay를 구한다.

1일~lastTravelDay까지 반복문을 돌려서 해당 날짜가 여행 계획 날짜가 아니라면 costOfDays에 전날 가격을 그대로 넣어준다.

여행하려는 날짜라면 일단은 전날 비용 +1일권 가격을 costOfDays에 저장한다.

그다음 7일 전에 7일권을 샀더라면 오늘 지불했을 비용을 구해서 바로 이전에 구한 1일권을 샀을 때의 가격과 비교한다.

둘 중 더 적은 비용을 택해서 costOfDays에 저장하고 이 과정을 계속 반복한다.

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        costOfDays = {0:0}  # 날짜:가격
        lastTravelDay = days[len(days)-1]  # 여행할 제일 마지막 날짜
        for day in range(1, lastTravelDay+1):
            if day in days:  # 여행하려는 날짜에 있는지?
                costOfDays[day] = costOfDays[day-1] + costs[0]  # 전날 비용에 1일권 가격 더함
                if day >= 7:
                    # 7일전에 7일권을 샀을때와 가격비교
                    costOfDays[day] = min(costOfDays[day], costOfDays[day - 7] + costs[1])
                if day >= 30:
                    # 30일전에 30일권 샀을때와 가격비교
                    costOfDays[day] = min(costOfDays[day], costOfDays[day - 30] + costs[2])
            else:
                costOfDays[day] = costOfDays[day-1]
        return costOfDays[lastTravelDay]
```

위의 코드는 통과하지 못했는데 **if day>=7:**과 **if** ****day>=30:**** 이 부분에서 문제가 생겼다.

7일 전에 7일권 티켓을 샀을 경우를 구해야 해서 day-7한 날짜를 알아야 하는데 day가 7보다 작을 경우에 costOfDays에서 인덱스를 찾지 못해 에러가 나기 때문에 저렇게 코드를 작성했었다.

그래서 저 코드는 7일 이전이면 7일권과 30일권을 샀을 경우를 체크해주지 못해서 1일권 가격보다 7일권 가격이 더 저렴할 경우에도 1일권을 구매한 걸로 처리가 되었다.

7일권을 체크할 때 7일 이전이라면 1일 차에 7일권을 구매한 것으로 가격을 비교해야 하기 때문에 이 경우에 그냥 건너뛰지 않고 costOfDays에서 0번째 인덱스 값과 비교하도록 수정했다.

\==최종 코드==

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        costOfDays = {0:0}  # 날짜:가격
        lastTravelDay = days[len(days)-1]  # 여행할 제일 마지막 날짜
        for day in range(1, lastTravelDay+1):
            if day in days:  # 여행하려는 날짜에 있는지?
                dayAgo = day - 1
                weeksAgo = day - 7 if day - 7 >= 0 else 0
                monthAgo = day - 30 if day - 30 >= 0 else 0
                costOfDays[day] = costOfDays[dayAgo] + costs[0]  # 전날 가격에 1일권 가격 더함
                costOfDays[day] = min(costOfDays[day], costOfDays[weeksAgo] + costs[1])  # 7일권 산 경우와 비교
                costOfDays[day] = min(costOfDays[day], costOfDays[monthAgo] + costs[2])  # 30일권 산 경우와 비교
            else:
                costOfDays[day] = costOfDays[day-1]
        return costOfDays[lastTravelDay]
```
