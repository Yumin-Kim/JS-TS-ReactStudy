import React, { useState, useRef } from 'react'

let routeInf;
console.log("Main.jsx Rendering")
const Main = (props) =>{
    console.log("Main Props",props);
    console.log("Main.jsx function Component Rendering")
    if(__isServer__){
        routeInf = props.staticContext;
    }else{
        routeInf = window.__INITIAL_ROUTE__;
        // delete window.__INITIAL_ROUTE__; delete하게되면 새로고침할때는 괜찮으나 다른 페이지 갔다가 오면 없어 져서 error 발생
    }
    console.log(routeInf);
    return(
        <>
        <p>RouteData{routeInf.name}</p>
        <div>Main page</div>
        </>
    );
}
export default Main;


// import React, { useState, useRef } from 'react'


// class Main extends React.Component{
//     constructor(props){
//         super(props);
//         let routeData;
//         if(__isServer__){
//             routeData = this.props.staticContext;
//         }else{
//             const data = window.__INITIAL_ROUTE__;
//             routeData = data;
//         }
//         this.state = {
//             routeData,
//         }
//     }
//     render(){
//         return(
//             <>
//             <p>StaticContext : {this.state.routeData.name}</p>
//             <div>Main page</div>
//             </>
//         );
//     }
// }
// export default Main;