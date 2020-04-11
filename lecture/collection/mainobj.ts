import { Person ,A } from './interfaceObj';
//import * as canUseDom from 'can-use-dom';
import canUseDom from 'can-use-dom'; //can-use-dom 안에 export default일때 
//모듈화 하고 따로 옵션을 추가해야함
//"module": "commonjs",추가 해야지 밑에 있는 것이 안생김!!
//모듈화 후에 밑에 있는것을 삭제 해야 실행된다
//Object.defineProperty(exports, "__esModule", { value: true });

window.hello = "qwe";
class Kim implements Person{
    public name : string;
    public age : number;
    public gender : string;
    constructor(){
        this.name ="Kimyumin";
        this.age = 23;
        this.gender ="Man";
    }

    write() : void{
        console.log(this.name);
    }
    
}

const people = new Kim();
const num12: A = "hello";
const str12 : A = 12;
people.write();




