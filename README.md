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

2. 2021 05 10

   - 테스트 할 수 있는 환경 구축 및 간단한 사용 방법에 대해서 알아보는중
   - Jest를 사용하며 왜사용하는지도 조사

   * jest를 통해 dom에 대한
   * jest를 활용 하여 typescript환경에서 테스트하는 환경 및 간단한 사용 방법 익히기
   * 그후 react-testing-library사용해보기
   * **지도부분 재수정 >> 수정 사항 위치 동의 하지 않았을떄 지도 안보임**
   * Recoil , Rematch , swr 간단하게 사용해보기
     - <a href="https://codesandbox.io/s/recoil-fwd9l">Recoil codesandbox</a>해당 링크를 참고하면 recoil관련해서 참고할 수 있음[아직 버전이 0.2.0 임으로 디테일하게는 ...]
     -

## Todo

- styled-commponent XX
- Testing(필요성이 느껴지면 하는것으로!!)
  - https://www.nextree.io/react-testing-7-3/
  - https://blog.rhostem.com/posts/2020-10-14-beginners-guide-to-testing-react-1
- rendering 최적화
- Hooks에 대한 깊은 이해
- code spliting >> antd로 인해 필요성
- **기능 추가**
- 확장으로 인한 redux 또는

* 클로저 공부
  - <a href="https://poiemaweb.com/js-closure">클로저 정리</a> 해당 부분을 정리하는 이유는 클로저를 통해서 다양한 프로그래밍이 가능하며 <a href="https://overreacted.io/ko/react-as-a-ui-runtime/">react UI 변경</a> 포스팅을 통해서 클로저를 기반으로 컴포넌트 랜더링이 이루어지는
