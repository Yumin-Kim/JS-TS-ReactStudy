import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App';
export let swRegister = null; 

ReactDOM.render(<App />, document.querySelector("#root"));

//서비스 워커는 install , activate 서비스 워커 내에서 이루어지므로 dom조작이 불가능하다
//밑에 상태 이벤트를 핸들리한다면 상태에 따라 웹 페이지와 직접적으로 상호 작용
if ('serviceWorker' in navigator) {
    let appServerPublickey = "BFCqDbkqVilNTOWZedaiFV2dHKjKWOLBLiTzv9814auKWIk01XiDjdKysWfQ77iR2w_NU9D408FZA2o3PqIGOMw";
    let isSubscribed = false;
    

    
    navigator.serviceWorker
        .register('/sw.js')
        .then((register) => {
            console.log("Service Worker registered!!!", register);
             (swRegister as any) = register;
            //서비스 워커 변경되어 업데이트를 해야될 경우 updatefound발생 >> 이벤트 발생 시 새로운 서비스 워커 설치
            //등록 >> 설치 >> 활성화
            register.addEventListener("updatefound", () => {
                const newWorker = register.installing;
                console.log("Service Worker update found");
                console.log("updateFoundEvent", newWorker);
                //waitUntil로 설치 과정을 확장 시켰기 때문에 캐싱 작업이 모두 끝난 후에 설치됨 메세지 발생 
                //Changed this.state : installed >> activating >> activated >> ... 
                // activating 다음 activated가 이루어지는 이유는 skipWaiting이 있기 때문에 대기 하지 않고 바로 진행 
                newWorker?.addEventListener("statechange", function () {
                    console.log("Service Worker state changed", this.state);
                })
            })


        })
        .catch((error) => {
            console.log(error)
        })
    //Controllerchange로 인해 기존에 있던 서비스워커의 제어권을 새로운 서비스 워커로 바뀌게 된다 
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("Controller changed");
    })

}

