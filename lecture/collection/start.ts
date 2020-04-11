//파일끼리 변수를 공유함 >> arr >> declared 선언 되었다고 에러 남
//타입 스크립트 할때 일단 자바스크립트로 프로그래밍후(변수에 타입을 적어주지 않고)
//모든 프로그래밍이 끝난후 타입 추론할 수 있는거 제외하고 타입을 적어 준다!!
//남이 만든 타입 지정을 하게되면 나중에 패키지 업데이트 될때 혹시나 문제가 발생할 수 있기 때문에 타입추론 활용!!
//내가 만든 타입은 타입 기입 꼭 해주기!!

let arr: (boolean | string | number)[] = [true, 2, 'hello'];
let arr1: [boolean, string, number] = [true, 'number', 3];//배열의 갯수 지정 >> tuple이라고 부름
let arr2: [true, 2, 'typescript'] = [true, 2, 'typescript']//더엄격하게 할수 있다
let arr3 = [true, 2, '3'] as const;//readonly로 상수로 표현할 수 있다
// arr3[1] = 3; read-only로 접근 할 수 없다!!
const obj: { a: string } = { a: 'b' };
obj.a = "hello"; // 변경 가능
const obj1 = { a: 'b' } as const;
// obj.b = "hello"; as const로 인해서 접근이 불가능 하다
const obj2: { a: string, b?: number } = { a: 'b' };//b라는 키의 여부를 모른다면 b?라고 명시 해줌!!

enum Color { Red, Green, Blue };
//Color['Red'] === 0;
//Color[0] === 'Red'
//
let c: Color = Color.Blue;
// console.log(c);


function add(a: number, b: number): number | string {
  return a + b;
}

function voidFun(a: number, b: number): void {
  // console.log('asd');
}

function callBack(a: number, b: number): (c: string) => (d: string) => boolean {
  return (c: string) => (d: string) => true
}

const objFun: { a: (b: number , c?:string) => string } = {
  a(b: number , c?:string) {
    return "hello";
  }
};

objFun.a(1);

// never 배열을 타입지정을 잘못했을때 발생
// const never : [] = [];
// never.push(1);

//any 는 아무 타입이 들어 갈 수 있다!! >> 자바스크립트 와 같음 >> TypeScript 사용할때 사용 비추춴
const hi : any = [];
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
const a = div as HTMLElement;
const a1 = <unknown>div  as number;
//위와 같이 관계(상속)이 있으면 as unknown을 할 필요가 없다

//interface를 활용하여 객체에 어떤 것이 들어 갈지 인터페이스 변수에 저장 해두고
//필요 할때마다 사용 >> 객체 생성시 타입 지정 계속 할 필요 없음
//Java class 와 유사
//C struct와 거의 흡사!!

interface face {
  a : string,
  b : number,
  c : boolean,
  d : (f:string)=> void, 
  e? : (f:string)=> string,
}

interface faceChild extends face{
  f : number,
}

const objface : face = {
  a : "hello",
  b : 5,
  c : true,
  d( a){console.log(a)},
}

const objfacrChild : faceChild = {
  a : "hello",
  b : 5,
  c : true,
  d( a){console.log(a)},
  f  : 5,
}

// console.log(objface.d("hello"))

//interface 선언 할시 as const와 같은 상수 데이터 타입을 만들기 위해서 
// readonly를 사용하면 된다
//객체를 어떻게 만들지 >> class와 유사 상속 가능
//같은 인터페이스 명으로 여러번 선언 가능
interface ABC {
  readonly a : '1',
  readonly b : string,
  readonly c : number,
}
interface ABC {
  d : number
}


const abc : ABC= {
  a: '1',
  b : '2',
  c : 3,
  d : 5,
}
// key 값이 명확 하지 않을때 [key: string] 을 사용하여  포괄적으로 적어준다
interface Rename{
  a:number,
  b:number,
  [key : string] : number;
} 

const abcd : Rename = {
  a:123,
  b:1234,
  rename:1234,
}

// type alias(타입 별명) 인터페이스처럼 반복 선언은 안됨
// 타입이 넓은 범위
//C 언어의 typedef 과 유사한 역할을 한다 ??
// 객체 등등 여러 가지를 할수 있다
type HELLO = string | number;

type OBJECT = { a?: string , b : number } | number;

const str : HELLO = 'string';

const numOrobj : OBJECT = 123;

