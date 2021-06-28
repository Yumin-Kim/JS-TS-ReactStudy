export interface UserState {
    name: string | null;
    loginning: boolean;
    text: string | null;
    loggined: boolean;
}

export interface PostState {
    id: number;
    name: string;
    text: string;
    todo: string;
}
export interface CommentData extends PostState {
    text: string;
}
export interface CollectPost {
    post: Array<PostState>;
    comment: Array<CommentData>;
    updatePost?: boolean;
    updating: boolean;
    postId: number | null;
}
export interface InitialState {
    user: UserState;
    post: CollectPost;
}


function aa(data: PostState) {
    // const index = data.post 
}

aa({ id: 1, text: 'Hello', name: 'dbals', todo: "TypeScript is Hard" });

let tuple: [boolean, number] = [true, 0];

tuple.concat([false, 1]);
// tuple.push("asd"); >> number | boolean만 할당되어 있어서 에러 밠생!!

// let tuple_1 :[boolean , number] = [ 0 , true];  >> 순서도 중요!!

//any는 모든 타입을 허용함!! never 어떤 값도 포함 할 수 없다 (null undefined 등 포함 할 수 없다)

class Rect {

    constructor(public width, public height) {
        this.width = width;
        this.height = height;
    }
}


interface numberOperation {
    (arg1: number, arg2: number): number;
}

const sum: numberOperation = (arg1: number, arg2: number): number => {
    return arg1 + arg2;
};

const multiply: numberOperation = (arg1, arg2) => {
    return arg1 * arg2;
};

const toArray: numberOperation = (arg1: any, arg2: any): any[] => { // error: Type '(arg1: any, arg2: any) => any[]' is not assignable to type 'numberOperation'. Type 'any[]' is not assignable to type 'number'.
    return [arg1, arg2];
};
//함수는 반드시 정의했던 타입의 인자를 받아 정의했던 타입을 리턴해야만 에러없이 컴파일이 된다.




class Stack<T> {
    private data: T[] = [];

    constructor() { }

    push(item: T): void {
        this.data.push(item);
    }

    pop(): T {
        return this.data.pop();
    }
}

function getFirst<T extends Stack<U>, U>(container: T): U {
    const item = container.pop();
    container.push(item);
    return item;
}
let numberStack:Stack<number>;
getFirst<Stack<number>, number>(numberStack);
getFirst<number, number>(1);



