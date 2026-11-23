---
title: "[Python] 리트코드 1567. Maximum Length of Subarray With Positive Product (누적 곱셈)"
date: '2021-10-25'
---

[https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)

[Maximum Length of Subarray With Positive Product - LeetCode](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)

이 문제는 [https://leetcode.com/problems/maximum-product-subarray/](https://leetcode.com/problems/maximum-product-subarray/) 문제의 응용 버전이다.

Maximum Product Subarray는 subarray의 요소를 곱했을 때 만들 수 있는 가장 큰 수를 구하는 문제였다.

이 문제를 푸는 방법을 간략히 정리하자면

 - 반복문에서 누적 곱셈의 max값과 min값을 저장한다.

 - max값, min값 여기에 nums\[i\]의 값까지 세 가지를 비교해서 가장 큰 것을 max로 갱신하고 가장 작은 값은 min으로 갱신한다.

 - 곱셈은 마이너스 부호를 만나면 max값이 min값이 되고 min값이 max값이 되기 때문에 최고값과 최솟값을 둘 다 계속 가지고 있는 것이다.

그럼 이 풀이를 참고해서 문제를 풀어보자.

여기서 알아야 하는 건 최대 곱셈 값이 아닌 곱셈이 양수 값이 되는 subarray의 최대 개수이니까 실제 곱셈을 할 필요는 없다.

그럼 plus인 숫자 개수와 minus인 숫자 개수를 따로 가지고 있자.

반복문을 돌며 만난 nums\[i\]가 마이너스이면 이 값을 누적 곱셈에 곱해줬을 때 곱셈 값이 plus에서 minus로 바뀌고 곱셈 값이 minus였다면 plus로 바뀐다.

예를 들어 지금까지의 subarray가 \[-1,2,3\]으로 곱셈 결과는 마이너스이고 plus:2개(=결과를 plus로 만드는 숫자가 2개) minus:3개(=결과를 minus로 만드는 숫자가 3개) 일 때 -1을 만났다면 이 숫자로 인해 곱셈 결과는 플러스로 바뀌고 plus:4, minus:3으로 바뀐다. (앞전의 plus+1이 minus로, minus+1이 plus가 됨)

여기서 또 2라는 숫자를 만났다고 해보자. 그럼 plus와 minus에 각각 +1씩 해주어서 plus:5, minus:4가 된다.

여기서 nums가 끝난다면 답은 plus들의 최댓값인 5이다.

이 계산에서 예외가 있다면 아직 plus개수가 0이거나 minus개수가 0인 경우다.

minus개수가 0 이란 건 nums에서 아직 마이너스 숫자를 만나지 않았다는 뜻인데 그럼 값이 반전되어봤자 플러스로 바뀔 숫자가 없다는 뜻이니까(전부 마이너스로 바뀔 뿐) 이때는 minus에 그냥 0을 넣어준다.

nums\[i\]가 0일 경우에는 곱셈 결과가 무조건 0이 되니까 모든 값들을 0으로 초기화시켜주고 다시 계산을 시작한다.

ex1)

&lt;table style="border-collapse: collapse; width: 45.5518%; height: 60px;" border="1" data-ke-align="alignLeft" data-ke-style="style12">&lt;tbody>&lt;tr style="height: 20px;">&lt;td style="width: 14.2857%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">nums&lt;/span>&lt;/td>&lt;td style="width: 9.74884%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">-1&lt;/span>&lt;/td>&lt;td style="width: 9.93791%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 9.88233%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 9.80439%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">-4&lt;/span>&lt;/td>&lt;td style="width: 10.1269%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">5&lt;/span>&lt;/td>&lt;td style="width: 10.1269%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">-6&lt;/span>&lt;/td>&lt;/tr>&lt;tr style="height: 20px;">&lt;td style="width: 14.2857%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">plus&lt;/span>&lt;/td>&lt;td style="width: 9.74884%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">0&lt;/span>&lt;/td>&lt;td style="width: 9.93791%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 9.88233%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 9.80439%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">4&lt;/span>&lt;/td>&lt;td style="width: 10.1269%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">5&lt;/span>&lt;/td>&lt;td style="width: 10.1269%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">5&lt;/span>&lt;/td>&lt;/tr>&lt;tr style="height: 20px;">&lt;td style="width: 14.2857%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">minus&lt;/span>&lt;/td>&lt;td style="width: 9.74884%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 9.93791%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 9.88233%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 9.80439%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 10.1269%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">4&lt;/span>&lt;/td>&lt;td style="width: 10.1269%; height: 20px;">&lt;span style="font-family: 'Nanum Gothic';">6&lt;/span>&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

