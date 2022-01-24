---
title: "[React] 컴포넌트 마운트/언마운트 시 처리: useEffect()"
date: '2022-01-24'
---

며칠 전에 프론트 엔드 개발자 면접을 보고 왔는데 면접에서 받았던 질문 중에 몰랐던 부분을 알게 되었다.

useEffect를 자주 사용하고 잘 활용하고 있다고 생각했는데 내가 몰랐던 기능이 있었다.

지금까지 컴포넌트가 마운트 될 때에만 useEffect를 사용하고 있었는데 컴포넌트가 언마운트 될 때에도 useEffect를 사용할 수 있었다.

먼저 마운트/언마운트를 어떨 때 주로 사용하는지 알아보자면

**마운트**

1\. props로 받은 값을 컴포넌트의 state로 설정할 때

2\. 컴포넌트가 나타나면 외부 API (REST API)를 요청해야 할 때

3\. 라이브러리를 사용할 때 (D3, Video.js 등)

4\. setInterval이나 setTimeout과 같은 작업

**언마운트**

1\. setInterval, setTimeout을 사용해서 등록했던 작업을 제거할 때 즉, clearInterval이나 clearTimeout과 같은 작업

2\. 라이브러리 인스턴스를 만들었다면, 이 인스턴스를 제거할 때

3\. 언마운트 될 때 실행되는 함수들 => 클리너 함수, 뒷정리 함수

클래스형 컴포넌트에서는 componentDidMount와 componentWillUnmount가 사용하는데 함수형 컴포넌트에서는 hook을 사용하기 때문에 useEffect안에 return문을 사용해서 unmount처리를 해준다.

componentDidMount와 componentWillUnmount는 결합도가 높아서 useEffect는 이를 함께 다루도록 고안되었다.

effect가 함수를 반환하면 React는 그 함수를 정리가 필요한 때에 실행시킨다.

요약하자면 effect에 정리가 필요한 경우에 함수를 반환한다. 정리가 필요 없으면 아무것도 반환하지 않으면 된다.

이제 코드의 실제 사용 예시를 보자면

```javascript
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    console.log('mount');
  }, [inputValue]);
```

위와 같이 inputValue가 변경될 때 useEffect내부의 코드가 실행되도록 작성했다.

처음 페이지가 로드될 때, input의 값이 변경될 때마다 mount가 콘솔에 찍힌다.

useEffect내부에 return문을 사용하게 되면 컴포넌트가 언마운트 될 때 리턴문 안의 코드가 실행된다.

```javascript
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, [inputValue]);
```

위처럼 코드를 작성하면 처음 페이지가 로드될 때 mount가 콘솔에 찍힌다.

여기까지는 처음 코드와 동일한데,

인풋의 값이 변경되면 인풋 컴포넌트가 언마운트 된 후 다시 마운트 되는 것이기 때문에 unmount, mount가 추가로 콘솔에 찍힌다.

지금까지 개발하면서 언마운트 될 때의 처리를 딱히 할 필요가 없어서 이런 기능을 몰랐었는데 앞으로는 더 다양한 기능을 사용해서 개발할 수 있을 것 같다.

내가 한 프로젝트들을 다시 보면서 이 기능을 추가하면 좋을법한 부분이 있는지 살펴봐야겠다.

[https://ko.reactjs.org/docs/hooks-effect.html](https://ko.reactjs.org/docs/hooks-effect.html)

[Using the Effect Hook – React](https://ko.reactjs.org/docs/hooks-effect.html)
