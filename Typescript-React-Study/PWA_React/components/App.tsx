import * as  React from 'react'
import { initPush, validate } from '../utils/serviceWorkerConfig';

const App = () =>{

    
    return(
        <>
        <button onClick={initPush} >subscribe</button>
        <h1>
            Hello
        </h1>
        <img src="./image/image1.jpg" alt="asd"></img>
        <img src="./image/image2.jpg" alt="asd"></img>
        <img src="./image/image3.jpg" alt="asd"></img>
        </>
    )
}
export default App;