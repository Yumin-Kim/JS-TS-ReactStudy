interface I_Student{
    num : number;
    name : String | number;
    mobile?:string;
    add? : (a:number,b:number)=>number;
}

const StudentObject : I_Student ={
    num : 201610309,
    name : "김유민"
};

StudentObject.add = function(a,b){return a+b;}
console.log(`학번 과 이름 ${StudentObject.num} ${StudentObject.name} \n산술 100 + 100 : ${StudentObject.add(100,100)}`)