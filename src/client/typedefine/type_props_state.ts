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
}

export interface PostState{
    id:number | null;
    name: string;
    text:string;
}

export interface InitialState{
    user: UserState;
    post:Array<PostState>;    
}


