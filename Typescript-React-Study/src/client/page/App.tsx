import * as React from 'react';

import LoginComponent from '../LoginComponent';
import { Link, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import Home from './Home';
import Memo from './Memo';

const routes : RouteProps[] = [
    {
        path:"/",
        exact:true,
        component:Home
    },{
        path:"/memo",
        component: Memo,
        exact:undefined
    }
]


class App extends React.Component {
    render() {
        return (
            <>
                <div>Typescript React Start!!!!!!!</div>
                <Link to="/" >Home</Link>
                <Link to ="/memo">Memo</Link>
                <Switch>
                    {routes.map(({path,exact,component})=>{
                        return <Route component={component} exact={exact} path={path}  />
                    })}
                    <Redirect path="*" to="/" />
                </Switch>
                <LoginComponent />
            </>
        )
    }
}

export default App;