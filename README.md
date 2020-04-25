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
        * components - Lifecycle과 관련된 파일 , 랜더링 할때 만 사용하는 파일 구성!!
        * containers - mapStateToProps , mapDispatchToProps 사용하거나 reduxStore와 연결이 필요한 파일 구성
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



