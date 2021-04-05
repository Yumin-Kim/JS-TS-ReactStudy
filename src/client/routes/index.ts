import * as React from 'react'
import Login from '../pages/login'
import MarkUp from '../pages/MarkUp'
import ApiCollection from '../pages/apiCollection'
import Main from '../pages/main'
//route에 component담을꺼 import 하기
// 성공시 routes에서 데이터 변경 가능하면 해보기

const routes = [
    {
        path:'/',
        exact : true,
        name:'Home',
        component:Main,
    },{
        path:'/login',
        name:'Log in',
        component:Login,
    },{
        path:'/markup',
        name:'Mark up DataBase',
        component:MarkUp
    },{
        path:'/apiCollection',
        name:'API Collection',
        component:ApiCollection
    }
]

export default routes;