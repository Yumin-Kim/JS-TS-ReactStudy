import { RouteProps, LinkProps } from 'react-router-dom';
import loadable from '@loadable/component';
//loadable/component는 종속적인 관계를 이루는 파일 내에서 import가 필요함!!
//@loadable/component need to be imported in a file that has dependent relationship. 
const Home = loadable(()=>import(/* webpackChunkName: "HEllo" */'../pages/Home'));
const Contents = loadable(()=>import('../pages/Contents'));
const ContentMemo = loadable(()=>import("../components/ContentMemo"));
const ContentMovie = loadable(()=>import("../components/ContentMovie"));
const ContentCalendar = loadable(()=>import("../components/ContentCalendar"));
const ContentService = loadable(()=>import("../components/ContentService"));


type routesType = RouteProps & { name:string}; 

interface AddRouteType{
    name:string;
    routes?:routesType[];
}

export type IRouteType = RouteProps & LinkProps & AddRouteType;

//navigation Route Data >> Home , Contents , introduce , 
export const RootRoutes: IRouteType[] = [
    {
        to: "/",
        path: '/',
        name: "Home",
        exact: true,
        component: Home,
    },
    {
        to: "/contents",
        name: "Contents",
        path: '/contents',
        component: Contents,
    }
];

//
export const ContentRoutes: IRouteType[] = [
    {
        to: "/memo",
        name: "Memo && Dashboard",
        path: '/contents/memo',
        component : ContentMemo 
    }, {
        to: "/service",
        name: "Implementation of other service functions",
        path: '/contents/service',
        component:ContentService,
        routes:[
            {
                path:"/movie",
                component:ContentMovie,
                name:"Movie Search",
            },
            {
                path:"/calendar",
                component:ContentCalendar,
                name:"calendar Search",
            }
        ]
        // component : 
    }
    // , {
    //     to: "/contents/memo",
    //     name: "Memo && Dashboard",
    //     path: '/contents/memo',
    //     // component : 
    // }

]