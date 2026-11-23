---
title: "[TypeScript] type vs interface 차이점"
date: '2025-02-07'
---

TypeScript에서 type과 interface는 둘 다 타입을 정의하는 데 사용되지만, 각각의 특성과 활용 방식이 다르다.

* * *

### **1\. 인터페이스 (interface)**

✅ **객체 형태 확장에 유리**

✅ **라이브러리 확장에 적합**

• extends 키워드로 쉽게 확장 가능

• 동일한 이름의 인터페이스를 여러 번 선언하면 속성이 합쳐짐 (Declaration Merging)

```typescript
interface User {
  name: string
}

interface User {
  age: number
}

// 병합됨
const user: User = { name: "Alice", age: 25 }
```

이러한 특징 덕분에 **라이브러리의 타입을 확장할 때 유용**하다.

* * *

### **2\. 타입 별칭 (type)**

✅ **복잡한 타입 조합에 유리**

✅ **튜플, 유니온, 리터럴 타입 정의 가능**

• 유니온(|), 인터섹션(&)을 활용한 조합 가능

• 튜플, 리터럴 타입 정의 가능

• Partial, Pick, Record 같은 **유틸리티 타입 활용 가능**

❓유니온, 튜플, 리터럴 타입?? 👀

```typescript
// 유니온 타입: 여러 타입 중 하나
type MyType = string | number

// 튜플: 배열의 길이와 요소 타입 고정
type Point = [number, number]

// 리터럴 타입: 특정 값만 허용
//           (정확히는 '리터럴 유니온 타입', 리터럴이 유니온의 부분집합임)
type Direction = "up" | "down" | "left" | "right"
```

* * *

### **3\. 함수 타입 정의 차이**

함수 타입을 정의할 때 type이 더 간결하다.

```typescript
// interface 방식
interface Greet {
  (name: string): string
}

// type 방식 (더 간결)
type GreetType = (name: string) => string
```

* * *

### **4\. 언제 무엇을 사용할까?**

✔ **객체의 구조를 정의하고 확장해야 한다면** → interface

✔ **여러 타입을 조합하거나 유니온, 튜플을 활용해야 한다면** → type

👉 **단순한 객체 구조라면** interface,

👉 \*\*다양한 타입 조합이 필요하면 type\*\*을 사용하는 것이 좋음.

* * *

### **결론**

• interface는 **확장성**이 뛰어나고, 라이브러리 확장에 유리하다.

• type은 **조합성과 활용성**이 뛰어나고, 복잡한 타입을 다루기에 적합하다.
