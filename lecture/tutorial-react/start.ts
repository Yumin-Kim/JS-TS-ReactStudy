//1~2일차까지 정리
// React + TS 공부 시작!!!
//react 할때 webPack에 babel 로더 사용하여 최신문법 사용했지만 ts사용시 ts만의 로더 필요 로더중 ts-loader , awesome-typescript-loader
//react는  @types를 이용하여 타입 스크립트를 다운 로드 받는다!!
//class ClientDom_Class extends Component< {},State > {}
//React class는 제네릭자리를 두개를 가지고 첫번재는 props 두번째는 state
// const onSubmitForm = React.useCallback((e : React.FormEvent) => {
//const onChange = useCallback<(e:React.ChangeEvent<HTMLInputElement>)=>void >((e)=>
// const Try  = ({tryinfo}:{ tryinfo:Tryinfo }) =>{
//이와 같이 함수형 컴포넌트의 받아올 props의 값을 적어 주는 경우도 있지만
//     return(
//         <>
//             <div>{tryinfo.try}</div>
//             <div>{tryinfo.result}</div>
//         </>
//     )
// }
// const Try: FunctionComponent<( tryinfo:Tryinfo )> = ({ tryinfo }) => {
// 이와 같이 작성하는 경우도 있다 >> FunctionComponent라고 적고< () >제네릭을 사용하고 그안에 다음에 올 props값과 props의 데이터를 형을 적어준다!!
//react는 return문 안에 데이터 타입이 있으니 유츄해서 함수나 ref값을 적을때 사용한다!!
//setTimeout을 사용하게 되면 typescript가 node.js의 setTimeout인지 window setTimeout인지 모르기 때문에
//따로 변수로 변수로 뺀다음 window.setTimeout이라고 적어준다!! >> 따로 변수로 불리할 필요가 없음!!
//useRef 사용시 current가  readonly로 되어있어 ref값을 변경못하는경우가 있다 이경우는 RefObject로서 그런문제가 발생하는데 MutableRefObject로 바꾸게 되면  current값이 readonly가 되지 않아서 변경 가능

//3일차~4일차
// const ab = {
//   a: 12,
//   b: 123
// };

// type abObj = typeof ab;
//위와 같이  typeof를 사용하면 객체의 키와 값의 데이터 형태을 가지고 올수 있다

// const ab = {
//     a:12,
//     b:'123'
//   }
//
//type abObj = typeof ab[keyof typeof ab];같이 사용하면 abObj는 값을 number | string으로 가져온다
//type abObj = keyof typeof ab; 히면 abObj는 'a' | 'b' 으로값을 가져온다
//ReactNode >> ReactNode >> ReactElements >> 우리가 만든 컴포넌트나 HTML태그를 JSX.IntrinsElements에 포함된다

