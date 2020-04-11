//common.js
{/* <script src=""></script>스크립트를 사용한거 */}
const hello = { a:100,hello:'hello' };

// exports는 객체로 바로 보내 많이 사용; >> exports라는 객체가 존재하며 module.exports를 참조한다 
// exports.a = 10;
// exports.hello = "hello";
// module.exports = exports같기 때문에 exports가 없어짐
//한번에 보낼때(이파일에서 가장 중요한거!! )
// module.exports = hello; 

///////////////////////////////////////////////////////////////////////////
// const es2 = 30;
// export const es1 = 10;
// export { es2 };

// const moduleS = () =>{console.log("hello")}


//es2015
//common.js의 문제점을 해결 하기 위해서 es2015는 다르게 나옴
//사용할려면 바벨 필요할듯!!

//common.js의 단점인 module.exports가 exports를 덮는 것을 방지하기위해
//export 는 export default 와 별개로 동작하며 합치는 js파일에서는 
//import variable,{ es2,es1 } from './module'이런식으로 가져 올수 있다
// import { es2 as es3 } from './module'은 es3이라는 변수에 export한 es2를 담겠다는 의미
//import * from variable './module'할시 console.log(varialbe)하면 { es1:10, es2:30, default:"hello" } 결과가 출력
//결과적으로 module.exports 와 export default는 명백히 다르고 또하나의 default멤버(요소)가 생성된다!!

//TypeScript안에 다른 module이 module.exports = 넘길값 이면 
//import 하는 파일은 import * as 변수명 from './파일명'가지고 와야함
//* as 변수명은 파일에 export default 한것 모든것을 변수명으로 변경해서 담겠다는 의미 


//결론 d.ts 가 module.exports 변수 이렇게 되어 있으면
//가져오는 파일에서는 
// import * as 변수 from '파일명'  
// import  변수 =  require('파일명'); 
// 두가지 방법 사용!!   
// module exports 와 export default는 명백히 다르다!!

export default hello; 


