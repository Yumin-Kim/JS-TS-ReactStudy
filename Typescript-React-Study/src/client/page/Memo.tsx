import * as React from 'react'
import {Link, Switch, Route, useRouteMatch, RouteComponentProps, useParams} from 'react-router-dom';

const Memo: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <h1>Memo Component and Route_Example</h1>
            <ul>
                <li>
                    <Link to="/memo">Memo_Home</Link>
                </li>
                <li>
                    <Link to="/memo/topicasdasdasds">Memo_Home_Topics</Link>
                </li>
                <hr></hr>
            </ul>
            <Switch>
                <Route exact={true} path="/memo" component={Memo_Home} />
                <Route exact={true} path="/memo/:topics" component={Topics} />
            </Switch>
        </React.Fragment>
    );
}

export default Memo;

const Memo_Home = () => <h1>Memo_Home</h1>
interface RouterParams { topics:string }
const Topics:React.FC<RouteComponentProps> = (props)=>{
    let {path,url} = useRouteMatch();
    let { topics } = useParams<RouterParams>();
    console.log(path,url)
    console.log(props)
    console.log(topics)
    return(
        <h1>
            Memo_Home_Topics
        </h1>

    )
}

















