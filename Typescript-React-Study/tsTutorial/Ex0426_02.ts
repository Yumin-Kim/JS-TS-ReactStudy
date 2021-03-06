//이해 했거나 사용해본건 표시!!!!


// 첫번째는 교차타입입니다! >> intersection type 간혹 프로그래밍 하다가 중복되는 선언을 방지 하기 위해서!!
// 다양한 타입을 하나로 결합해서 모든 기능을 갖춘 단일 타입을 얻는 방식입니다.
// 예를 들어, Person & Serializable & Loggable은 Person,Serializable,Loggable의 모든 멤버를 가집니다.
interface A_1 {
    java:string;
}
interface B_1 {
    javascript : string;
}

interface C_1 {
    Phython :number;
}
//세가지 인터페이스를 하나로 뭉쳐서 가지고옴!!
const intersection_1 : A_1 & B_1 & C_1 = {
    java: "stin",
    javascript:"stirng",
    Phython:123,
}

function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

class Person {
    constructor(public name: string) { }
}

interface Loggable {
    log(name: string): void;
}

class ConsoleLogger implements Loggable {
    log(name) {
        console.log(`Hello, I'm ${name}.`);
    }
}

const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);

//유니온 타입>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//밑에 코딩한거와 같이 모든 타입의 공통적인 멤버에만 접근할수 있따!!
interface Bird {
    fly(): void;
    layEgg(): void;
}
interface Fish {
    swim(): void;
    layEgg(): void;
}
function getSmallPet(): Fish | Bird | void {
    // return console.log("asd");
}

let pet = getSmallPet();
// pet.layEgg();
// pet.swim();

//어느쪽 타입이 가지고 있지 않은 메소드르 실행 해야할때는 어떨게 하면 좋을까?
//타입 단언에 타입 가드 포함 시키면 컴파일 에러 발생이 나지않는다!!
if ((pet as Fish).swim) {
    (pet as Fish).swim();
} else {
    //뒤에다 제너릭 사용시 에러 
    (<Bird>pet).fly();
}
//이와 같이 타입 단언을 난무 할시 코드 가독성이 떨어진다
// 변수 is interface 사용한 문법이 타입 명제!! XX는 XX다 형식으로 사용 한다!!

type animals = Fish | Bird;
function isFish(pet: animals): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// if(isFish(pet)){
//     pet.swim();
// }else{
//     pet.fly();
// }

//타입가드의 return 값이 true이면 명제가 옳다는 것으로 인식한다

//typeof 타입 가드 사용X 이해O >>>>>>>>>>>>>>>>>>>>>
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
let aaa: string | null;

//선택적 매개변수와 프로퍼티!!
//--strictNullChecks true후에 선택저 매개 변수와 함께 쓰면 자동으로 | undefined를 추가!!
function f(x: number, y?: number) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
// f(1, null);

class C {
    a?: number;
    b?: number;
}
let cal = new C();
cal.a = 12;
cal.a = undefined; // 오류, 'undefined'를 'number'에 할당 할 수 없습니다
cal.b = 13;
cal.b = undefined; // ok
cal.b = null; 


//null 타입 제거 !!
function f1(sn: string | null): string {
    if (sn === null) {
        return "default";
    } else {
        return sn;
    }

}
// 컴파일러가 name이 null일 수 있다고 판단하는 이유는, 외부 함수에서 호출한 경우 중첩된 함수에 대한
// 모든 호출을 추적하는 것이 불가능하기 때문입니다(즉시실행함수-IIFE의 경우 가능).
function broken(name: string | null): string {
    function postfix(epithet: string) {
        // return name.charAt(0) + epithet; >> null로 인해서 에러 발생!!
        return name!.charAt(0) + epithet;
    }
    name = "Hello" || name;
    return postfix("great");
}
//위 코드를 즉시 실행 함수로 변경하면 null 해결!!
function broken1(name: string | null): string {
    name = name || "Bob";
    return (function postfix(epithet: string) {
        // 즉시실행함수이기때문에 name이 null이 아니라는 것을 알고있음
        return name.charAt(0) + '.  the ' + epithet;
    })("great")
}

