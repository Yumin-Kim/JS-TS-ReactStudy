export {} // external module로 만듬
//declare module ".." 이런식의 선언은 ambient module로 선언
declare global{
//error Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.ts(2669)    
//external module :import,export 를 사용하는 모듈(외부모듈) namepace (내부모듈)
//type이 정의 되있지 않을때 직접 정의 하는 모듈 
    interface Window{
        //Window 객체의 타입 확장!!
        hello:string;
    }
}

//declare는 타입이 없을때 정의 하는것이고
//declare module은 없는 타입 만들기
//declare global은 전역에 수정 해주는 것
//typeRoots가 다른 type파일 참조 함!!옵션 추가 필수!!
//d.ts 남이 만든 라이브러리 확장할때!! >> 라이브러리 만들때 declaration trur 옵션 추가!!
//내가 만든건 ts로 분리

