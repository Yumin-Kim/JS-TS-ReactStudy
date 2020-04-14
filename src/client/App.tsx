import * as React from 'react';
import Class from './class';
import Hooks from './hooks';

export interface ClassProps{
    value:string;
    text:string;
}

class App extends React.Component {
    render() {
        return (
            <>
                <div>Typescript React Start!!!!!!!!!!!!!!</div>
                <Class value={"Hello"} text="Class Component" />
                <Hooks value={"Hello"} text="Class Component" >Hooks component</Hooks>
            </>
        )
    }
}

export default App;