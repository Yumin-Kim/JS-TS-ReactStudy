import * as React from 'react';
import { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router';

import Loadable from '@loadable/component';

// import Header from './components/Header';
// import News from './components/News'
// import Home from './page/Home';
// import Footer from './page/Footer';

const Header = Loadable(()=> import(/* webpackChunkName: "Header" */ './components/Header') );
const News = Loadable(()=> import(/* webpackChunkName: "News" */ './components/News') );
const Home = Loadable(()=> import(/* webpackChunkName: "Home" */ './page/Home') );
const Footer = Loadable(()=> import(/* webpackChunkName: "Footer" */ './page/Footer') );

class App extends PureComponent {
    render() {
        return (
            <>
                <div>
                    <Helmet>
                        <title>React!</title>
                    </Helmet>
                    <Route path="/" render={() => <Header />} />
                    <Switch>
                        <Route exact path="/" render={()=><Home/>} />
                        <Route path = "/news" render = {()=><News/>}/>
                    </Switch>
                    <Footer/>
                </div>
            </>
        );
    }

}

export default App;