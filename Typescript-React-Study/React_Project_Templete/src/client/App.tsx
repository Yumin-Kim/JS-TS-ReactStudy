import * as React from 'react';
import { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router';

import loadable from '@loadable/component';

const Header = loadable(()=> import( './components/Header') );
const News = loadable(()=> import( './components/News') );
const Home = loadable(()=> import( './page/Home') );
const Footer = loadable(()=> import( './page/Footer') );

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



