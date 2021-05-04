---
title: "[Python] 프로그래머스 : 큰 수 만들기(탐욕법)"
date: '2021-05-04'
---

[programmers.co.kr/learn/courses/30/lessons/42883](https://programmers.co.kr/learn/courses/30/lessons/42883)

[코딩테스트 연습 - 큰 수 만들기](https://programmers.co.kr/learn/courses/30/lessons/42883)

문자열 형식으로 된 숫자 number와 그 숫자에서 몇 개를 제외할지를 입력받아서 결과를 리턴해주는 프로그램을 짜는 문제이다.

맨 처음에 생각한 방법은 index를 이용해서 푸는 방법이었다.

```python
def solution(number, k):
    answer = ''
    numberList = []
    leng = len(number)
    listLen = leng - k
    list = []
    startIdx = 0
    for i in number:
        numberList.append(i)
    for i in range(0, listLen):
        list.append(-1)
    for i in range(0, len(list)):
        a = numberList[startIdx:leng-len(list)+1]
        maxNum = max(a)
        list[i] = maxNum
        answer = answer + maxNum
        startIdx = startIdx + a.index(maxNum)
        numberList.pop(startIdx)

    return answer

number = "1924"
k = 2

print(solution(number, k))
```

이 방법은 계속 수정했지만 런타임 에러 때문에 결국 포기하였고 탐욕 법이라는 주제에 맞춰 풀기로 했다.

탐욕 법을 적용한 첫 번째 방법은 number를 리스트로 저장하는 방법이고 두 번째는 문자열 그대로 사용하는 방법이다.

첫 번째 방법은 number를 리스트로 만들어줬다가 마지막에 다시 문자열로 합치는 과정을 거쳐야 하고 두 번째 방법은 슬라이싱 할 때 리스트를 계속 생성해야 돼서 효율성이 떨어진다는 단점이 있다.

```python
def solution(number, k):
    answer = ''
    numberList = []
    abandonCnt = 0
    for i in number:
        numberList.append(i)
    j = 0
    while abandonCnt < k:
        if numberList[j] < numberList[j+1]:
            abandonCnt = abandonCnt + 1
            j = 0
            continue
        else:
            j = j + 1
    answer = ''.join(numberList)
    return answer

number = "1924"
k = 2

print(solution(number, k))
```

```python
def solution(number, k):
    answer = ''
    abandonCnt = 0
    j = 0
    while abandonCnt < k:
        if number[j] < number[j+1]:
            number = number[:j] + number[j+1:]
            j = 0
            abandonCnt = abandonCnt + 1
            continue
        else:
            j = j + 1
    answer = number
    return answer
```

로직은 둘 다 동일하다.

버리는 숫자의 개수가 k가 될 때까지 반복문을 돌리고 그 반복문 안에서 number의 \[i\]와 \[i+1\]을 비교하여 \[i+1\]이 크다면 \[i\]를 버린다.

근데 예외처리가 덜 되었는지 테스트 8, 10, 12에서 런타임 에러가 난다.
아마 number에서 뒤로 갈수록 숫자가 작아지는 경우엔 abandonCnt가 증가되지 않기 때문에 반복문이 계속 도는 것 같다.

이 경우를 처리하려면 기존 로직을 반쯤 뒤엎어야 할 것 같다.
