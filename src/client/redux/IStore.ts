
export interface UserState{
    name:string | null;
    loginning : boolean;
    text:string | null;
    loggined:boolean;
}

export interface PostState{
    id:number;
    name: string;
    text:string;
    todo:string;
}
export interface CommentData extends PostState {
    text:string;
}
export interface CollectPost {
    post:Array<PostState>;
    comment:Array<CommentData>;
    updatePost?:boolean;
    updating:boolean;
    postId:number|null;
}

export interface IComments{
    todoListId:number;
    name:string;
    comment:string;
}

export interface PostToComments extends PostState {
    comments:IComments[];
} 

export interface ICommentsData {
    comments:Array<PostToComments>;
    timeStamp : number | null;
}

export interface InitialState{
    user: UserState;
    post:CollectPost; 
    comments:ICommentsData;   
}