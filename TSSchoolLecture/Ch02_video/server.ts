import * as http from "http";
import * as fs from "fs";
const fsPromise = fs.promises;

const server = http.createServer( async (req,res)=>{
    try{
        const data = await fsPromise.readFile("./index.html");
        res.end(data);
    }catch(error){
        console.log(error);
    }
})

server.listen(3000,()=>{
    console.log("Start Server 3000port")
})