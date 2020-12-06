const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./Route/user");

const app = express();

const devl = process.env.NODE_ENV !== "prouduction";

//midileware
app.set("port" , devl ? 3000 : process.env.PORT);
app.use(morgan("dev"));
app.use(cors({
    origin:true,
    credentials : true
}))
app.use("/",express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//router
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
    
})
app.use("/user",userRouter);
app.listen(3000,()=>{
    console.log("School Lecture Server");
});