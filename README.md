# 버스 관련 API를 활용해서 간단한 개발 진행

# 기록

1. 2021 05 02
   - 전반적으로 1차적인 개발은 5일정도 진행해서 개발되었다.
   - 현재 프로젝트에서는 상태 관리 라이브러리를 사용하지 않고 진행했으며 간단한 프로젝트에서는 useContext , useReducer사용하는것이 더 효율적인것 같다 - 랜더링 부분을 제외하고...현 프로젝트에서는 Provider을 엉뚱하게 선언하여 모든 컴포넌트에 랜더링 발생한다.
   - useEffect[ componentDidMount , componentDidUpdate ]에서의 비동기 요청을 하면서 조금씩 더 알아갔다.
   - useCallbak , useMemo , useRef에 대해서 사용함에 있어 포스팅 글 내용들을 한번에 이해 하게되었다.
   - antd css 프레임워크가 사용하기 용이하여서 사용하였지만 향후 code spliting과정에서 애먹..
   - TypeScript의 ReturnType , Omit , partial , Pick , Record 등 UtilType을 용이하게 사용하지만 아직 부족
   - Webpack 설정에 있어 조금씩 익숙해져감
   - **향후 계획은 기능 추가 및 테스팅 리팩토링 최적화 위주로 진행하려한다.**
   * **포스팅 글 읽으면서 개념 정리 및 React 자체에 대해서 알 필요 있음!!**

## Todo

- styled-commponent
- Testing
- rendering 최적화
- Hooks에 대한 깊은 이해
- code spliting >> antd로 인해 필요성
- **기능 추가**
- 확장으로 인한 redux 또는
