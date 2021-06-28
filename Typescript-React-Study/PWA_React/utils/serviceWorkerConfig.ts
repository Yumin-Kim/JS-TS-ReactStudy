type SWRegisterType = ServiceWorkerRegistration | null | PushSubscription;

let appServerPublickey = "BFCqDbkqVilNTOWZedaiFV2dHKjKWOLBLiTzv9814auKWIk01XiDjdKysWfQ77iR2w_NU9D408FZA2o3PqIGOMw" as const;
let isSubscribed = false;
let swRegister: SWRegisterType = null;

function urlB64ToUint8Array(base64String: typeof appServerPublickey) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export function initPush() {
    if (isSubscribed) {
        console.log("clear_____________________");
    } else {
        subscribe();
    }
    (swRegister as ServiceWorkerRegistration).pushManager.getSubscription()
        .then((subscription) => {
            isSubscribed = !(subscription === null);
            updateSubscription(subscription);
            if (isSubscribed) {
                console.log("User IS subscribed");
            } else {
                console.log("User is Not subscribed");
            }
        })
    updateButton()
}

export function subscribe() {
    const applicationServerKey = urlB64ToUint8Array(appServerPublickey);
    (swRegister as ServiceWorkerRegistration).pushManager.subscribe({
        userVisibleOnly: true,//푸시 알림을 받겠다는 값 
        applicationServerKey: applicationServerKey,//https일때 키 값을 받겠다
    })
        .then(subscription => {
            console.log("User is subscribed");
            updateSubscription(subscription);
            isSubscribed = true;
            updateButton();
        })
        .catch(error => {
            console.log("Failed to subscribe the user", error);
            updateButton();
        })
}

export function updateButton() {
    if(isSubscribed){
        return console.log("Disable push Messaging")
    }else{
        return console.log("Enable Push Messaging");
    }
}

export function validate(bool:Boolean){
    return bool;
}

export function updateSubscription(subscription: SWRegisterType) {
    console.log(subscription,"updateSubscription");
    if(subscription){
        console.log(">>>>>>>>>>>>>>> 구독하셨습니다");
    }else{
        console.log(">>>>>>>>>>>>>>> 구독 취소 하셨습니다");
    }
}

export function serviceWorkerConfig() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then((register) => {
                console.log("Service Worker registered!!!", register);
                swRegister = register;
                

                register.addEventListener("updatefound", () => {
                    const newWorker = register.installing;
                    console.log("Service Worker update found");
                    console.log("updateFoundEvent", newWorker);
                    newWorker?.addEventListener("statechange", function () {
                        console.log("Service Worker state changed", this.state);
                    })
                })
            })
            .catch((error) => {
                console.log(error)
            })

        navigator.serviceWorker.addEventListener("controllerchange", () => {
            console.log("Controller changed");
        })

    }
}
