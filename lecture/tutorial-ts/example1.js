"use strict";
const arr = [1, 2, 3];
const arrEX1 = [1, "asd", 3];
const arrEX2 = [1, 2, "2"];
var Color;
(function (Color) {
    Color[Color["Red"] = 3] = "Red";
    Color[Color["Green"] = 4] = "Green";
    Color[Color["Blue"] = 10000] = "Blue";
})(Color || (Color = {}));
;
let c = Color.Green;
let c1 = Color.Blue;
c = Color[2];
console.log(c);
console.log(c1);
