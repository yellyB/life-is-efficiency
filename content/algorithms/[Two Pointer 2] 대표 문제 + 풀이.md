---
title: "[Two Pointer #2] 대표 문제 + 풀이"
created: '2022-02-15'
---

\[문제 1\]

**주어진 문자열 배열을 뒤집기**

&lt;JavaScript>

```javascript
var reverseString = function (s) {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    const temp = s[l];
    s[l] = s[r];
    s[r] = temp;
    l++;
    r--;
  }
};
```

&lt;Python>

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        l, r = 0, len(s)-1
        while l < r:
            s[l], s[r] = s[r], s[l]
            l += 1
            r -= 1
```

reverse() 메서드를 쓰면 간단하게 해결할 수 있지만 알고리즘으로 직접 구현하는 것도 매우 간단하다.

왼쪽과 오른쪽을 가리킬 포인터를 만든 뒤 각자의 위치에서 중간 쪽으로 하나씩 옮겨가며 두 값을 바꿔준다.

관련 문제: [https://leetcode.com/problems/reverse-string/](https://leetcode.com/problems/reverse-string/)

\[문제 2\]

**띄어쓰기(공백) 기준으로 문자열 뒤집기**

ex. "this is an apple" -> "this is an apple"

&lt;JavaScript>

```javascript
var reverseWords = function (s) {
  let answer = "";
  let word = "";

  for (const w of s) {
    if (w !== " ") {
      word = w + word;
    } else {
      answer += word + w;
      word = "";
    }
  }

  return answer + word;
};
```

&lt;Python>

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        def reverse(str):
            str = list(str)
            l, r = 0, len(str)-1
            while l < r:
                str[l], str[r] = str[r], str[l]
                l += 1
                r -= 1
            return ''.join(str)

        s = s.split(' ')
        answer = []
        for word in s:
            answer.append(reverse(word))
        return ' '.join(answer)
```

자바스크립트는

1\. 문자열을 돌면서

 1-1. 공백이 나오기 전까지 단어 단위를 word에 저장

 1-2. 공백을 만나면 저장해놨던 단어 word를 answer에 붙여나감

2\. 마지막에는 공백이 없어서 마지막 단어가 answer에 붙지 못하므로 따로 처리를 해 줌

파이썬은

1\. 문자열을 공백 기준으로 쪼갬

2\. 각 단어를 문자열을 뒤집은 후 스트링 형식으로 반환해주는 reverse() 함수로 보냄

3\. 마지막에 뒤집은 단어들을 공백으로 연결

관련 문제: [https://leetcode.com/problems/reverse-words-in-a-string-iii/](https://leetcode.com/problems/reverse-words-in-a-string-iii/)

\[문제 3\]

**Linked List 문제. 연결 리스트 노드의 중간을 반환**

&lt;JavaScript>

```javascript
var middleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

&lt;Python>

```python
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        arr = [head]
        while arr[-1].next:
            arr.append(arr[-1].next)
        return arr[len(arr) // 2]
```

자바스크립트는 two pointer를 이용한 방식이다.

fast는 slow노드보다 두배 빨리 탐색해서 fast가 끝에 다다랐을 때 slow는 절반 위치를 가리키게 된다.

파이썬은 모든 노드를 배열에 담아서 마지막에 배열의 중간에 담긴 노드를 반환했다.

노드의 양이 많아지면 two pointer방식이 메모리를 적게 사용하기 때문에 상황에 따라 적절한 알고리즘을 적용하면 된다.

관련 문제: [https://leetcode.com/problems/middle-of-the-linked-list/](https://leetcode.com/problems/middle-of-the-linked-list/)

\[문제 4\]

**Linked List 문제. 연결 리스트 노드에서 뒤에서 n번째 노드를 제거하기**

&lt;JavaScript>

```javascript
var removeNthFromEnd = function (head, n) {
  let slow = head;
  let fast = head;

  while (n--) {
    fast = fast.next;
  }
  if (fast === null) return head.next;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return head;
};
```

&lt;Python>

```python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        fast = slow = head
        for _ in range(n):
            fast = fast.next
        if not fast:
            return head.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return head
```

뒤에서 n만큼의 노드 위치를 알기 위해 두 개의 포인터를 사용한다.

먼저 fast가 n만큼 이동한 다음 fast가 끝에 다다를 때까지 fast와 slow를 동시에 이동시키면 뒤에서 n번째 위치를 알 수 있다.

slow의 next는 건너뛰어야 할 뒤에서 n번째 노드를 가리키고 있는 상태이므로 slow.next에 slow.next.next를 담아주면 된다.

관련 문제: [https://leetcode.com/problems/remove-nth-node-from-end-of-list/](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
