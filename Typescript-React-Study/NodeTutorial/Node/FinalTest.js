const fs = require("fs");

const ReadFileFunc = () => {
  fs.readFile("Read.txt", "utf8", (err, data) => {
    try {
      console.log(data);
      WriteFileFunc(data, "WriteFileFunc");
    } catch (err) {
      console.log(err);
    }
  });
};
function WriteFileFunc(str, textView) {
  const ReloadData = str + textView + "\n";
  fs.writeFile("Read.txt", ReloadData, (err, data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
}

// ReadFileFunc();
///////////////////////////////////////////////버퍼
fs.open('학번.txt','w',function(err,fd){
    if(err) throw err;
    
    var buf = new Buffer('학번_201611600_이름_최규민_주소_충북청주시상당구');
    fs.write(fd,buf,0,buf.length,null,function(err,len,buffer){
        if(err) throw err;
        console.log(''+buffer);
        
        fs.close(fd,function(){
            console.log('파일닫음');    
        })
    });
    
})


function CallBackFunc(result) {
  console.log("CallBackFunc()");
  let sum = 0;
  for (let i = 0; i < result; i++) {
    if (i % 2 == 0) {
      console.log("2의배수 입니다. %d", i);
      sum += i;
    }
  }
  return sum;
}
function AddCallBack(Number, callBack) {
  console.log(`${Number}매개 변수가 입력되었습니다`);
  return callBack(Number);
}
// const reuslt = AddCallBack(10,CallBackFunc);
const StudentData = [
  { name: "Awww", age: 23 },
  { name: "Bww", age: 123 },
];
StudentData.push({ name: "asd", age: 3123 });
// console.log(StudentData)

// console.log(reuslt)
