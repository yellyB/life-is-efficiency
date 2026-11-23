---
title: "[JavaScript] this"
date: '2021-12-27'
---

**this란**

자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수

this에 바인딩될 값은 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

**this 바인딩**

&amp;lt;table style="border-collapse: collapse; width: 100%;" border="1" data-ke-align="alignLeft" data-ke-style="style3">&amp;lt;tbody>&amp;lt;tr>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">함수 호출 방식&amp;lt;/span>&amp;lt;/td>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">this 바인딩&amp;lt;/span>&amp;lt;/td>&amp;lt;/tr>&amp;lt;tr>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">일반 함수&amp;lt;/span>&amp;lt;/td>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">전역 객체&amp;lt;/span>&amp;lt;/td>&amp;lt;/tr>&amp;lt;tr>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">메서드&amp;lt;/span>&amp;lt;/td>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">메서드를 호출한 객체&amp;lt;/span>&amp;lt;/td>&amp;lt;/tr>&amp;lt;tr>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">생성자 함수&amp;lt;/span>&amp;lt;/td>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">미래에 생성할 인스턴스&amp;lt;/span>&amp;lt;/td>&amp;lt;/tr>&amp;lt;tr>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">apply/call/bind&amp;lt;/span>&amp;lt;/td>&amp;lt;td style="width: 50%;">&amp;lt;span style="font-family: 'Nanum Gothic';">해당 메서드에서 첫번째 인수로 전달한 객체&amp;lt;/span>&amp;lt;/td>&amp;lt;/tr>&amp;lt;/tbody>&amp;lt;/table>

\*일반 함수로 호출된 모든 함수(메서드 내에서 정의한 중첩 함수, 콜백 함수 포함)내부의 this에는 전역 객체가 바인딩된다.
