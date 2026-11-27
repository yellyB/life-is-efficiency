---
title: "[Python] 리트코드 807:Max Increase to Keep City Skyline (Greedy)"
created: '2021-08-27'
---

[https://leetcode.com/problems/max-increase-to-keep-city-skyline/](https://leetcode.com/problems/max-increase-to-keep-city-skyline/)

[Max Increase to Keep City Skyline - LeetCode](https://leetcode.com/problems/max-increase-to-keep-city-skyline/)

도시의 skyline은 동서남북 각각의 방향에서 본 건물 외곽선이다.

이 skyline을 해치지 않는 선에서 건물 높이를 가능한 최대로 높인다고 할 때 추가할 수 있는 높이를 구하는 문제이다.

문제에서 제시한 예시를 살펴보자.

grid = \[\[3,0,8,4\], \[2,4,5,7\], \[9,2,6,3\], \[0,3,1,0\]\] 일 때 답은 gridNew = \[ \[8, 4, 8, 7\], \[7, 4, 7, 7\], \[9, 4, 8, 7\], \[3, 3, 3, 3\] \]가 된다.

&lt;초기 상태>

&lt;table style="border-collapse: collapse; width: 24.0698%; height: 183px;" border="1" data-ke-align="alignLeft">&lt;tbody>&lt;tr>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;td style="width: 25%; text-align: center;">0&lt;/td>&lt;td style="width: 25%; text-align: center;">8&lt;/td>&lt;td style="width: 25%; text-align: center;">4&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 25%; text-align: center;">2&lt;/td>&lt;td style="width: 25%; text-align: center;">4&lt;/td>&lt;td style="width: 25%; text-align: center;">5&lt;/td>&lt;td style="width: 25%; text-align: center;">7&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 25%; text-align: center;">9&lt;/td>&lt;td style="width: 25%; text-align: center;">2&lt;/td>&lt;td style="width: 25%; text-align: center;">6&lt;/td>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 25%; text-align: center;">0&lt;/td>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;td style="width: 25%; text-align: center;">1&lt;/td>&lt;td style="width: 25%; text-align: center;">0&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

&lt;답>

&lt;table style="border-collapse: collapse; width: 24.0698%; height: 183px;" border="1" data-ke-align="alignLeft">&lt;tbody>&lt;tr>&lt;td style="width: 25%; text-align: center;">8&lt;/td>&lt;td style="width: 25%; text-align: center;">4&lt;/td>&lt;td style="width: 25%; text-align: center;">8&lt;/td>&lt;td style="width: 25%; text-align: center;">7&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 25%; text-align: center;">7&lt;/td>&lt;td style="width: 25%; text-align: center;">4&lt;/td>&lt;td style="width: 25%; text-align: center;">7&lt;/td>&lt;td style="width: 25%; text-align: center;">7&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 25%; text-align: center;">9&lt;/td>&lt;td style="width: 25%; text-align: center;">4&lt;/td>&lt;td style="width: 25%; text-align: center;">8&lt;/td>&lt;td style="width: 25%; text-align: center;">7&lt;/td>&lt;/tr>&lt;tr>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;td style="width: 25%; text-align: center;">3&lt;/td>&lt;/tr>&lt;/tbody>&lt;/table>

이것을 보면 \[row\]\[col\]의 값은 그 row전체의 값 중 최댓값과 col전체의 값 중 최댓값 둘 중에 작은 값이란 걸 알 수 있다.

이중 반복문으로 간단하게 풀 수 있다.

첫 번째 col의 값들 중 최댓값을 구하려면 grid\[0\]\[0\], grid\[1\]\[0\], grid\[2,0\], grid\[3,0\]을 알아야 한다.

이 값을 구하기 위해 이중 반복문 사용해야 하는데 더 좋은 방법이 있을지 찾아보다가 내장 함수 zip을 알게 되었다.

파이썬 내장 함수 zip은 동일한 개수로 이루어진 자료형을 묶어줄 수 있다.

예를 들어 이렇게 name과 color를 1:1 매칭 시켜 알아서 새로운 배열을 만들어준다.

```python
name = ['apple','banana','avocado']
color = ['red','yellow','green']
newList = list(zip(name, color))
print(newList)  # 결과 : [('apple', 'red'), ('banana', 'yellow'), ('avocado', 'green')]
```

혹은 아래와 같이 딕셔너리로 사용할 수도 있다.

```python
name = ['apple','banana','avocado']
color = ['red','yellow','green']
dict = {}
for name, color in zip(name, color):
dict[name] = color
print(dict)  # 결과 : {'apple': 'red', 'banana': 'yellow', 'avocado': 'green'}
```

이 문제에서는 리스트의 모든 요소를 가져오는 \*list와 같이 사용하여 이중 배열을 인덱스 별로 다시 묶어주는 방식으로 사용했다.

```python
zipList = [[1,'a','가'],[2,'b','나'],[3,'c','다']]
newList = list(zip(*zipList))
print(newList)
# 결과 : [(1, 2, 3), ('a', 'b', 'c'), ('가', '나', '다')]
```

파이썬 내장 함수 zip으로 간단하게 col의 max값을 구할 수 있었다.

\==최종 코드==

```python
class Solution:
    def maxIncreaseKeepingSkyline(self, grid: List[List[int]]) -> int:
        cnt = 0
        maxRow = [max(i) for i in grid]  # row중 최고값
        maxCol = [max(j) for j in zip(*grid)]  # col중 최고값

        for i in range(len(grid)):
            for j in range(len(grid[0])):
                nowHeight = grid[i][j]
                highest = min(maxRow[i], maxCol[j])
                cnt += highest - nowHeight

        return cnt
```
