"use strict";
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
