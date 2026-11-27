---
title: "[Python] 리트코드 1850 : Minimum Adjacent Swaps to Reach the Kth Smallest Number (String)"
created: '2021-07-03'
---

[https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number/](https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number/)

[Minimum Adjacent Swaps to Reach the Kth Smallest Number - LeetCode](https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number/)

\==문제==

num이 주어질 때 그 num을 구성하는 숫자들로 만들 수 있는 num보다 큰 숫자들을 wonderful 하다고 말한다.

그 wonderful integer 중에 k번째로 작은 숫자를 구하고 그 숫자를 얻으려면 num에서 최소 몇 번을 swap 해야 하는지 구하는 문제이다.

\==접근방법==

함수1) num의 다음번 wonderful integer를 찾음

함수2) 함수 1을 k번 실행시켜서 나온 k번째 num이 처음의 num에서 몇 번 스왑해야 하는지 구함 => 최종 답

위의 함수 두 개를 만들어서 답을 구하였다.

함수 1은 num으로 조합할 수 있는 다음번 큰 숫자를 구해서 새로운 리스트에 저장할 것이다.

예시로 num=12987이라면 함수 1 실행 결과는 17289이다.

이 예시를 살펴보면 num\[2:4\]인 9,8,7은 이 세 숫자들을 사용해 987보다 더 큰 숫자를 만들 수 없다.

여기서 어떤 숫자가 이미 내림차순이라면 더 이상 다음 값을 만들 수 없다는 걸 알 수 있다.

그렇다면 내림차순에 포함되지 않는 num\[1\]인 2를 num\[2:4\]중 가장 작은 값으로 대체해준다.

(여기서 가장 작은 값은 num\[1\]보다 커야한다. 그래야 현재 num보다 큰 숫자가 만들어지기 때문이다.)

그리고 wonderful integer중에 가장 작은 값이 다음번 num이 되므로 대체해준 7 뒤의 값은 오름차순 정렬을 해주면 17289가 나온다.

이렇게 k번 반복해서 k번째 순열을 구한다.

함수2에서는 함수1에서 구한 newNum과 처음에 주어진 num을 0번 인덱스부터 비교해서 몇 번 스왑 했는지 cnt를 구할 것이다.

num=12987, newNum=17289 라면 i=1일때 num\[1\] != newNum\[1\]이기 때문에 스왑이 필요하다는 뜻이다.

num\[i\]가 newNum에서 몇 번째 인덱스인지 찾으면 그 인덱스 차이가 스왑 해주어야 하는 횟수가 된다.

num\[1\]인 2가 newNum\[2\]에 있으니까 인덱스2번 - 인덱스1번 = 1회라는 결론이 나온다.

그럼 newNum을 num과 맞춰주기 위해 newNum\[1\]에 newNum\[2\]값을 넣어주어 12789를 만든다.

이 과정을 반복하면 원하는 결과를 얻을 수 있다.

\==코드==

```python
# 함수1)다음번 큰 숫자를 찾는 함수
# 함수2)k번 실행시켜서 나온 함수1결과가 주어진 num에서 몇번 바꿔야하는지=>최종 답
class Solution:
    def getMinSwaps(self, num: str, k: int) -> int:
        numList = list(num)

        def getNextGreaterValue():
            # [i~끝]이 내림차순이면 그 범위는 더이상 스왑할 숫자가 없단 뜻
            # 그러면 [i-1]이 [i]보다 작다면 [i-1]이 [:i]중에서 가장 작은 숫자로 스왑되어야함
            # 그리고 그 뒤 숫자들은 오름차순 정렬되어야함
            i = len(num)-1
            while i > 0:
                if numList[i-1] < numList[i]:
                    # 이제 num[i-1]이랑 그 뒷 리스트 중 min값을 스왑해야하는데
                    # min값이 num[i-1]보다 커야지만 num보다 큰 숫자가 만들어짐
                    # 내림차순으로 되어있으니까 맨 뒤부터 확인해보면 됨
                    j = len(num)-1
                    while j > 0:
                        if numList[i-1] < numList[j]:
                            numList[i-1], numList[j] = numList[j], numList[i-1]
                            numList[:] = numList[:i]+sorted(numList[i:])
                            return
                        else:
                            j -= 1
                i -= 1

        def getAnswer():
            # 주어진num의 [i]가 바뀐리스트 몇번째에 있는지 확인함
            # 두 인덱스 차이가 스왑해야하는 횟수임(nunList[?]에서 num[i]까지 가려면 스왑해야하는 횟수니까)
            cnt = 0
            for i in range(len(num)):
                if num[i] != numList[i]:  # 서로 같은 위치의 데이터가 다르면 같은거 찾으러 ㄱㄱ
                    j = i+1
                    while j<len(numList):
                        if num[i] == numList[j]:
                            temp = numList.pop(j)
                            numList.insert(i,temp)
                            cnt = cnt+(j-i)
                            break
                        j += 1
            return cnt

        while k > 0:
            getNextGreaterValue()  # k번 만큼 다음 큰 수 찾기를 실행함
            k = k - 1

        return getAnswer()
```
