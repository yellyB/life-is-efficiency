---
title: "[React] 리액트 class 컴포넌트와 함수 컴포넌트의 lifecycle"
created: '2022-02-23'
---

**리액트 Class형의 생명주기(lifecycle)**

**▶ componentDidMount()**

컴포넌트가 DOM에 생성된 직후 호출

외부에서 데이터를 불러와야 한다면 이 단계에서 실행

**▶** shouldComponentUpdate()

성능 최적화를 위한 것

props와 state를 이전 값과 비교해서 갱신 작업을 건너뛰게 만들 수 있음(false반환)

****▶** componentDidUpdate()**

갱신이 일어난 직후 호출

DOM조작을 할 때 활용하면 좋음

setState()를 사용하게 된다면 무한 반복이 일어날 수 있기 때문에 주의

shouldComponentUpdate()가 false를 반환하면 호출되지 않음

****▶** componentWillUnmount()**

컴포넌트가 제거되기 직전에 호출

타이머 제거, 네트워크 요청 취소 등 정리 작업 수행할 때 활용

**Hook 사용을 권장하는 이유**

-   hook을 사용하면 상태 관련 로직을 추상화할 수 있어서 독립적 사용 가능
-   생명주기 메서드에 관련 없는 로직이 들어가는 경우가 있어 무결성을 해칠 위험이 있음 -> Hook으로 비슷한 기능을 가진 함수 묶음으로 컴포넌트를 나눌 수 있음
-   Class를 사용하려면 JavaScript의 this를 이해해야 하는데 this는 혼란을 주기 쉬운 개념이라 Class형을 완벽히 이해하기 힘듦

**Hook**

-   React는 현재 렌더링 컴포넌트를 추적한다.
-   각 컴포넌트와 관련된 데이터를 넣을 수 있는 JavaScript객체인 '메모리 셀' 내부 목록이 있다.
-   Hook을 호출하면 현재 셀을 읽거나 첫 번째 렌더링 중에 초기화 한 다음 포인터를 다음 셀로 이동하는데 이런 방법을 이용해 여러 Hook의 호출이 각각 독립적인 로컬 state를 얻는다.

**useState**

-   Hook을 호출해 함수 컴포넌트 안에 state를 추가함
-   destructuring문법으로 useState API를 state를 선언한다.
-   현재의 state값과 업데이트하는 함수가 같이 제공됨

**useEffect**

-   컴포넌트 안에서 데이터를 가져오거나 DOM을 직접 조작하는 side effects를 수행할 수 있게 해 줌
-   class의 componentDidMount + componentDidUpdate + componentWillUnmount를 하나의 API로 통합
-   useEffect Hook을 통해 React에게 렌더링 이후와 DOM업데이트 이후에 어떤 일을 수행해야 하는지 알림
-   componentDidUpdate에서는 이전 값과 현재 값을 비교해서 성능 최적화를 했다면 useEffect로는 두 번째 인자에 넘긴 값을 이용해서 해당 값이 변경되었는지 여부를 가지고 effect를 건너뛰어서 최적화를 한다.
-   React는 effect가 수행되는 시점에 이미 DOM이 업데이트되었음을 보장함

\=>

클래스형과 비교했을때 effect의 장점

\- 컴포넌트가 마운트 되었을 때와 업데이트 되었을때 같은 side effect를 수행해야 할 때 중복 방지

\- clean-up기능이 componentDidUpdate와 componentWillUnmount에서의 중복을 피할 수 있다.
