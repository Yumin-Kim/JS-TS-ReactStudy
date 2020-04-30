# Typescript + React + Redux + React-Router + Express 
* 연습중!!

## 파일 구성!!!
* src
    * server
    * client
        * actions 
            * Action.ts - Type 및 payload(data) 반환하는 함수 포함
            * ActionTypeKey.ts - Type으로 사용되는 KEY?
            * ActionType.ts - 모든 액션 타입 정의
            * IAction.ts - 동작을 정의 하는 인터 페이스 정의
        * api - API 호출을 수행 하는 기능만!! Redux와 무관!!
        * components - Lifecycle과 관련된 파일 , 랜더링 할때 만 사용하는 파일 구성!!-- 부모 한데 받은 props만 사용하는 component들오 구성 되어있다(Dumb components)
        * containers - mapStateToProps , mapDispatchToProps 사용하거나 reduxStore와 연결이 필요한 파일 구성 - 빈번하게 state의 변화를 주거나 dispatch를 하는 compoenent로 구성된다(smart Component)
        * config - 상수 값 과 구성 설정 관련 파일 구성(이유 모르겠음)
        * models - 우리가 정의한 state props 관련 type 파일 구성
        * reducer
        * store 
        * styles
* webpack
    * webpack.config.js
        * webpack.client.js
        * webpack.server.js
    * webpack.dev.js
    * webpack.prod.js
* babel.config.js || .babelrc
###### TypeScript 몰랐던점 정리
* declare        
    declare 타입이 없을때 정의 하는것으로 사용함            
    stack overflow 에서 찾은정보   
    webpack Hot Middleware를 타입스크립트를 붙여서 사용중인데     
    module.hot이라는 메소드 활용하였지만 property에서 hot does not exist에러 발생       
    하지만 실행되었다는 것을 개발자는 알고 있다 이문제를 해결하기 위해서는  declare let module :any 선언이 필요하다        
    만약 declare를 제거하고 선언하게 된디면 module already exist로 발생!!    
```
declare global{
//error Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.ts(2669)    
//external module :import,export 를 사용하는 모듈(외부모듈) namepace (내부모듈)
//type이 정의 되있지 않을때 직접 정의 하는 모듈 
    interface Window{
        //Window 객체의 타입 확장!!
        hello:string;
    }
}
```
###### README.md 기초 작성법
```
기본적인 작성 하는 방법!!
# 큰 제목
## 작은 제목
### 더 작은 제목 
#### READMEE.md 연습중입니다!!
1. first Text
2. second Text
3. third Text.

* Tutorial
    * Tutorial
        * Tutorial

//뛰어쓰기는 스페이스바 3번 이상이 필요 하다!!
안녕 하세요     
연습중이요    

연습중이요!!
코드는 ``` () ``` 작성하면 됨
```



