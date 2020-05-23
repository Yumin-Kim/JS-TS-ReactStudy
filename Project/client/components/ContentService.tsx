import * as React from 'react'
import { IRouteType } from '../utils/routes';
import { useRouteMatch, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import {Custom_Link} from '../pages/Contents'; 

const ContentService = ({ routes }: IRouteType) => {

    const { url } = useRouteMatch();
    return (
        <>
            <h2>Implements of other service functions</h2>
            {routes?.map(({ path, name }, idx) =>
                <Custom_Link to={`${url}${path}`} key={`${idx}_${path}`}>{name}</Custom_Link>
            )}
            <Switch>
                {routes?.map(({path,component},idx)=>
                    <Route path={`${url}${path}`} key={`${idx}_${path}`} component={component} />
                )}
            </Switch>
        </>
    );
}

export default ContentService;