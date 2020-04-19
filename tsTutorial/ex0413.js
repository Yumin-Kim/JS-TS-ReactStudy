"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function greeter(person) {
    return "Hello ," + person;
}
var user = [0, 2, 3];
function greeter1(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user1 = { firstName: "Jane", lastName: "User" };
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullname = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter2(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user2 = new Student("A", "B", "C");
var fullname1 = "Kim yu min";
var age = 100;
var sentence = age + " +  " + fullname1;
var list = ["1", "2", "3", '4'];
function forEach1(list, callbackFc) {
    for (var i = 0; i < list.length; i++) {
        callbackFc(list[i]);
    }
}
forEach1(list, function (value) { return console.log(value); });
var x;
x = ["Hello", 1];
x[3] = "world";
var Color;
(function (Color) {
    Color[Color["Red"] = 1000] = "Red";
    Color["Green"] = "Green Color is good";
    Color[Color["Blue"] = 1000] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
var c1 = Color.Red;
var c2 = Color.Blue;
console.log(c);
console.log(c1);
console.log(c2);
var tuple = [true, 1];
var Parent = /** @class */ (function () {
    function Parent() {
        this.foo = "";
    }
    return Parent;
}());
var Child1 = /** @class */ (function (_super) {
    __extends(Child1, _super);
    function Child1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bar = "";
        return _this;
    }
    return Child1;
}(Parent));
var Child2 = /** @class */ (function (_super) {
    __extends(Child2, _super);
    function Child2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baz = "";
        return _this;
    }
    return Child2;
}(Parent));
var arr = [new Child1(), new Child2()];
//타입 단언  vs 타입 캐스팅
//타입 단언은 오직 컴파일타임에서만 타입 변경
//타입 캐스팅은 런타임,컴파잍 타임 둘다 영향을 미친다(모두의 타입 변경)
//타입 단언시 <Type> 또는 as Type이런식으로 선언할 수 있다
// as Type을 추천한다 <Type> 을 사용시 jsx와 겹칠 수 있기 때문에!!
var Character = /** @class */ (function () {
    function Character() {
    }
    Character.prototype.runAway = function () {
        /* ... */
    };
    Character.prototype.isWizard = function () {
        console.log("isWizard");
        return false;
    };
    Character.prototype.isWarrior = function () {
        console.log("isWarrior");
        return false;
    };
    return Character;
}());
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    function Wizard() {
        return _super.call(this) || this;
    }
    Wizard.prototype.fireBall = function () {
        console.log("fireBall");
        return true;
    };
    return Wizard;
}(Character));
var Warrior = /** @class */ (function (_super) {
    __extends(Warrior, _super);
    function Warrior() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Warrior.prototype.attack = function () {
        /* ... */
    };
    return Warrior;
}(Character));
//함수를 봤을때 character 안에 fireBall이나 attack 함수가 없어서 에러남
function battle(character) {
    if (character.isWizard()) {
        character.fireBall(); // Property 'fireBall' does not exist on type 'Character'.
    }
    else if (character.isWarrior()) {
        character.attack(); // Property 'attack' does not exist on type 'Character'.
    }
    else {
        character.runAway();
    }
}
var regex = new RegExp(/pattern/);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ coulr: "square", width: 500 });
var mySquare1 = createSquare({ color: "square", width: 500 });
var mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
var myArray = ["Bob", "Hello"];
var Clock = /** @class */ (function () {
    function Clock() {
        this.currentTime = new Date();
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var obj = {
    toString: function () {
        return "Hello";
    }
};
var foo = {};
// foo[obj ]= "World";
foo[obj.toString()] = "World";
var foo1 = {};
foo1['a'] = { message: "some Message" };
console.log(foo1.a.message);
//함수 타입의 타입을 검사 할때 매개 변수의 이름이 일치 할 필요 없음!!
//TypeScript 의 컨텍스트 타입에 따라 인수 타입을 추론 할 수 있다
var mySearch1 = function (src, subString) {
    var result = src.search(subString);
    return result > -1;
};
var myArray1 = ["Bob", "Fored"];
var mystr = myArray1[0];
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "hello " + this.greeting;
    };
    return Greeter;
}());
var greeter3 = new Greeter("world");
console.log(greeter3.greet());
var Animals = /** @class */ (function () {
    function Animals(thisName) {
        this.name = thisName;
    }
    Animals.prototype.move = function (distanceMeter) {
        if (distanceMeter === void 0) { distanceMeter = 0; }
        console.log(this.name + " moved " + distanceMeter + " ");
    };
    return Animals;
}());
// 하위 클래스 에서 부모 요소를 사용하기 위해서는 super을 사용해야한다
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceMeter) {
        if (distanceMeter === void 0) { distanceMeter = 5; }
        console.log("Slitering ... ");
        _super.prototype.move.call(this, distanceMeter);
    };
    return Snake;
}(Animals));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceMeter) {
        if (distanceMeter === void 0) { distanceMeter = 45; }
        console.log("Horse Move ...");
        _super.prototype.move.call(this, distanceMeter);
    };
    return Horse;
}(Animals));
var sam = new Snake("Samy the Python");
var tom = new Horse("Tommy the Palomino"); // Animals로 선언 되었지만 Horse로 로 실행되는 모습을 볼수 있다
sam.move();
tom.move(400);
//Typescript의 기본적인 멤버들은 public 으로 표시된다
var Animals1 = /** @class */ (function () {
    function Animals1(theName) {
        this.name = theName;
    }
    Animals1.prototype.move = function (distanceMeter) {
        console.log(this.name + " moved " + distanceMeter);
    };
    return Animals1;
}());
//private
var Animals2 = /** @class */ (function () {
    function Animals2(theName) {
        this.name = theName;
    }
    return Animals2;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, "Rhino") || this;
    }
    ;
    return Rhino;
}(Animals2));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal = new Animals2("Goat");
var rhino = new Rhino();
var employee = new Employee("Bob");
// console.log(animal.name); >> private로 멤버를 지정하여 외부에서 접근 할 수 없다!!
animal = rhino;
//prtected 사용시 참조하는 클래스 간의 참조가 접근이 가능하지만 private와 같이 외부에서 접근할수 없다.
var Person1 = /** @class */ (function () {
    function Person1(name) {
        this.name = name;
    }
    ;
    return Person1;
}());
var Employee1 = /** @class */ (function (_super) {
    __extends(Employee1, _super);
    function Employee1(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee1.prototype.getElevatorpitch = function () {
        return "Hello my name is " + this.name + " and I work in " + this.department;
    };
    return Employee1;
}(Person1));
var howard = new Employee1("Howard", "Sales");
console.log(howard.getElevatorpitch());
// console.log(howard.name) >> protected을 사용하여 외부에서 사용 할 수 없다!!
var passcode = "Secret Passcode";
var Employee2 = /** @class */ (function () {
    function Employee2() {
    }
    Object.defineProperty(Employee2.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("오류 : employee의 무단 업데이트!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee2;
}());
var employee3 = new Employee2();
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
        if (log.length === 0)
            return undefined;
        return log[log.length - 1];
    },
    b: 123,
};
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
console.log(this);
