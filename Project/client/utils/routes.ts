import { RouteProps, LinkProps } from 'react-router-dom';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import ContentMemo from '../components/ContentMemo';
import ContentMovie from '../components/ContentMovie';
import ContentCalendar from '../components/ContentCalendar';
import ContentService from '../components/ContentService';

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