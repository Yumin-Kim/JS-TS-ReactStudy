import * as React from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import {RootRoutes} from './utils/routes'
import Footer from '../../React_Project_Templete/src/client/page/Footer'

const App = () => {
    return (
        <>
            <header>
                <nav>
                    {RootRoutes.map(({ to, name }, index) => <Link key={`${index}_${name}`} to={to}>{name}</Link>)}
                </nav>
            </header>
            <main>
                <Switch>
                    {RootRoutes.map(({ path, exact, component,name }, index) => <Route key={`${index}_${name}`} exact={exact} path={path} component={component} />)}
                </Switch>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default App;