//type >> 타입 별칭(Type Aliases)
//타입 별칭은타입의 새로운 이름을 생성한다!
type LinkedList<T> = T & { next: LinkedList<T> };
//>>>>>>>>>>>>>>>>>>>>>이해 X 
interface Person {
    name: string;
}

// var people_2: LinkedList<Person>;
// var s = people_2.name;
// var s = people_2.next.name;
// var s = people_2.next.next.name;
// var s = people_2.next.next.next.name;
//interface 와 type alias 차이!!

type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

//차이는 확장성에서 차이가 난다!
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle;
function area(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

// >>>>>>>>>>>>>>>>이해 O 자바랑 비슷
//this가 달라지는 모습을 볼수 있다 class에서 선언되는 당시의 class를 this로 선정!!
class BasicCalculator {
    constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    add(operand: number): this {
        this.value += operand;
        return this;
    }
}


class ScientifiCalculator extends BasicCalculator {
    constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}

let v1 = new BasicCalculator(2).add(100).currentValue();

let v2 = new ScientifiCalculator(2).add(1000).sin().currentValue();

console.log("new BasicCalculator", v1);
console.log("new ScientifiCalculator", v2);

//index types 인덱스 타입을 사용하면 동적 프로퍼티이름을 사용하는 컴파일러가 검사 하도록 할수 있다
function pluck<T, K extends keyof T>(o: T, name: K[]): T[K][] {
    return name.map(n => o[n]);
}

interface Person_1 {
    name: string;
    age: number;
    sex: string
}

let Person_v = {
    name: "Yumin",
    age: 35,
};

let strings = pluck(Person_v, ["name", "age"]);

type person_v_union = keyof Person_1;

//새로운 연산자 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>이해 O
//keyof T >> T관련되어 union타입으로 변경 "name" | "age"
//T[K] >> Person_1["name"] >> string // Person_01["age"] >> number // >> (string | number)[]식의 결과값을 출력 하게 된다!!

//Mapped Types  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>이해 O
//타입을 만들다보면 프로퍼티들이 선택적 프로퍼티이거나 혹은 Readonly일떄가 있습니다!!
//한가지로 전부 매핑하는방법!!
type Readonly_1<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial_1<T> = {
    [P in keyof T]?: T[P];
}
type Nullable<T> = { [P in keyof T]: T[P] | null }

type PersonPartial = Partial_1<Person_1>;
type ReadonlyPerson = Readonly_1<Person_1>;
type TutorialNULL = Nullable<Person_1>

let person2: PersonPartial = { name: 'John', sex: "male" } // 모든 프로퍼티가 선택적, age 프로퍼티가 없지만 통과
let person3: ReadonlyPerson = { name: 'Henry', age: 32, sex: 'male' }

//// for in 문의 문법
// for (변수 in 객체식) {
//     // 문장 console.log(변수 , 객체[변수]) >> 키 , 키에 해당하는 값
// }

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// interface from mapped types 언래핑 하는 방법!!

function unwrapReadonly<T>(t:Readonly_1<T>) : T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k];
    }
    console.log(result);
    return result;
}

let person_2 : PersonPartial = { name: "John", age: 23 };
let person_3 : ReadonlyPerson = { name: "Henry", age: 32, sex: "male" };

let unwrappedReadonly : Person_1 = unwrapReadonly(person_3);


type TypeName <T> = 
    T extends string ? "string":
    T extends number ? "number":
    T extends boolean ? "boolean":
    T extends undefined ? "undefined":
    T extends Function ? "Function": 
    "object";

type T0 = TypeName<string>;
type T1 = TypeName<"a">;
type T2 = TypeName<true>;
  
    
// declare const typeName : Person;

// export default TypeName;












