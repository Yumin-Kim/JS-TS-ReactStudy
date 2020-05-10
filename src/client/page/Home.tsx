import * as React from 'react'
import Class from '../components/class';
import Hooks from '../container/hooks';

const Home: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <Class value={"Hello"} text="Class Component" />
            <Hooks value={"Hello"} text="Class Component" >Hooks component</Hooks>
        </React.Fragment>
    );
}
export default Home;