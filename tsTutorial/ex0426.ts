const postData: Ipost<string, IComment> = {
    post: [{
        name: "string",
        id: 123,
        comment: [{
            id: 123,
            text: "asd",
            data: {
                xmlIndicater: true,
                JSONIndicator: false,
            }
        }]
    }],
    lodding: true,
}
function aa(aa: Ipost<string, IComment>) {
    if (aa.post[0]) {
        return aa.post[0].id;

    }
}

interface Ipost<T, U> {
    post: IPost_Data<U>[];
    comments?: Array<T>;
    lodding: boolean;
    //등등
}

interface IPost_Data<U> {
    name: string;
    id: number;
    comment: Array<U>
}

interface IComment {
    id: number;
    text: string;
    data: PostData;
}

interface PostData {
    xmlIndicater: boolean;
    JSONIndicator: boolean;
}

interface IBig {
    a: number;
    b?: number;
}


class Size_S implements IBig {
    constructor(public a) {
        this.a = 10;
        console.log(a);
    }
}

class Size_L implements IBig {
    constructor(public a: number) {
        this.a = 10;
    }
}

function isSmall_l (data : IBig):data is Size_L {
    const size  = data.b;
    if(data.b > 100){
        return true;
    }else{
        return false;
    }
}

isSmall_l({a:1,b:2});












