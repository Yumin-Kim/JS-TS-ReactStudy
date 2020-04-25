export interface UserState{
    name:string | null;
    loginning : boolean;
    text:string | null;
    loggined:boolean;
}

export interface PostState{
    id:number | null;
    name: string;
    text:string;
    todo:string;
}
export interface CommentData {
    user:PostState,
    text:string;
}
export interface CollectPost {
    post:Array<PostState>;
    comment:Array<CommentData>
}
export interface InitialState{
    user: UserState;
    post:CollectPost;    
}