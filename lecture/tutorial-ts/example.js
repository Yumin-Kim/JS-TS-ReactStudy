"use strict";
;
const obj = {
    data: 1000,
    text: 1000,
    bool: true,
};
const obj1 = {
    a: undefined,
    b: 100,
};
const number12 = 100;
const div = document.createElement('div');
const a = div;
const a1 = a;
const objFun = (obj) => {
    const { text } = obj;
    return text;
};
console.log(objFun({ data: "Hello", text: 1000, bool: true }));
const arr1 = {
    name: "Hello",
    gender: 100,
};
const arr2 = {
    name: 'hello',
    gender: true,
};
const testArr = [1, 2, 123];
const testArrstr = ['1', '2', '123'];
testArr.forEach(element => {
    console.log(element);
});
function forEach(arr, callBack) {
    for (let i = 0; i < arr.length; i++)
        callBack(arr[i]);
}
forEach(testArr, (item) => console.log(item));
forEach(testArrstr, (item) => console.log(item));
const dummyData = {
    data: "TypeScript is hard",
    num: 1000
};
craetMethod(dummyData);
function craetMethod({ data, num }) {
    console.log(data);
    console.log(num);
}
class SizeS {
    constructor(mine) {
        this.seyName = () => {
            console.log(this.b + "constructor");
        };
        this.b = mine;
    }
}
class Size {
    constructor() {
        this.sayChild = () => {
            console.log(this);
        };
        this.a = 100;
        this.b = "Class";
        this.templete = "Children Class";
    }
    onMore() {
        console.log(this);
    }
}
new SizeS("TypeScript").seyName();
new Size().sayChild();
new Size().onMore();
function indicate(data) {
    if (data.b) {
        return true;
    }
    else {
        return false;
    }
}
console.log(indicate(new Size()));
