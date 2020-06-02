import { precacheAndRoute } from 'workbox-precaching';

const _version = 'v7';
const cacheName = 'v2';
const cacheList = [
  "/",
  './image/image1.jpg',
  './image/image3.jpg',
  './image/image2.jpg',
]

type SelfReturnType = "INSTALL" | "Activate" | any;

const log = (msg : SelfReturnType) => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}


self.addEventListener('install',()=>{
  (self as any).skipWaiting();
  log("INSTALL");
  caches.open(cacheName).then((cache)=>{
    log("Cache app shell");
    console.log("Caches Parmas",cache);
    return cache.addAll(cacheList);
  })
})
self.addEventListener("activate",(event:any)=>{

  log("Activate");
  event.waitUntil(
    caches.keys()
      .then(keyList=>{
        return Promise.all(keyList.map(key=>{
          if(key !== cacheName){
            log("Removing old cache"+key);
            return caches.delete(key);
          }
        }))
      })
      .catch((error)=>{
        console.error(error);
      })
  )
  
})
self.addEventListener('fetch',(event : any )=>{
  log("Fetch");
  // if(event.request.url.indexOf('.jpg') !== -1){
  //     event.respondWith(fetch('./image/image2.jpg'))
  // }
  event.respondWith(
    caches.match(event.requset).then(response=>{
      return response || fetch(event.request);
    })
  )
})


  precacheAndRoute((self as any).__WB_MANIFEST);


//기존 v1이 등록 되고 설치 된다 그후 skipWaiting되고 클릭하여 풀게되면 activate 실행되고 
//fetch매소드가 실행된다 >> install activat 설치 직전후 밖에 실해되지 않고 skipWaiting을 풀어 줘야지 activate가 실행된다
//skipWaiting은 이미 등록돠고 활성화 되었던 서비스 워커가 있기 때문에 설치 이후에 대기 상태로 진행하고 그상태에서 skipWaiting이 된다
// install 단계에서 event.waitUntil()사용할 수 있는데 캐싱하거나 시간이 쇼유되는 작업을 할땐 waitUntil을 통해 install단계를 확장 시킬 수 있다
//
