"use strict";
exports.__esModule = true;
var customEvent_1 = require("./customEvent");
console.log("Hello");
console.log(customEvent_1["default"]);
console.log(customEvent_1["default"].removeAllListener("event2"));
customEvent_1["default"].emit("event1");
