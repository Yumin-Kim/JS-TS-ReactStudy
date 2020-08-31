const EventEmiit = require("events");

const CustomEvent = new EventEmiit();

CustomEvent.addListener("event1",()=>{
    console.log("Evnet1");
});

CustomEvent.on("event2",()=>{
    console.log("event2");
});

CustomEvent.on("event2",()=>{
    console.log("Callback event2");
});

CustomEvent.once("event3",()=>{
    console.log("Evnet3");
});

// CustomEvent.emit("event1");
// CustomEvent.emit("event2");
// CustomEvent.emit("event3");
// CustomEvent.emit("event3");
// CustomEvent.emit("event2");

export default CustomEvent;  