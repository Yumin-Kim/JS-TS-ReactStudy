import * as React from 'react';

import Class from './class';
import Hooks from './hooks';
import LoginComponent from './LoginComponent';
import PostComponent from './PostComponent';


class App extends React.Component {
    render() {
        return (
            <>
                <div>Typescript React Start!!!!!!!</div>
                <Class value={"Hello"} text="Class Component" />
                <Hooks value={"Hello"} text="Class Component" >Hooks component</Hooks>
                <LoginComponent />
            </>
        )
    }
}


export default App;