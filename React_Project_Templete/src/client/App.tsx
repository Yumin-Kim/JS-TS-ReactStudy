import * as React from 'react';
import { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router';

import Header from './components/Header';
import News from './components/News'
import Home from './page/Home';
import Footer from './page/Footer';

class App extends PureComponent {
    render() {
        return (
            <>
                <div>
                    <Helmet>
                        <title>React</title>
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