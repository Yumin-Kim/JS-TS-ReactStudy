import * as React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
// import Home from './page/Home';
import Category from './page/Category';
import loadable from  '@loadable/component'; 
import Loading from './component/Loading';
import Home from './page/Home';

const HomeComponent = loadable(()=>import('./page/Home'));
const CategoryComponent = loadable(()=>import('./page/Category'));

const App = () => {
    const alertButton = () => {
        import('./another').then((data) => data.alertEvent());
    }

    return (
        <>
            <div>Hello</div>
            <button onClick={alertButton} >Alert Button</button>
            <div>
                {/* <LoadableHome/> */}
                {/* <Link to="/" >Home</Link> */}
                <Link to="/category" >Category</Link>
            </div>
            <Switch>
                <Route component={HomeComponent} path="/" exact={true} />
                <Route component={CategoryComponent} path="/category" exact={true} />
            </Switch>
        </>
    );
}

export default App;