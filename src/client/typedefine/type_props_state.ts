export interface ClassProps{
    value:string;
    text:string;
}
export interface HooksProps extends ClassProps{
    children:string;
}
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
export interface CollectPost {
    post:Array<PostState>;
}
export interface InitialState{
    user: UserState;
    post:CollectPost;    
}


