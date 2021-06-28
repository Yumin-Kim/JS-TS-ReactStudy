type strNum = string | number;
type OBJtype = { 
  a? : string ,
  b? : number,
} | number;

interface OBJ {
  readonly data : strNum,
  text  : number,
  bool : true
};

const obj : OBJ = {
  data : 1000,
  text : 1000,
  bool : true,
}
const obj1 : OBJtype  = {
   a : undefined,
   b : 100,
}
const number12  : OBJtype = 100;

const div = document.createElement('div');
const a = div as HTMLDivElement;
const a1 = <unknown>a as number;


const objFun = ( obj : OBJ ) : number =>{
  const { text } = obj;
  return text;
}


console.log(objFun( {data : "Hello" ,text : 1000 , bool : true } ));

interface arr<T> {
  name : string,
  gender : T,
}
interface Arr< T extends boolean> {
  name : string,
  gender : T
}
const arr1 : arr<number> = {
  name : "Hello",
  gender : 100,
}
const arr2 : Arr<boolean> = {
  name:'hello',
  gender :  true,
};
const testArr = [1,2,123];
const testArrstr = ['1','2','123'];
testArr.forEach(element => {
  console.log(element);
});

function forEach<T>(arr : T[] , callBack : (item : T)=> void ) {
  for( let i : number= 0 ; i < arr.length ; i++)
    callBack(arr[i])
}
forEach<number>(testArr,(item)=>console.log(item));
forEach<string>(testArrstr,(item)=>console.log(item));

const dummyData = {
  data : "TypeScript is hard",
  num : 1000
}

craetMethod(dummyData);

function craetMethod ( {data , num} : { data : string , num : number } ) {
  console.log(data);
  console.log(num);
}

interface Cloean {
  a? : number;
  b : string;
}

class SizeS implements Cloean {
  public b : string;
  constructor( mine : string ){
    this.b = mine;
  }
  seyName = ()=>{
    console.log(this.b + "constructor");
  }
}

class Size implements Cloean {
  public a :number;
  public b :string;
  private templete : string;
  constructor(){
    this.a = 100;
    this.b = "Class";
    this.templete = "Children Class";
  }

  sayChild = () =>{
    console.log(this);
  }

  onMore(){
    console.log(this);
  }
  
}


new SizeS("TypeScript").seyName();
new Size().sayChild();
new Size().onMore();

function indicate (data : Cloean ): data is Size {
  if(data.b){
    return true;
  }
  else{
    return false;
  }
}

console.log(indicate(new Size()))
