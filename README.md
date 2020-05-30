# React_Firebase PWA Example
## PWA 정리
* HTTPS 사용
* Mainfest.json 작성
    * asd
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
* asd
## connect PWA Firebase 