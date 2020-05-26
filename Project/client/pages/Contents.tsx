import * as React from 'react'
import { FC } from 'react';

import { RouteProps, useRouteMatch, useParams, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ContentRoutes, IRouteType } from '../utils/routes';
import { Helmet } from 'react-helmet';

export const Custom_Link = styled(Link)`
    border:1px solid aqua;
    padding: 20px 10px;
    display:inline-block;
`

const Contents: FC<RouteProps> = (props) => {
    const { url } = useRouteMatch();

    return (
        <>
        <Helmet>
            <title>Contents</title>
        </Helmet>
            <h1>Contents Component</h1>
            {ContentRoutes.map(({ to, name }, idx) =>
                <Custom_Link key={`${idx}_${name}`} to={`${url}${to}`}>{name}</Custom_Link>
            )}
            <Switch>
                {ContentRoutes.map((route, idx) =>
                    <RouteWithSubRoutes key={`${idx}_${route.name}`} {...route} />
                )}
            </Switch>
        </>
    );
}

export default Contents;


function RouteWithSubRoutes({ path, component: Component, routes }: IRouteType) {
    const CustomComoponent = Component as React.FunctionComponent<RouteProps>;
    return (
        <>
            <Route
                path={path}
                render={props =>
                    <CustomComoponent {...props} routes={routes} />
                }
            />
        </>
    );

}
