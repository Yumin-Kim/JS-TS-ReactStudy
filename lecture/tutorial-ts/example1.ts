const arr : number[] = [1,2,3];
const arrEX1 : (number  | string) []  = [1,"asd",3];
const arrEX2 = [1,2,"2"];
enum Color { Red =3 , Green , Blue =10000};

let c : Color = Color.Green;
let c1 : Color = Color.Blue;
(c as unknown as String) = Color[2];
console.log(c)
console.log(c1)
