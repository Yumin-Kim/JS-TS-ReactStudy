import  CustomEvent from "./customEvent";
console.log("Hello");
console.log(CustomEvent);
console.log(CustomEvent.removeAllListener("event2"));
CustomEvent.emit("event1");

