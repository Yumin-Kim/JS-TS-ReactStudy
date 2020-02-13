"use strict";
//파일끼리 변수를 공유함 >> arr >> declared 선언 되었다고 에러 남
//타입 스크립트 할때 일단 자바스크립트로 프로그래밍후(변수에 타입을 적어주지 않고)
//모든 프로그래밍이 끝난후 타입 추론할 수 있는거 제외하고 타입을 적어 준다!!
//남이 만든 타입 지정을 하게되면 나중에 패키지 업데이트 될때 혹시나 문제가 발생할 수 있기 때문에 타입추론 활용!!
//내가 만든 타입은 타입 기입 꼭 해주기!!
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
let arr = [true, 2, 'hello'];
let arr1 = [true, 'number', 3]; //배열의 갯수 지정 >> tuple이라고 부름
let arr2 = [true, 2, 'typescript']; //더엄격하게 할수 있다
let arr3 = [true, 2, '3']; //readonly로 상수로 표현할 수 있다
// arr3[1] = 3; read-only로 접근 할 수 없다!!
const obj = { a: 'b' };
obj.a = "hello"; // 변경 가능
const obj1 = { a: 'b' };
// obj.b = "hello"; as const로 인해서 접근이 불가능 하다
const obj2 = { a: 'b' }; //b라는 키의 여부를 모른다면 b?라고 명시 해줌!!
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
//Color['Red'] === 0;
//Color[0] === 'Red'
//
let c = Color.Blue;
// console.log(c);
function add(a, b) {
    return a + b;
}
function voidFun(a, b) {
    // console.log('asd');
}
function callBack(a, b) {
    return (c) => (d) => true;
}
const objFun = {
    a(b, c) {
        return "hello";
    }
};
objFun.a(1);
// never 배열을 타입지정을 잘못했을때 발생
// const never : [] = [];
// never.push(1);
//any 는 아무 타입이 들어 갈 수 있다!! >> 자바스크립트 와 같음 >> TypeScript 사용할때 사용 비추춴
const hi = [];
hi.push(1);
// console.log(hi);
//d.ts import 해서 변수 사용시 원하는 타입이 아닐때
//Type casting
//const num : number;
//(num as unknown as string).substr(1,2)
//(<string><unkown>num).substr(1,2) >> 제네릭을 활용하는 방법이 있디!!
//여기서 as unknown울 사용 하는 이유는 import한 변수의 타입이 완전히 다르고 
//부모,자식 관계가 아니기 때문에 as unkown을 사용해야 한다
const div = document.createElement('div');
const a = div;
const a1 = div;
const objface = {
    a: "hello",
    b: 5,
    c: true,
    d(a) { console.log(a); },
};
const objfacrChild = {
    a: "hello",
    b: 5,
    c: true,
    d(a) { console.log(a); },
    f: 5,
};
const abc = {
    a: '1',
    b: '2',
    c: 3,
    d: 5,
};
const abcd = {
    a: 123,
    b: 1234,
    rename: 1234,
};
const str = 'string';
const numOrobj = 123;
const objOrnum = {
    b: 132,
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const code = 1;
const list = {
    a: 1,
    b: 2,
    c: 3
};
// 'a'|'b'|'c' union이라고 부름
//[ 'a' , 'b' ,'c' ]  tuple이라고 부름
//find와 같이 최신 문법을 사용하면 lib에서 최신문법 추가 해주기 lib의 기본으론 DOM ES5 추가!!
//lib 해결해도 에러남 >> find d.ts보면 T | undefined 여서 에러 남(Type 'undefined' is not assignable to type) >> 해결 법은 마지막에 !사용 !는 프로그래머 보증하여 값이 나온다는 뜻을 가짐
//해도 Error가 나는데 Error잡을려면 tsc -w 파일명을 구체적으로 기입하지않는다!!>> 파일명을 적게 되면 tsconfig.json이 무시 된다
//keyof는 인터페이스가 객체와 같은 형태로 선언시 키값만을 가지고 온다
function beforecorrect(code) {
    return Object.keys(list).find(e => list[e] === code);
}
const rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
}; // as const도 설명
const score = {
    SCISSORS: 1,
    ROCK: 0,
    PAPER: -1,
};
//Before
// document.querySelectorAll('.btn').forEach((btn) => {
//   btn.addEventListener('click', function (this,e) {
//     e.preventDefault
//     const myChoice = this.textContent;
//     const myScore = score[myChoice];
//     const computerScore = score[computerChoice(imgCoords)!];
//    });
//  });
// After
//변수의 타입을  정확히 지정 할 필요 있음!! 지정 안할시 관련되 로직 박살남
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
        e.preventDefault;
        const myChoice = this.textContent;
        const myScore = score[myChoice];
        //   let imgCoords: RSP[keyof RSP] = '0'; >> 필요!!
        // const computerScore = score[computerChoice(imgCoords)!] >> !;
    });
});
//타입 스크립트는 타입의 범위를 넓게 잡아 주지만 프로그래머는 그것을 좁히는 역할을 해야함!! >> 타입 스크립트는 문자열을 인식못함 ex) #computer
//document.querySelecotor()할때 태그 있는지 없는지 타입 스크립트는 모른다
// document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
// 해결하기 위해 조건문 이용 
const computer = document.querySelector('#computer');
if (computer) {
    //또 에러 발생 style >> Elements 관련 타입 에러 제네릭(제너릭 에러는 따로 변수 처리 필요) , as로 해결
    computer.style.background = '';
    document.querySelector('#computer').style.background = '';
}
class Card {
    constructor(hero, mine) {
        if (hero) {
            return new Hero(mine);
        }
        else {
            this.att = Math.random();
            this.hp = Math.random();
            this.cost = this.att + this.hp;
        }
        if (mine) {
            this.mine = true;
        }
    }
}
class Hero extends Card {
    constructor(mine) {
        super(true, mine);
        this.att = 50;
        this.hp = 20;
        this.hero = true;
        this.field = true;
    }
}
const card = new Card(true, true);
const hello1 = {
    hero: document.querySelector('#computer'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chose: null,
};
const aChange = {
    add: (a, b) => a + b,
};
const sChange = {
    add: (a, b) => a + b,
};
aChange.add(1, 2);
sChange.add('Hello', "World");
// const aChange1 : Change1<number> = {
//   add : (a,b) =>a+b,
// };
[1, 2, '3'].forEach(e => console.log(e));
// forEach 구현
//T[] = Array<T>같음
function forEach1(arr, callBack) {
    for (let i = 0; i < arr.length; i++)
        callBack(arr[i]);
}
console.log(forEach1(['1', '2', '3'], () => { }));
// 함수지향 에서 매개변수를 넘길때 객체로 넘긴다
//이유는 인자가 한없이 늘어 날수 있고 좀 더 직관성있는 어떤 매개변수 있지 알수 있음
const dummy = { mine: true, count: 5 };
createFun(dummy);
function createFun({ mine, count }) {
    //매개변수를 구조분해 했을때 타입 선언은 뒤에 해준다!!
    // { mine:boolean , count:number  } 이렇게 선언시 X
}
class sizeS {
    constructor() {
        this.a = 10;
        console.log(a);
    }
}
class sizeL {
    constructor() {
        this.a = 0, this.b = 20;
        console.log(this.a + this.b);
    }
}
//큰 클래스 에서 is를 사용하여 타입 가드 인터페이스 상속?? 받은 class에 요소가 있는지 없는지 확인 가능!!
//넓은 타입을 좁은 타입으로 변경 가능!!>> as 안쓰는 방버!!
function isSmall(data) {
    const aaa = data.b; //>>타입가드 안쓸거면 이렇게 해야함!!
    console.log(aaa);
    if (data.b) {
        return true;
    }
    else {
        return false;
    }
}
document.querySelectorAll('.asd').forEach(() => { });
document.querySelectorAll('.asd').item(0);
const union = {
    Hello: "hello",
};
const intersection = {
    Hello: "hello",
    hi: "hello",
    bye: "hello",
};
//ts가 감시 하고 있지 않으면 정확한 타입 분석을 안함!!
//무조건 tsc 킨 상태로 타입 확인!!
//타입 정확히 적으면 result 가 된다
const result1 = Array.prototype.map.call([1, 2, 3], (item) => {
    return item.tofixed(1);
});
const result = Array.prototype.map.call([1, 2, 3], (item) => {
    return item.toFixed(1);
});
const beforeObj = {
    type: 'TypeScript',
    num: 10,
    text: true,
    real: 'hello',
};
//유틸리티 요소중 Partial을 사용하면 인터페이스 일부분만 구현 가능
const afterObj = {
    num: 10,
    text: true,
};
//유틸리티 요소중 Readonly를 사용하면 인터페이스 한번에 readonly로 변경 가능
const readonlyObj = {
    type: 'TypeScript',
    num: 10,
    text: true,
    real: "hello",
};
const requireObj = {
    type: 'TypeScript',
    num: 10,
    text: true,
    real: 'hello',
};
//유틸리티 요소중 ReaturnType 자주 사용!!
//알고 있으면 유용!! 중복제거 유용!!
//데코레이터 Class많이 이용!! 
//Class안에 기능을 수정!!
//멥버가 겹칠때 이용하는데 예시에서는 gender가 겹친다고 가정
//데코레이터 관련 함수 안에 매개변수는 typeod 클래스명 이렇게 선언 필요!!
function makeGender(params) {
    //실제 함수와 똑같이 동작!!
    return class extends params {
        constructor() {
            super(...arguments);
            //여러가지 멤버를 추가할수 있음
            this.gender = "man";
        }
        gerGender() {
            return this.gender;
        }
    };
}
// "experimentalDecorators": true, 옵션에 추가해야함!! 정식으로 안나옴!!
function readonly(params, paramsKey, descriptor) {
    console.log(params, paramsKey); // params>>class 자체 ,parmasKey >> 함수명
    // descriptor.writable = false;
    //writeable 수정 가능 여부
    //configuarable 설정 가능 여부
    //enumerable 반복 가능 여부
}
function readonlyProperty(params, paramsKey, index) {
    //param에 들어가는 데코리이터는 마지막 인자는 index이다!!
    //reflect 관련 공부 필요!!
}
let Person1 = class Person1 {
    constructor(title) {
        this.age = 23;
        this.title = name;
    }
    setTitle(title) {
    }
    sayTitle() {
        return this.title;
    }
};
__decorate([
    __param(0, readonlyProperty)
], Person1.prototype, "setTitle", null);
__decorate([
    readonly
], Person1.prototype, "sayTitle", null);
Person1 = __decorate([
    makeGender //데코레이터 선언하고 바로 아래줄을 꾸며주고
], Person1);
let Person2 = class Person2 {
    constructor() {
        this.age = 23;
        this.title = name;
    }
    setTitle(title) {
    }
    sayTitle() {
        return this.title;
    }
};
Person2 = __decorate([
    makeGender
], Person2);
new Person1('hello');
//타입 스크립트는 컴파일 역할만
// 성능과는 무관 실수를 잡아줌!!
// 결과는 js로만 할뿐  빌드만 오래 걸림
//컴파일 언어는 빌드 타입이 오래걸리는데 타입스크립트와 유사
//실행전에도 에러 확인 가능!!
//마지막 강좌
// ?.옵션nullChainong ex)const a = document.querySelcotor(".str")?.innerHTML >> 태그가 있으면 접근 없으면 접근하지 않는다 
//a.b?.() >> a안에 b Method가 있으면 접근 없으면 접근하지 않는다
//!확신을 줄때
//타입 스크립트 코딩시 자바스크립트 한번에 코딩후에 고치기!!
//
