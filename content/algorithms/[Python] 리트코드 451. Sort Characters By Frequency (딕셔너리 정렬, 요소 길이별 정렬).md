---
title: "[Python] 리트코드 451. Sort Characters By Frequency (딕셔너리 정렬, 요소 길이별 정렬)"
created: '2021-08-08'
---

[https://leetcode.com/problems/sort-characters-by-frequency/](https://leetcode.com/problems/sort-characters-by-frequency/)

[Sort Characters By Frequency - LeetCode](https://leetcode.com/problems/sort-characters-by-frequency/)

\==문제==

알파벳 문자열이 주어졌을 때 정렬하는 문제이다.

첫 번째 정렬 조건은 반복되는 횟수가 많은 순서이고 두 번째 정렬 조건은 알파벳 순서대로 정렬하면 된다.

\==풀이==

방법은 아주 간단하다.

딕셔너리에 (key:알파벳, value:반복 횟수)로 데이터를 저장하고 value로 내림차순 정렬을 하면 끝이다.

그 내림차순 정렬한 데이터를 key\*value해서 스트링 형태로 저장하면 답이 나온다.

[2021.04.29 - \[알고리즘\] - \[Python\] 2019 카카오 공채1차 코딩테스트 : 실패율](https://bomoto.tistory.com/14)

[Python 2019 카카오 공채1차 코딩테스트 : 실패율](https://bomoto.tistory.com/14)

이 문제를 풀 때 사용했던 딕셔너리 밸류로 정렬하는 코드를 여기서 다시 사용했다.

sorted(dict, key=lambda x: dict\[x\], reverse=True)  이 코드를 사용하면 value값 기준으로 정렬된 key값이 반환된다.

처음에는 알파벳을 횟수로 저장하지 않고 예를 들어 b가 3번, a가 두 번 나온다면 저장할 때부터 \['bbb', 'aa'\]와 같이 저장해서 마지막에 요소의 length로 정렬하는 방법도 생각했었다.

하지만 이 방법은 알파벳이 나오면 그 알파벳이 이미 저장되어 있는지 체크해야 하는데 그 부분이 번거로워서 포기했다.

여기서도 이전에 문제를 풀 때 사용했던 코드를 다시 사용할 생각이었다.

[2021.07.19 - \[알고리즘\] - \[Python\] 리트코드 1048. Longest String Chain (Array)](https://bomoto.tistory.com/36)

[Python 리트코드 1048. Longest String Chain (Array)](https://bomoto.tistory.com/36)

sorted(str, key=len)  이 코드로 요소들을 길이별로 정렬할 수 있다.

\==코드==

```python
class Solution:
    def frequencySort(self, str: str) -> str:
        sList = list(str)
        sDict = {}
        answer = ''

        sList.sort()  # 일단 한 번 정렬
        for s in sList:
            if s in sDict:
                sDict[s] += 1
            else:
                sDict[s] = 1

        sort = sorted(sDict, key=lambda x: sDict[x], reverse=True)  # 밸류 기준 desc

        for s in sort:
            cnt = sDict[s]
            answer += s*cnt

        return answer
```
