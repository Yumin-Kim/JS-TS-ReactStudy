"use strict";
exports.__esModule = true;
var EventEmiit = require("events");
var CustomEvent = new EventEmiit();
CustomEvent.addListener("event1", function () {
    console.log("Evnet1");
});
CustomEvent.on("event2", function () {
    console.log("event2");
});
CustomEvent.on("event2", function () {
    console.log("Callback event2");
});
CustomEvent.once("event3", function () {
    console.log("Evnet3");
});
// CustomEvent.emit("event1");
// CustomEvent.emit("event2");
// CustomEvent.emit("event3");
// CustomEvent.emit("event3");
// CustomEvent.emit("event2");
exports["default"] = CustomEvent;
