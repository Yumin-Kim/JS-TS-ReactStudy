const fs = require("fs");
const readStream = fs.createReadStream("./read.txt", { highWaterMark: 16 });

const buffer = Buffer.from("출력 하겠습니다");
console.log(buffer);
console.log(buffer.length);

const arrayBuffer = [Buffer.from("Hello"), Buffer.from("Hello World"), Buffer.from("Hello World Node")];

const BufferArrary = Buffer.concat(arrayBuffer);

console.log(BufferArrary.toString());

const data = [];
readStream.on("data", (chunk) => {
    data.push(chunk);
    console.log("Chunk Data : ", chunk, chunk.length);
});

readStream.on("end", () => {
    console.log("end : ", Buffer.concat(data).length, Buffer.concat(data).toString());
})
readStream.on("error", (error) => {
    console.log("error : ", error);
})