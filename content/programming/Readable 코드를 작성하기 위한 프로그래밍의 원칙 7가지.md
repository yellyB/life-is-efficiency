---
title: "Readable 코드를 작성하기 위한 프로그래밍의 원칙 7가지"
date: '2022-06-03'
---

#### 1\. KISS (Keep It Simple Stupid / Keep It Short and Simple)

코드는 단순해야 한다.

지금 작성하는 코드가 진짜로 필요한 코드인지 생각해보자

less is more

#### 2\. DRY (Don't Repeat Yourself)

중복을 피하라

코드에 중복이 있으면 수정이나 기능 추가가 어려워진다.

코드를 추상화하여 중복을 제거할 수 있다.

#### 3\. YAGNI (You Aren't Going to Need it)

나중에 이 코드가 필요해질 거라는 예측으로 코드를 작성하지 말기.

현재 필요한 코드만 작성하자

#### 4\. PIE (Program Intently and Expressively)

코드로 의도를 전달하기. 코드는 문서이다.

코드를 작성할 때는 '작성하기 쉬움'보다 '읽기 쉬움'을 중요시하기.

주석을 작성할 때는 why를 작성하자. what, how는 코드로 표현되어야 한다.

코드는 의도를 전달하고 자기 설명적이어야 한다.

#### 5\. SLAP (Single Level of Abstraction Principle)

코드의 추상화 수준 통일. 높은 추상화와 낮은 추상화 코드를 분리하여 작성하자.

같은 곳에 같은 추상도를 처리하는 식으로 코드가 통일되어있으면 코드를 이해하기 쉬워진다.

#### 6\. OCP (Open-Closed Principle)

코드는 확장할 수 있어야 하고 동시에 그 밖의 코드에는 영향이 없어야 한다.

#### 7\. Naming is important

네이밍은 코드를 읽는 사람에게는 UI이다.

이름 가역성 -> 만들어낸 이름으로 무슨 기능인지 역으로 떠올려보기.
