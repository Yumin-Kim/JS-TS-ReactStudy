function greeter (person : number[] ){
    return "Hello ," + person
}

let user = [0,2,3];

interface Person{
    firstName:string;
    lastName : string;
}

function greeter1(person : Person){
    return `Hello ${person.firstName} ${person.lastName}`; 
}

const user1 = { firstName:"Jane" , lastName:"User" };


class Student {
    fullname:string;
    constructor( public firstName:string ,public middleInitial:string,public lastName:string ){
        this.fullname = `${firstName} ${middleInitial} ${lastName}`;
    }
}

function greeter2(person : Person){
    return `Hello ${person.firstName} ${person.lastName}`; 
}

const user2 = new Student("A","B","C");

let fullname1  = "Kim yu min";
let age = 100;

let sentence = `${age} +  ${fullname1}`;

let list : Array<string> = ["1","2","3",'4'];
function forEach1<T>(list : T[] , callbackFc:(value:T) => void ){
    for(let i = 0 ; i < list.length ; i ++){
        callbackFc(list[i]);
    }
}

forEach1(list,(value)=> console.log(value) );

let x: Array<number | string>;

x = ["Hello",1];
x[3] = "world";

enum Color {Red = 1000, Green ="Green Color is good" ,Blue = 1000};
let c : Color = Color.Green;
let c1 : Color = Color.Red;
let c2 : Color = Color.Blue;
console.log(c);
console.log(c1);
console.log(c2);

const tuple = [true , 1];


class Parent{
    foo = "";
}

class Child1 extends Parent{
    bar = "";
}

class Child2 extends Parent{
    baz = "";
}

const arr = [new Child1() , new Child2()]


//타입 단언  vs 타입 캐스팅

class Character {
    hp: number;
    runAway() {
      /* ... */
    }
    isWizard() {
      /* ... */
    }
    isWarrior() {
      /* ... */
    }
  }
  
  class Wizard extends Character {
    fireBall() {
      console.log("fireBall")
    }
  }
  
  class Warrior extends Character {
    attack() {
      /* ... */
    }
  }

  
  
  //함수를 봤을때 character 안에 fireBall이나 attack 함수가
  function battle(character: Character ) {
    if (character.isWizard()) {
      character.fireBall(); // Property 'fireBall' does not exist on type 'Character'.
    } else if (character.isWarrior()) {
      character.attack(); // Property 'attack' does not exist on type 'Character'.
    } else {
      character.runAway();
    }
  }










