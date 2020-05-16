import * as React from 'react'
import * as ReactDOM from 'react-dom';

import {filter} from 'lodash';
const example = ["one","two"];
const exampleFilter = filter(example,(e)=>{
    return e === "one"
})

ReactDOM.render(<App/>,document.querySelector("root"));


function App(){
    return (
        <>
            <h1>Page 1 </h1>
            <Home value={exampleFilter} />
        </>
    );
}


const Home : React.FC<{value:string[]}> = (props) => {
    return (
        <div>Hello</div>
    );
}