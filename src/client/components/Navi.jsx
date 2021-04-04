import React, { memo } from 'react'
import routes from '../routes';
import { Link, Switch, Route } from 'react-router-dom';

const Navi = (props) => {
    return (
        <>
            <div>
                Navigation Bar
            </div>
            {routes.map((val)=>
                <Link 
                    key = {val.name}
                    to={val.path}
                >{val.name}</Link>
            )}
            <Switch>
                {routes.map(({ name , path , component : C , exact })=>
                    <Route 
                        key={name}
                        path={path}
                        component={C}
                        exact={exact}/>
                )}
            </Switch>
        </>
    );
}
export default memo(Navi);