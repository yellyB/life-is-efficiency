---
title: "[Python] 리트코드 1476번 : Subrectangle Queries (Array)"
date: '2021-06-02'
---

[https://leetcode.com/problems/subrectangle-queries/](https://leetcode.com/problems/subrectangle-queries/)

[Subrectangle Queries - LeetCode](https://leetcode.com/problems/subrectangle-queries/)

SubrectangleQueries, getValue, updateSubrectangle 3가지 함수를 구현하면 된다.

SubrectangleQueries는 2차원 배열로 초기의 행렬 데이터를 설정한다.
getValue는 2차원 배열에서 해당하는 좌표 값을 반환한다.
updateSubrectangle은 현재 행렬에서 (row1, col1)가 왼쪽 위, (row2, col2) 위치를 오른쪽 아래인 사각형으로 설정하고
그 사각형 안의 모든 값을 newValue로 바꾼다.

```python
class SubrectangleQueries:

	def __init__(self, rectangle: List[List[int]]):
        self.rectangle = rectangle

	def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:
        for row in range(row1, row2+1):
	        for col in range(col1, col2+1):
		        self.rectangle[row][col] = newValue

	def getValue(self, row: int, col: int) -> int:
        return self.rectangle[row][col]
```

SubrectangleQueries는 클래스 생성자인 \_\_init\_\_로 rectangle에 초기값을 설정해준다.
