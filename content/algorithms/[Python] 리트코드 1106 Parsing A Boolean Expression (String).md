---
title: "[Python] 리트코드 1106 : Parsing A Boolean Expression (String)"
date: '2021-07-10'
---

[https://leetcode.com/problems/parsing-a-boolean-expression/](https://leetcode.com/problems/parsing-a-boolean-expression/)

[Parsing A Boolean Expression - LeetCode](https://leetcode.com/problems/parsing-a-boolean-expression/)

\==문제==

"!(f)" 같은 형태로 문자열이 주어졌을 때 그 연산자에 따라 NOT, AND, OR 연산을 한 결과를 반환하면 된다.

\==풀이==

먼저 NOT, AND, OR 연산을 할 함수를 각각 만든다.

그리고 함수에 어떤 값을 전달해줄지 정해야 하는데 함수가 언제 실행되게 할지부터 정해야 한다.

가장 안쪽에 있는 괄호를 먼저 계산해주어야 하는데 이때 DP알고리즘을 써도 되지만 나는 다른 방법으로 풀었다.

for문으로 문자열을 확인하면서 열린 괄호가 나온다면 그 위치를 저장한다. (이 값은 나중에 연산자를 결정하고 어떤 값을 연산해줄 건지를 정할 때 사용한다.)

그리고 닫힌 괄호가 나왔다면 이제 연산을 해 줄 차례이다.

닫힌 괄호가 나왔다면 그 짝이 되는 열린 괄호는 가장 최근에 저장되었던 위치일 것이다.

가장 최근 저장된 열린 괄호의 위치보다 바로 앞 위치가 연산자이고 현재 닫힌 괄호까지 연산하면 된다.

연산자에 따라 NOT, AND, OR함수로 열린 괄호의 idx와 닫힌 괄호의 idx를 보내준다.

함수에서 연산 결과가 리턴되면 연산 함수로 보내주었던 idx를 이용해서 \[연산자~닫힌 괄호\]를 연산 결과로 치환한다.

이 과정을 반복하다가 strList가 1이 된다면 반복문을 탈출하고 최종 결과를 리턴해준다.

여기서 idx가 끝까지 돌았는데도 strList.length가 1이 아닐 수도 있다.

그럴 경우에는 i를 0으로, 열린 괄호 위치가 저장된 isClsoe 두 가지를 초기화해주어서 처음부터 다시 반복해준다.

다음으로 연산 함수들을 살펴보자면 각 함수는 idx1과 idx2를 전달받는다.

strList\[idx1:idx2\]는 괄호 안의 값을 나타낸다.

예를 들어 expression이 &(f,t)라면 함수에는 "("의 위치인 1과 ")"의 위치인 5가 전달된 것이라서 strList\[idx1:idx2\] 는 (f,t 이다.

그 범위의 요소를 확인해서 ","가 아니라 "t"나 "f"이면 NOT, AND, OR연산을 해준다.

\==코드==

```python
class Solution:
    def parseBoolExpr(self, expression: str) -> bool:
        isClose = []  # 열린 괄호의 idx
        strList = list(expression)

        def strNot(idx1, idx2):
            if strList[idx1+1] == 't':
                return 'f'
            else:
                return 't'
            # return 't' if strList[idx1+1] == 'f' else 't'

        def strAnd(idx1, idx2):
            result = 't'
            for i in range(idx1+1, idx2):  # 괄호 안 t,f만 확인
                if strList[i] != ',':
                    if result == 't' and strList[i] == 't':
                        result = 't'
                    else:
                        result = 'f'
            return result

        def strOr(idx1, idx2):
            result = 'f'
            for i in range(idx1+1, idx2):
                if strList[i] != ',':
                    if result == 'f' and strList[i] == 'f':
                        result = 'f'
                    else:
                        result = 't'
            return result

        i = 0
        while 1 < len(strList):
            if strList[i] == '(':  # 연산이 시작된다면 그 위치 저장
                isClose.append(i)
            elif strList[i] == ')':  # 어떤 계산이 종료되었단 뜻. 열렸는데 안닫힌 마지막 괄호 위치 찾기
                notClosedLastIdx = isClose.pop()
                op = strList[notClosedLastIdx-1]
                if op == '!':
                    result = strNot(notClosedLastIdx, i)  # ex (f,t,f)
                elif op == '&':
                    result = strAnd(notClosedLastIdx, i)
                elif op == '|':
                    result = strOr(notClosedLastIdx, i)
                strList[notClosedLastIdx-1] = result
                del strList[notClosedLastIdx:i+1]
                i = notClosedLastIdx - 1
            i += 1
            if i == len(strList):  # 끝까지 다 돌았으면 다시 처음으로 ㄱㄱ
                isClose = []
                i = 0

        if strList[0] == 't':
            return True
        else:
            return False
```