const objOrnum : OBJECT = {
  b:132,
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const  code :number = 1;
interface Listface{
  readonly a : 1,
  readonly b : 2,
  readonly c : 3,
}

const list : Listface = {
  a:1,
  b:2,
  c:3
}
// 'a'|'b'|'c' union이라고 부름
//[ 'a' , 'b' ,'c' ]  tuple이라고 부름
//find와 같이 최신 문법을 사용하면 lib에서 최신문법 추가 해주기 lib의 기본으론 DOM ES5 추가!!
//lib 해결해도 에러남 >> find d.ts보면 T | undefined 여서 에러 남(Type 'undefined' is not assignable to type) >> 해결 법은 마지막에 !사용 !는 프로그래머 보증하여 값이 나온다는 뜻을 가짐
//해도 Error가 나는데 Error잡을려면 tsc -w 파일명을 구체적으로 기입하지않는다!!>> 파일명을 적게 되면 tsconfig.json이 무시 된다
//keyof는 인터페이스가 객체와 같은 형태로 선언시 키값만을 가지고 온다
function beforecorrect(code : 1 | 2 | 3 ) : 'a'|'b'|'c'  {
  return (Object.keys(list) as [ 'a' , 'b' ,'c' ]).find(e => list[e] === code)!;
}
// function aftercorrect(code : Listface[keyof Listface] ) : keyof Listface  {
//   return Object.keys(list).find(e => list[e] === code)!;
// }


/////////////////////////////////////////////////////
//가위바위보 예시

interface RSP {
  ROCK: '0';
  SCISSORS: '-142px';
  PAPER: '-284px';
}

const rsp: RSP = { // 딕셔너리 자료구조
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
  btn.addEventListener('click', function (this : HTMLButtonElement,e) {
    e.preventDefault
    const myChoice = this.textContent as keyof RSP;
    const myScore = score[myChoice];
    //   let imgCoords: RSP[keyof RSP] = '0'; >> 필요!!
    // const computerScore = score[computerChoice(imgCoords)!] >> !;
   });
 });
 //타입 스크립트는 타입의 범위를 넓게 잡아 주지만 프로그래머는 그것을 좁히는 역할을 해야함!! >> 타입 스크립트는 문자열을 인식못함 ex) #computer
//document.querySelecotor()할때 태그 있는지 없는지 타입 스크립트는 모른다
// document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
// 해결하기 위해 조건문 이용 
const computer = document.querySelector<HTMLDivElement>('#computer'); 
if(computer){
  //또 에러 발생 style >> Elements 관련 타입 에러 제네릭(제너릭 에러는 따로 변수 처리 필요) , as로 해결
  computer.style.background ='';
  (document.querySelector('#computer') as HTMLDivElement).style.background ='';
}

////가위바위보 3강끝

/// 자스스톤  4강시작
// interface new (min :boolean); >> 표현 가능
interface ICard {
  att? : number;
  hp? : number;//public 아니면 에러남
}
class Card1 implements ICard{
  att:number;
}


class Card implements ICard{ //implements 좀더 엄격하게 할려고 사용 >>public이 되는 경우 강제 해야할때 사용/실질적으로 Class를 사용하지 않으면 interface 사용!!
  //자유도 제한을 위해 public protected private
  public att? :number;// 어디서나 접근 가능 >> 이렇게 에러가 나는 이유는 인터페이스는 number만 타입지정을 했는데 class에서 undefined도 포함하여서 에러 발생
  protected hp? :number;//상속받는 자식 클래스만 사용 가능
  private cost? :number;//클래스 내부에서만 사용 가능
  private mine? : boolean;//? 붙이는 이유 : 존재는 하되 타입스크립트는 조건문에 있는 변수를 알지 못해서
  constructor(hero :boolean , mine : boolean){
    if(hero){
      return new Hero(mine);
    }else{
      this.att = Math.random();
      this.hp = Math.random();
      this.cost = this.att + this.hp;
    }
    if(mine){
      this.mine = true;
    }
  }
}

class Hero extends Card{//특별한 카드 !!
  private hero : boolean;
  private field : boolean;
  constructor(mine : boolean){
    super(true , mine);
    this.att = 50;
    this.hp = 20;
    this.hero = true;
    this.field = true;
  }
}
const card = new Card(true,true);


interface Player{
  hero : HTMLDivElement,
  deckData : Card[]
  heroData? : Card | null;
  fieldData? : Card[] //?사용시 옵션을  true할때 Card | undefined를 구별해준다
  chose : Card | null // 옵션 사용시 NULL또 사용 가능!! (null undefined 구별하게 된다)
}

const hello1 : Player = {
  hero : document.querySelector('#computer') as HTMLDivElement,
  deckData:[],
  heroData:null,
  fieldData:[],
  chose:null,
}

