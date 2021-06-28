const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./read.txt",{highWaterMark : 16});
const zlibStream  = zlib.createGzip(); // 압축 스트림
const writeSream = fs.createWriteStream("./read2.txt.gz"); // 확장자를 변경하여 집할 수 있다!!

readStream.pipe(zlibStream).pipe(writeSream);// 파이프끼리 연결 할 수 있다!!