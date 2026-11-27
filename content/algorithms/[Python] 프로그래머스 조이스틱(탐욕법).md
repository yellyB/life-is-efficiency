---
title: "[Python] 프로그래머스 : 조이스틱(탐욕법)"
created: '2021-05-11'
---

프로그래머스에 올라온 NWERC 2010 (Northwestern Europe Programming Contest)의 문제

[programmers.co.kr/learn/courses/30/lessons/42860](https://programmers.co.kr/learn/courses/30/lessons/42860)

[코딩테스트 연습 - 조이스틱](https://programmers.co.kr/learn/courses/30/lessons/42860)

name으로 JAZ가 주어지면 AAA에서 JAZ로 알파벳을 변환시키는 탐욕 법 알고리즘을 짜는 문제이다.
옆 칸으로 이동하는 것과 알파벳을 A에서 하나씩 변환시키는 것에 조작 횟수 1씩을 소모한다.

예시 문제 JAZ같이 \[1\]번째가 A라면 어차피 초기값이 A이니까 바꿀 필요가 없다.

그럼 다음 Z를 바꿔야 하는데 오른쪽으로 2칸을 이동하는 것보다 왼쪽으로 1칸만 이동해서 \[2\]번째 자리로 바로 이동하는 것이 효과적이다.

따라서 A가 아닌 문자가 나올 때까지 오른쪽으로 이동한 것과 왼쪽으로 이동한 것의 조작 횟수 값을 비교해보면 된다.

조작 횟수 값이 적은 것이 효과적인 움직임이니까 그 방향으로 이동하고 이동한 후의 현재 위치는 다음번 반복문의 시작 위치로 설정한다.

그리고 초기값 AAA에서 JAZ로 바꾸는 상황을 묻는 문제이지만 JAZ에서 AAA로 변한다고 생각해도 답은 같다.

나는 처음에 문자열을 list에 저장할 때 A에서 해당 알파벳으로 바꾸는데 필요한 조작 횟수를 미리 계산하여 더해줬다.
그러면 이제 X축으로 이동하는 횟수만 구하면 되기 때문에 편하다.

```python
def gotoRight(list, startIdx):
    i = startIdx
    cnt = 0
    while cnt < len(list):
        i = i + 1
        if i == len(list):
            i = 0
            continue
        cnt = cnt + 1
        if list[i] != 'A':
            return cnt, i
    return cnt, i

def gotoLeft(list, startIdx):
    i = startIdx
    cnt = 0
    while cnt < len(list):
        i = i - 1
        if i == -1:
            i = len(list)
            continue
        cnt = cnt + 1
        if list[i] != 'A':
            return cnt, i
    return cnt, i

def solution(name):
    answer = 0
    rightCnt = 0 #오른쪽으로 이동, A아닌 문자가 나올때까지의 횟수
    leftCnt = 0
    startIdx = 0
    list = []

    for i in name:
        list.append(i)
        ascii = ord(i)
        if ascii < 78:
            answer = answer + ascii - 65
        else:
            answer = answer + 90 - ascii + 1  # A에서 Z로 갈때 한 칸 움직이니까 1더함

    while True:
        list[startIdx] = 'A'
        right = gotoRight(list, startIdx)
        left = gotoLeft(list, startIdx)
        rightCnt = right[0]
        leftCnt = left[0]

        if right[0] == len(list): #list가 전부A임
            return answer

        if rightCnt < leftCnt: #오른쪽으로 이동
            startIdx = right[1]
            answer = answer + right[0]
        else:
            startIdx = left[1]
            answer = answer + left[0]
    return answer

name = "JAZ" #11
print(solution(name))
```

시작 위치인 startIdx를 0으로 설정하고 list\[0\]을 A로 변경한다.(알파벳을 변경하는 횟수는 맨 처음에 다 계산했고 이미 시작 위치인 0에 와있기 때문)
함수 gotoRight와 gotoLeft로 다음번 변경할 문자 위치와 그 문자까지 가는데 필요한 조작 횟수를 반환한다.
둘 중 조작 횟수가 적은 방향을 택해서 해당 위치는 다음 반복문 시작 위치인 startIdx로 저장한 후 현재 위치를 A로 변경한다.
그리고 list가 전부 A로 바뀔 때까지 반복문을 실행한다.
