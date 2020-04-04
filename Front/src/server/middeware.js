exports.headersReferer = (req,res,next)=>{
    console.log('현재 페이지 // 캐시를 위해 주기적으로 확인중',req.headers.referer) // 동적 라우팅 현황 분석>> 라우팅 현황
    if (req.headers.referer) {
        const url = req.headers.referer;
        const urlReqularExp = url.match(/[^\/]*[^\/]/g);
        if (urlReqularExp.length > 4) {
            const ParseUrl = urlReqularExp.filter(v => v.match(/[0-9]+/))
            const currentPage = ParseUrl[ParseUrl.length - 1]
            if (req.cookies['count']) {
                console.log(req.cookies['count'])
                const cookieData = JSON.parse(req.cookies['count'])
                const cookieDataInclude = cookieData.currentPage.includes(currentPage)
                if(!cookieDataInclude){
                    const cookieDataPush = {
                        currentPage:[...cookieData.currentPage,currentPage]
                    } 
                    const cookieDataPushJson = JSON.stringify(cookieDataPush);
                    res.cookie('count', cookieDataPushJson,{
                        maxAge: 1000*60*60*5,
                    })
                }
            } else {
                const data = {
                    currentPage : [ currentPage ]
                }
                const dataJson = JSON.stringify(data)
                res.cookie('count', dataJson,{
                    maxAge: 1000*60*60*5,
                })
            }
        }
    }
    next();
}