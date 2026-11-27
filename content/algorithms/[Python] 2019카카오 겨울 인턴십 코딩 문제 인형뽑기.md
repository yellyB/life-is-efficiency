---
title: "[Python] 2019카카오 겨울 인턴십 코딩 문제 : 인형뽑기"
created: '2021-04-28'
---

[tech.kakao.com/2020/04/01/2019-internship-test/](https://tech.kakao.com/2020/04/01/2019-internship-test/)

[2019 카카오 개발자 겨울 인턴십 코딩 테스트 문제 해설](https://tech.kakao.com/2020/04/01/2019-internship-test/)

2019 카카오 겨울 인턴십 코딩 테스트 인형 뽑기 문제

▷ 이중 for문으로 인형을 뽑아야 하는 줄에서 처음 0이 아닌 숫자가 나올 때까지 반복한다.

(처음 0이 아닌 숫자 = 그 줄에서 제일 위에 있는 인형)

▷ board에 이 인형이 있었던 자리는 0으로 변경해 인형을 뽑은 처리를 해준다.

▷ 뽑은 인형은 basket에 담고 basket에 이미 인형이 들어있다면 바로 이전에 뽑은 인형과 비교해서 같다면 터뜨려준다.

\* basket\[-1\] => 방금 뽑은 인형

\* basket\[-2\] => 바로 전에 뽑은 인형

```python
def solution(board, moves):
    answer = 0
    basket = []

    for move in moves:
        for row in board:
            if row[move-1] != 0:  # 0이 아닐때(인형이 있을때)만 바구니에 담음
                doll = row[move - 1]  # 뽑은 인형
                row[move-1] = 0  # 뽑은 후엔 빈칸처리
                basket.append(doll)
                if len(basket)>1:
                    if basket[-2] == doll:  # 이전 인형 = 방금뽑은 인형?
                        answer = answer + 2
                        basket.pop()
                        basket.pop()
                break
    return answer
```
