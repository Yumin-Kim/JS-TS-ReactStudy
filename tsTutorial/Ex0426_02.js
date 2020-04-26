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
// 첫번째는 교차타입입니다!
// 다양한 타입을 하나로 결합해서 모든 기능을 갖춘 단일 타입을 얻는 방식입니다.
// 예를 들어, Person & Serializable & Loggable은 Person,Serializable,Loggable의 모든 멤버를 가집니다.
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        // if (!result.hasOwnProperty(id)) {
        //     (<any>result)[id] = (<any>second)[id];
        // }    
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log("Hello");
    };
    return ConsoleLogger;
}());
var hello = extend(new Person("Hello"), new ConsoleLogger());
var a3 = hello.name;
function getSmallPet() {
    // return console.log("asd");
}
var pet = getSmallPet();
// pet.layEgg();
// pet.swim();
//어느쪽 타입이 가지고 있지 않은 메소드르 실행 해야할때는 어떨게 하면 좋을까?
//타입 단언에 타입 가드 포함 시키면 컴파일 에러 발생이 나지않는다!!

//선택적 매개변수와 프로퍼티!!
//--strictNullChecks true후에 선택저 매개 변수와 함께 쓰면 자동으로 | undefined를 추가!!
function f(x, y) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
// f(1, null);
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var cal = new C();
cal.a = 12;
// cal.a = undefined; // 오류, 'undefined'를 'number'에 할당 할 수 없습니다
cal.b = 13;
cal.b = undefined; // ok
// cal.b = null; 
//null 타입 제거 !!
function f1(sn) {
    if (sn === null) {
        return "default";
    }
    else {
        return sn;
    }
}
// 컴파일러가 name이 null일 수 있다고 판단하는 이유는, 외부 함수에서 호출한 경우 중첩된 함수에 대한
// 모든 호출을 추적하는 것이 불가능하기 때문입니다(즉시실행함수-IIFE의 경우 가능).
function broken(name) {
    function postfix(epithet) {
        // return name.charAt(0) + epithet; >> null로 인해서 에러 발생!!
        return name.charAt(0) + epithet;
    }
    name = name || "BOB";
    return postfix("great");
}
//위 코드를 즉시 실행 함수로 변경하면 null 해결!!
function broken1(name) {
    name = name || "Bob";
    return (function postfix(epithet) {
        // 즉시실행함수이기때문에 name이 null이 아니라는 것을 알고있음
        return name.charAt(0) + '.  the ' + epithet;
    })("great");
}
function area(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * Math.pow(s.radius, 2);
    }
}
var BasicCalculator = /** @class */ (function () {
    function BasicCalculator(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    BasicCalculator.prototype.currentValue = function () {
        return this.value;
    };
    BasicCalculator.prototype.add = function (operand) {
        this.value += operand;
        return this;
    };
    return BasicCalculator;
}());
var ScientifiCalculator = /** @class */ (function (_super) {
    __extends(ScientifiCalculator, _super);
    function ScientifiCalculator(value) {
        if (value === void 0) { value = 0; }
        return _super.call(this, value) || this;
    }
    ScientifiCalculator.prototype.sin = function () {
        this.value = Math.sin(this.value);
        return this;
    };
    return ScientifiCalculator;
}(BasicCalculator));
var v1 = new BasicCalculator(2).add(100).currentValue();
var v2 = new ScientifiCalculator(2).add(1000).sin().currentValue();
console.log("new BasicCalculator", v1);
console.log("new ScientifiCalculator", v2);
