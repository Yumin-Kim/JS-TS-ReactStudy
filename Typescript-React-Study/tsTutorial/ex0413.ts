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
    hp?: number;
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
    constructor() {
        super();
    }

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

function createSquare(config: SquareConfig) {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ coulr: "square", width: 500 } as SquareConfig)
let mySquare1 = createSquare({ color: "square", width: 500 })
//type 단언 type 캐스팅 
//type 단언 사용 함으로써 typescript모르는 interface의 정보를 확장 할 수 있다
//1.index signature
//

interface SearchFunc {
    (source: string, subString: string): boolean
}

const mySearch: SearchFunc = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
}

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ["Bob", "Hello"];

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    public currentTime: Date;
    constructor() {
        this.currentTime = new Date();
    }
    setTime(d: Date) {
        this.currentTime = d;
    }

}
//index signature >> 인덱싱
//[key : string] : string 이런식으로 작성하는 방식을 index signature이라고 한다
//많이 안사용하는것이 좋음 타입을 모호하게 잡기 때문에 
interface ITutorial {
    [key: string]: string;
    // name:number;  >> index signare를 사용하게 되면  통일되게 타입 지정이 필요함
    name1: string;
    [index: number]: string;
    //string으로 통일 하지 않으면 모호하며 안전성이 떨어지기 때문에 통일 되게 작성
}

let obj = {
    toString() {
        return "Hello";
    }
}

let foo: { [name: string]: string } = {};

// foo[obj ]= "World";
foo[obj.toString()] = "World";

let foo1: { [index: string]: { message: string } } = {};
foo1['a'] = { message: "some Message" };
console.log(foo1.a.message)


//함수 타입 지정
interface SearchFunc1 {
    (source: string, subString: string): boolean;
}
//함수 타입의 타입을 검사 할때 매개 변수의 이름이 일치 할 필요 없음!!
//TypeScript 의 컨텍스트 타입에 따라 인수 타입을 추론 할 수 있다

let mySearch1: SearchFunc1 = (src, subString) => {
    let result = src.search(subString);
    return result > -1;
}
// 인덱싱 가능 타입에는 객체로 인덱싱 하는데 사용할 수 있는 타입과 인덱싱 할때 해당 반환 타입을 설명하는 index signature가 필요!!

interface StringArray1 {
    [index: number]: string;
}

let myArray1 = ["Bob", "Fored"];
let mystr = myArray1[0];

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return `hello ${this.greeting}`;
    }
}

let greeter3 = new Greeter("world");

console.log(greeter3.greet());

class Animals {
    name: string;
    constructor(thisName: string) {
        this.name = thisName;
    }
    move(distanceMeter: number = 0) {
        console.log(`${this.name} moved ${distanceMeter} `);
    }
}
// 하위 클래스 에서 부모 요소를 사용하기 위해서는 super을 사용해야한다
class Snake extends Animals {
    constructor(name: string) {
        super(name);
    }
    move(distanceMeter = 5) {
        console.log("Slitering ... ");
        super.move(distanceMeter);
    }
}

class Horse extends Animals {
    constructor(name: string) {
        super(name);
    }
    move(distanceMeter = 45) {
        console.log("Horse Move ...");
        super.move(distanceMeter);
    }
}

let sam = new Snake("Samy the Python");
let tom: Animals = new Horse("Tommy the Palomino"); // Animals로 선언 되었지만 Horse로 로 실행되는 모습을 볼수 있다

sam.move();
tom.move(400);
//Typescript의 기본적인 멤버들은 public 으로 표시된다

class Animals1 {
    public name: string;
    public constructor(theName: string) {
        this.name = theName;
    }
    public move(distanceMeter: number) {
        console.log(`${this.name} moved ${distanceMeter}`);
    }
}

//private
class Animals2 {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Rhino extends Animals2 {
    constructor() { super("Rhino") };
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
let animal = new Animals2("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

// console.log(animal.name); >> private로 멤버를 지정하여 외부에서 접근 할 수 없다!!

animal = rhino;
//prtected 사용시 참조하는 클래스 간의 참조가 접근이 가능하지만 private와 같이 외부에서 접근할수 없다.
class Person1 {
    protected name: string;
    constructor(name: string) { this.name = name; };
}

class Employee1 extends Person1 {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    getElevatorpitch() {
        return `Hello my name is ${this.name} and I work in ${this.department}`;
    }

}


let howard = new Employee1("Howard", "Sales");
console.log(howard.getElevatorpitch());
// console.log(howard.name) >> protected을 사용하여 외부에서 사용 할 수 없다!!

let passcode = "Secret Passcode";

class Employee2 {
    private _fullName?: string;
    get fullName(): string {
        return this._fullName!;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("오류 : employee의 무단 업데이트!");
        }
    }
}

let employee3 = new Employee2();
employee3.fullName = "Bob Smith";
if (employee3.fullName) {
    console.log(employee3.fullName);
}
console.log("\n\n");
// javascript 에서의 getter setter 
//ES6에서 추가 되었고 계산 되어지는 프로퍼티 이름을 위해 expression이 추가 되었습니다
//동적으로 계산이 필요한 프로퍼티 값을 가져와야 할때 getter를 사용한다면 별도의 함수를 만들필요없음

var log = ["test"];
var obj1 = {
    get lastest() {
        if (log.length === 0) return undefined;
        return log[log.length - 1];
    },
    b: 123,
}
console.log(obj1.lastest);
// 객체가 이미 존재할때 defineProperty메소드로 getter를 정의 할 수 있다
var o = { a: 0 };
// Object.defineProperty(o, "b", { get: function () { return this.a + 1; } }); console.log(o.b)
//장점 
//캐싱 , 계산 미루기!!(접근하기 전에 그값이 계산되지 않기 때문에!!)
//setter는 객체 초기화때 선언 할 수 있습니다. 동적으로 setter가능!!

// var expr = "foo";
// var obj = { baz: "bar", set [expr](v) { this.baz = v; } };
// console.log(obj.baz); 
// "bar" obj.foo = "baz"; // run the setter console.log(obj.baz); // "baz"


function identufy<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

let output = identufy<string>(["Hello", "meter"]);


function getProperty < T ,K extends keyof T > ( obj  : T, key :K ){
    return obj[key];
}

let x1 = { a: 1 , b : 2 , c : 3 , d : 4 };

getProperty(x1,"a");
getProperty(x1,"m");

let mystr1: number = 123;