//제네릭
//짝 맞추기에 비유할수 있고 새로운 타입을 하나 만들어 준다고 생각
//변수 뒤에 <T>선언 필수
// 자리만 지정 해주고 사용할때 변수 지정!!
// 이와 비슷 type T = string | number; 
interface Change<T>{
  add:(a : T , b : T) => T;
}

const aChange : Change<number> = {
  add : (a,b) =>a+b,
};

const sChange : Change<string> = {
  add: (a,b) => a+b,
}

aChange.add(1,2);
sChange.add('Hello' , "World");

//제네릭에서 extends 는 제약을 두는 것!! >> 타입 제한!!
interface Change1<T extends string>{
  add:(a : T , b : T) => T;
}

// const aChange1 : Change1<number> = {
//   add : (a,b) =>a+b,
// };

[1,2,'3'].forEach(e =>console.log(e));
// forEach 구현
//T[] = Array<T>같음
function forEach1<T>(arr : T[] ,callBack:(item:T)=> void ) :void {
  for( let i = 0 ; i < arr.length ; i ++)
    callBack(arr[i])
}

console.log(forEach1<string>(['1','2','3'],()=>{}));

// 함수지향 에서 매개변수를 넘길때 객체로 넘긴다
//이유는 인자가 한없이 늘어 날수 있고 좀 더 직관성있는 어떤 매개변수 있지 알수 있음
const dummy = { mine : true , count : 5 };
createFun(dummy);
interface Destract{
  mine:boolean
  count : number
}
function createFun({ mine , count } :Destract) {
  //매개변수를 구조분해 했을때 타입 선언은 뒤에 해준다!!
  // { mine:boolean , count:number  } 이렇게 선언시 X
}

//타입스크립트는 HTML , 문자열 은 못알아보기때문에 개발자가 확신을 주기 위해서 !필요
//querySelecotor() as HTMLDivElement 사용 많이함!! 

// 타입 가드 is 를 사용 >> interface
interface Big {
  a:number;
  b?:number;
}

class sizeS implements Big{
  public a :number;
  constructor(){
    this.a = 10;
    console.log(a);
  }
}

class sizeL implements Big{
  public a: number;
  public b : number;
  constructor(){
    this.a =0 , this.b=20;
    console.log(this.a+this.b);
  }
}
//큰 클래스 에서 is를 사용하여 타입 가드 인터페이스 상속?? 받은 class에 요소가 있는지 없는지 확인 가능!!
//넓은 타입을 좁은 타입으로 변경 가능!!>> as 안쓰는 방버!!
function isSmall(data : Big): data is sizeL{
  const aaa = (data as sizeL).b;//>>타입가드 안쓸거면 이렇게 해야함!!
  console.log(aaa);
  if(data.b){
    return true;
  }else{
    return false;
  }
}

document.querySelectorAll('.asd').forEach(()=>{})
document.querySelectorAll<HTMLDivElement>('.asd').item(0)

////4강 끝/////////////////////

//5강 시작!!
//모듈 시작
//module파일 참조
//mainobj.ts 참고 >> 모듈화 하는 과정 연습 
//모듈 할때는 무조건 target을 es6로!!
// 꼭 확인 할것 최신문법이여서 브라우저에 아직 적동 하지 않는다
//모든 문법들이 익숙해지면 남의 라이브러리 확인하기
//특피 Redux 는 TS공부할때 좋음
//declare 없는 타입을 새로 만들때 >> d.ts에서 만들때 ambientmodule??라고 부름
//    (///)트리플 슬래시라고하면 첨 문장에 있음(d.ts)파일 >>renference type="">>이런씩으로 참조 하고있다
//위처럼 import 할수 있는데 안하는 이유 ? 두가지 방법이 있지만 다른 패키지를 참조 하기위해서 사용 >> 타입 만들때 사용( 자기라이브러리에 필요한 타입가지고 올때 )
// 각 패키지마다 타입정의(d.ts)파일이 없으면 직접 타이핑 해서 만들어야함!!
//패키지마다 index.d.ts가 있으면 수월!! 꼭 확인 할것!!
//index.d.ts파일이 없으면 당황하지말구 TypeScript commuity가 잘되어 있기때문에 d.ts가 있음
// definitely Typed 들어가면 누군가 d.ts가 있음!!
// ex) definitely Typed에서 jquery를 설치 하고 싶을때
//npm i jquery @types/jquery 이런식으로 jquery 패키지와 typed를 다운받는다
//d.ts파일 에서 수 많은 export 들을 한번에 묶을때 export as namespace 변수명 이렇게 하면 import * as 변수명 './파일명' 이렇게 한것과 똑같다!!

