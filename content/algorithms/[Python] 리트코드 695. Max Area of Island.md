---
title: "[Python] 리트코드 695. Max Area of Island"
date: '2021-10-18'
---

[https://leetcode.com/problems/max-area-of-island/](https://leetcode.com/problems/max-area-of-island/)

[Max Area of Island - LeetCode](https://leetcode.com/problems/max-area-of-island/)

이중 배열 grid에 저장된 값 중 0은 물을 의미하고 1은 섬을 의미
1이 위아래 양옆으로 붙어있다면 같은 섬
한 칸 = 이 섬의 면적 1이라고 할 때 가장 넓은 섬의 면적을 리턴

이중 배열을 for문으로 한 칸씩 확인해서 그곳이 땅이라면(값이 1이면) 해당 섬의 면적에 +1을 하고 그 위치를 기준으로 위, 아래, 양 옆을 확인한다.
이때 재귀를 사용해 확인하는데 확인하려는 곳이 grid의 범위를 벗어나지 않는지, 이미 확인한 곳인지를 체크한다.
이미 확인한 곳을 다시 확인해서 중복되지 않도록 방문한 곳을 저장해야 한다.
각 섬의 면적을 구했으면 그 값을 배열에 저장하고 마지막에 그 값 중 가장 큰 값을 리턴한다.

\- 맨 왼쪽 위의 땅을 시작점으로 거기의 네 면을 재귀로 확인
\- 방문한 적 있으면 pass
\- 처음 방문이면 섬 면적 +1 하고  다 확인했으면 최종 땅 면적에 저장

```python
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        totalLandCnt = [0]  # 각 섬의 땅 갯수들
        width = len(grid[0])
        height = len(grid)
        visited = [ [False]*width for i in range(height) ]
        def checkIsLand(i, j):
            cnt = 0
            if grid[i][j] == 1 and not visited[i][j]:
                visited[i][j] = True
                cnt += 1
                if i > 0:
                    up = checkIsLand(i-1,j)
                    cnt += up
                if j > 0:
                    left = checkIsLand(i,j-1)
                    cnt += left
                if i+1 < height:
                    under = checkIsLand(i+1,j)
                    cnt += under
                if j+1 < width:
                    right = checkIsLand(i,j+1)
                    cnt += right
                return cnt
            return cnt

        for i in range(height):
            for j in range(width):
                if grid[i][j] == 1:
                    if not visited[i][j]:
                        result = checkIsLand(i,j)
                        totalLandCnt.append(result)  # 재귀로 얻은 땅의 갯수 저장

        return max(totalLandCnt)
```
