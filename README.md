# React_Firebase PWA Example
## PWA 정리
* HTTPS 사용
    * firebase를 사용하여 해결하는등 SSH 활용하여 HTTPS 프로토콜을 활용한다
* Mainfest.json 작성
    * webapck을 활용하여 index.html 동적으로 넣을 수 있게 한다(webpack-pwa-manifest --plugin을 활용한다 )    
    * Icon,maskable 둘다 만들어서 배치하여 한다(Maskable.png 만들어 주는 사이트 >> https://maskable.app/editor)
    * Mainfest.json을 만들어 주는 사이트 >> https://app-manifest.firebaseapp.com/
    * 작성 하는 방법      
```
{
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    gcm_sender_id :"firebase >> cloud messaging >> sendler ID", 
    icons: [
        {
            src: path.resolve('src/image/Icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
            src: path.resolve('src/image/Icon.png'),
            size: '1024x1024' // you can also use the specifications pattern
        },
        {
            src: path.resolve('src/image/maskable_icon.png'),
            size: '1024x1024',
            purpose: 'maskable'
        }
    ]
}
```  
* Service Worker
    * 서비스 워커는 브라우저에 설치하고 나면 백그라운드에서 실행되는 프로세스로,웹 어플리케이션의 메인 로직과는 전혀 별개로 작동한다.   
    * navigator의 내장 객체인것을 확인할 수 있다(navigator라는 전역 객체를 통해 사용자의 브라우저 정보를 확인 할 수 있다)   
    * if( 'ServiceWorker' in navigator) {  } 를 활용하여 사용자의 브라우저 전역 객체인 navigator 안에 'ServiceWorker'있는지 확인하여 로직이 작동 되도록 한다 ( 아직까지는 크롬 브라우저에서만 작동한다 ) >> ServiceWorker는 Promise를 callBack 하는것을 기억!! 
    * ServiceWorker 의 수면 주기 install >> Activated >> Idel >> Fetch,message
    * SSR환경시 process.browser을 활용하여 browser에서 작동하도록 로직을 구성해야한다    
* PushManager
    *
## connect PWA Firebase 