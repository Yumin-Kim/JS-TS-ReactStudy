function greeter(person: number[]) {
    return "Hello ," + person
}

let user = [0, 2, 3];

interface Person {
    firstName: string;
    lastName: string;
}

function greeter1(person: Person) {
    return `Hello ${person.firstName} ${person.lastName}`;
}

const user1 = { firstName: "Jane", lastName: "User" };


class Student {
    fullname: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullname = `${firstName} ${middleInitial} ${lastName}`;
    }
}

function greeter2(person: Person) {
    return `Hello ${person.firstName} ${person.lastName}`;
}

const user2 = new Student("A", "B", "C");

let fullname1 = "Kim yu min";
let age = 100;

let sentence = `${age} +  ${fullname1}`;

let list: Array<string> = ["1", "2", "3", '4'];
function forEach1<T>(list: T[], callbackFc: (value: T) => void) {
    for (let i = 0; i < list.length; i++) {
        callbackFc(list[i]);
    }
}

forEach1(list, (value) => console.log(value));

let x: Array<number | string>;

x = ["Hello", 1];
x[3] = "world";

enum Color { Red = 1000, Green = "Green Color is good", Blue = 1000 };
let c: Color = Color.Green;
let c1: Color = Color.Red;
let c2: Color = Color.Blue;
console.log(c);
console.log(c1);
console.log(c2);

const tuple = [true, 1];


class Parent {
    foo = "";
}

class Child1 extends Parent {
    bar = "";
}

class Child2 extends Parent {
    baz = "";
}

const arr = [new Child1(), new Child2()]


//타입 단언  vs 타입 캐스팅
//타입 단언은 오직 컴파일타임에서만 타입 변경
//타입 캐스팅은 런타임,컴파잍 타임 둘다 영향을 미친다(모두의 타입 변경)
//타입 단언시 <Type> 또는 as Type이런식으로 선언할 수 있다
// as Type을 추천한다 <Type> 을 사용시 jsx와 겹칠 수 있기 때문에!!


class Character {
    hp: number;
    runAway() {
        /* ... */
    }
    isWizard() {
        console.log("isWizard")
        return false;
    }
    isWarrior() {
        console.log("isWarrior")
        return false;
    }
}

class Wizard extends Character {
    fireBall() {
        console.log("fireBall")
        return true;
    }
}

class Warrior extends Character {
    attack() {
        /* ... */
    }
}



//함수를 봤을때 character 안에 fireBall이나 attack 함수가 없어서 에러남
function battle(character: Character) {
    if (character.isWizard()) {
        (character as Wizard).fireBall(); // Property 'fireBall' does not exist on type 'Character'.
    } else if (character.isWarrior()) {
        (<Warrior>character).attack(); // Property 'attack' does not exist on type 'Character'.
    } else {
        character.runAway();
    }
}

let regex: RegExp = new RegExp(/pattern/);


//TypeScirpt를 사용함으로써 params의 값이 뭐가 올지 에디터가 말해줌!!

interface SquareConfig {
    color?: string;
    width?: number;
    // [key:string]:any; // 이방법은 추천 하지 않는다!!
}

function createSquare(config:SquareConfig) {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if(config.width){
        newSquare.area = config.width * config.width; 
    }
    return newSquare;
}

let mySquare = createSquare({coulr:"square",width:500 } as SquareConfig )
let mySquare1 = createSquare({color:"square",width:500 })
//type 단언 type 캐스팅 
//type 단언 사용 함으로써 typescript모르는 interface의 정보를 확장 할 수 있다
//1.index signature
//

interface SearchFunc{
    (source :string, subString:string):boolean
}

const mySearch :SearchFunc = function( source , subString ){
    let result = source.search(subString);
    return result > -1;
}

interface StringArray{
    [index:number] : string;
}

let myArray : StringArray = ["Bob","Hello"];

interface ClockInterface{
    currentTime :Date;
    setTime(d:Date):void;
}

class Clock implements ClockInterface{
    currentTime:Date;
    setTime(d:Date){
        this.currentTime = d;
    }

}
//index signature >> 인덱싱

let obj = {
    toString(){
        return"Hello";
    }
}

let foo : any ={};

foo[obj] = "World";
foo[obj.toString()] = "World";






