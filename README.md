# 1. 클래스형 컴포넌트
react 컴포넌트 선언하는 두가지 방식 중 하나. [클래스 컴포넌트 & 함수 컴포넌트]
현재 자주 사용하지 않지만, 사용하는 기업들이 있다. 그 프로젝트의 유지보수를 위해서는 클래스형 컴포넌트에 대한 개념은 알고 있어야한다.

# 2. 클래스형 컴포넌트와 함수형 컴포넌트 차이

## `1) 선언 방식`

`함수형 컴포넌트`

```
import React from 'react';
import './App.css';

function App() {
  const name = 'react';
  return <div className = "react">{name}</div>
}
export default App;
```


`클래스형 컴포넌트`
```
import React, {Component} from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className="react">{name}</div>
  }
}
export default App;
```
>클래스 컴포넌트 핵심
>1. class 키워드 필요
>2. Component로 상속을 받아야한다.
>3. render() 메소드가 반드시 있어야한다.

## `2) 일반적 차이`
* `클래스형`
* state, lifeCycle 관련 기능사용 가능하다.

* 메모리 자원을 함수형 컴포넌트보다 조금 더 사용한다.

* 임의 메서드를 정의할 수 있다.


* `함수형`
* state, lifeCycle 관련 기능사용 불가능 [Hook을 통해 해결 됨]

* 메모리 자원을 함수형 컴포넌트보다 덜 사용한다.

* 컴포넌트 선언이 편하다.

>함수형이 클래스보다 후에 나왔기 때문에 더 편한 것은 사실이다. 그러나 과거 클래스 컴포넌트 사용한 프로젝트가 있다. 유지보수를 위해서 알아둘 필요가 있다.

## `3) 기능, state 사용차이`
> state : 컴포넌트 내부에서 바뀔 수 있는 값

- 클래스 형 : constructor 안에서 this.state 초기 값 설정 가능

    constructor 없이 바로 state 초기값을 설정할 수 있다.

    클래스형 컴포넌트의 state는 객체 형식

    this.setState 함수로 state의 값을 변경할 수 있다.

- 함수 형
    함수형 컴포넌트에서는 useState 함수로 state를 사용한다.

    useState 함수를 호출하면 배열이 반환되는데 첫 번째 원소는 현재 상태

    두 번째 원소는 상태를 바꾸어 주는 함수

## `4) props 사용차이`
>props : 컴포넌트의 속성을 설정 할 때 사용하는 요소

``` 
※ 읽기 전용
```

컴포넌트 자체 props를 수정해서는 안된다.

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야한다.

수정 되는 것은 state

* 클래스형 컴포넌트

> 클래스 컴포넌트의 props
- this.props로 통해 값을 불러올 수 있다.
부모 객체의 키 값, 자식 props 활용

> 함수형 컴포넌트의 props
- props를 불러올 필요 없이 바로 호출 할 수 있다.

## `5) LifeCycle`
LifeCycle API는, 컴포넌트가 DOM 위에 생성되기 전 후 및 데이터가 변경되어
상태를 업데이트하기 전 후로 실행되는 메소드들이다.

constructor / componentWillMount / componentDidMount ...


## `6) 이벤트 핸들링`
> 클래스형 컴포넌트

이벤트 핸들링 함수 선언시 에로우 화살로 바로 선언 가능하다.

요소에서 적용하기 위해서는 this를 붙여야한다.

> 함수형 컴포넌트

이벤트 핸들링 const 키워드 + 함수 형태로 선언 해야한다.
요소에서 적용하기 위해서는 this가 필요없다.