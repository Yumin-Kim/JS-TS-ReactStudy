# Typescript + React + Redux + React-Router + Express 
* Real world를 통해서 간단하게 구현 해보기
* 2020.12.31마지막 commit...
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
* namespace
    공식 문서 참조       
    타입을 추적하고 다른 객체와 이름 충돌을 방지하기 위해 구조 체계가 필요      
    네임 스페이스에 다른 이름을 많이 넣는 대신 , 객체들을 하나의 네임 스페이스로 병합        
    d.ts파일 에서 수 많은 export 들을 한번에 묶을때 export as namespace 변수명 이렇게 하면 import * as 변수명 './파일명' 이렇게 한것과 똑같다                
    
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

declare module "passport-local" //사용할때 import ___ from "passport-local"이런식으로 맞춰 적어야 한다!!


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



## React_VR
* React 360 install
 