ex2)

&lt;table style="border-collapse: collapse; width: 55.4374%; height: 112px;" border="1" data-ke-align="alignLeft" data-ke-style="style12">&lt;tbody>&lt;tr>&lt;td style="width: 12.5%;">&lt;span style="font-family: 'Nanum Gothic';">nums&lt;/span>&lt;/td>&lt;td style="width: 8.8434%;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 8.68443%;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 9.32027%;">&lt;span style="font-family: 'Nanum Gothic';">-1&lt;/span>&lt;/td>&lt;td style="width: 8.85302%;">&lt;span style="font-family: 'Nanum Gothic';">-3&lt;/span>&lt;/td>&lt;td style="width: 9.27058%;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 8.88001%;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 8.76114%;">&lt;span style="font-family: 'Nanum Gothic';">-5&lt;/span>&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 12.5%;">&lt;span style="font-family: 'Nanum Gothic';">plus&lt;/span>&lt;/td>&lt;td style="width: 8.8434%;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 8.68443%;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 9.32027%;">&lt;span style="font-family: 'Nanum Gothic';">0&lt;/span>&lt;/td>&lt;td style="width: 8.85302%;">&lt;span style="font-family: 'Nanum Gothic';">4&lt;/span>&lt;/td>&lt;td style="width: 9.27058%;">&lt;span style="font-family: 'Nanum Gothic';">5&lt;/span>&lt;/td>&lt;td style="width: 8.88001%;">&lt;span style="font-family: 'Nanum Gothic';">6&lt;/span>&lt;/td>&lt;td style="width: 8.76114%;">&lt;span style="font-family: 'Nanum Gothic';">4&lt;/span>&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 12.5%;">&lt;span style="font-family: 'Nanum Gothic';">minus&lt;/span>&lt;/td>&lt;td style="width: 8.8434%;">&lt;span style="font-family: 'Nanum Gothic';">0&lt;/span>&lt;/td>&lt;td style="width: 8.68443%;">&lt;span style="font-family: 'Nanum Gothic';">0&lt;/span>&lt;/td>&lt;td style="width: 9.32027%;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 8.85302%;">&lt;span style="font-family: 'Nanum Gothic';">1&lt;/span>&lt;/td>&lt;td style="width: 9.27058%;">&lt;span style="font-family: 'Nanum Gothic';">2&lt;/span>&lt;/td>&lt;td style="width: 8.88001%;">&lt;span style="font-family: 'Nanum Gothic';">3&lt;/span>&lt;/td>&lt;td style="width: 8.76114%;">&lt;span style="font-family: 'Nanum Gothic';">7&lt;/span>&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

예시처럼 num이 마이너스이면 plus와 minus를 서로 바꿔준다.

그리고 매 회마다 plus값을 nums에 저장해주고 max(nums)를 return 해준다.

```python
class Solution:
    def getMaxLen(self, nums: List[int]) -> int:
        plus = 0
        minus = 0
        for i, num in enumerate(nums):
            if num == 0:
                plus = 0
                minus = 0
                nums[i] = plus
            elif num > 0:
                plus += 1
                minus += 1 if minus > 0 else 0
                nums[i] = plus
            elif num < 0:
                plus, minus = minus, plus
                plus += 1 if plus > 0 else 0
                minus += 1
                nums[i] = plus
        return max(nums)
```