//React 할때 
//React >>d.ts보면 
//export = React; >> import * as React from 'react';이지만
//export as namespace React; 로 인해서 import React from 'react'; 할 수 있다
//namespace로 인해서 React.Component 이런씩으로 객체 접근이 가능하다

//유명하지 않은 라이브러리들은 typed에도 제공되지 않는다
//파일 types참조

//6강 또 새로운 기능 공부

//intersection
interface A {
  Hello:string;
}
interface B {
  hi:string;
}
interface C {
  bye:string;
}

const union : A | B | C  = {
  Hello : "hello",
}
//intersection >> 간혹 프로그래밍 하다가 중복되는 선언을 방지 하기위해서
//밑에 interface와 같이 A,B,C에 있는 멤버를 중복되게 선언하는 경우를 배제 하기 위해서
interface ABCsection{
  Hello:string;
  hi:string;
  bye:string;
}
const intersection : A & B & C  = { //A,B,C세가지 인테페이스 멤버를 다 가지고 있어야함
  Hello : "hello",
  hi : "hello",
  bye : "hello",
}
//ts가 감시 하고 있지 않으면 정확한 타입 분석을 안함!!
//무조건 tsc 킨 상태로 타입 확인!!
//타입 정확히 적으면 result 가 된다
const result1 = Array.prototype.map.call([1,2,3],(item)=>{
  return item.tofixed(1)
})

const result = Array.prototype.map.call<number[], [(item: number) => string], string[]>([1, 2, 3], (item) => {
  return item.toFixed(1)
})
//result: ['1.0','2.0','3.0']

//utility 요소들 꼭 확인 하기 https://www.typescriptlang.org/docs/handbook/utility-types.html
interface Utility {
  type : 'TypeScript',
  num : 10,
  text : true,
  readonly real:'hello';
}

const beforeObj :Utility = {
  type : 'TypeScript',
  num : 10,
  text : true,
  real:'hello',
} 
//유틸리티 요소중 Partial을 사용하면 인터페이스 일부분만 구현 가능
const afterObj : Partial<Utility> = {
  num : 10,
  text : true,
}
//유틸리티 요소중 Readonly를 사용하면 인터페이스 한번에 readonly로 변경 가능
const readonlyObj : Readonly<Utility> = {
  type : 'TypeScript',
  num : 10,
  text : true,
  real:"hello",
}

const requireObj : Required<Utility> = {
  type : 'TypeScript',
  num : 10,
  text : true,
  real:'hello',
}

//유틸리티 요소중 ReaturnType 자주 사용!!
//알고 있으면 유용!! 중복제거 유용!!

//데코레이터 Class많이 이용!! 
//Class안에 기능을 수정!!
//멥버가 겹칠때 이용하는데 예시에서는 gender가 겹친다고 가정
//데코레이터 관련 함수 안에 매개변수는 typeod 클래스명 이렇게 선언 필요!!
function makeGender(params: typeof Person1) {
  //실제 함수와 똑같이 동작!!
  return class extends params{ // 원본을 넣어서  안에는 꾸며줄 멤버등을 넣어주면 데코레이터가 포함된class에 모두 포함
    //여러가지 멤버를 추가할수 있음
    gender = "man";
    gerGender (){
      return this.gender; 
    }
  }
}
// "experimentalDecorators": true, 옵션에 추가해야함!! 정식으로 안나옴!!

function readonly(params : any , paramsKey : any , descriptor : PropertyDescriptor) :any {
  console.log(params,paramsKey); // params>>class 자체 ,parmasKey >> 함수명
  // descriptor.writable = false;
  //writeable 수정 가능 여부
  //configuarable 설정 가능 여부
  //enumerable 반복 가능 여부
}
function readonlyProperty(params : any , paramsKey : any , index : number) :any {
  //param에 들어가는 데코리이터는 마지막 인자는 index이다!!
  //reflect 관련 공부 필요!!
}



@makeGender //데코레이터 선언하고 바로 아래줄을 꾸며주고
class Person1 {
  // @validate text:string; 이렇게 옆에 데코레이터를 추가하면 오른쪽을 데코레이트 할수 있다
  title:string;
  age = 23;
  constructor(title : string){
    this.title = name;
  }
  setTitle(@readonlyProperty title : string){
    
  }
  @readonly
  sayTitle() : any{
    return this.title
  }

}

@makeGender
class Person2 {
  title:string;
  age = 23;
  constructor(){
    this.title = name;
  }
  setTitle(title : string){
    
  }
  sayTitle(){
    return this.title
  }

}

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



