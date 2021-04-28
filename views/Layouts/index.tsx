import React, {
  createContext,
  Dispatch,
  ProviderProps,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  IBusLoactionItem,
  IBusStationItem,
  IInitialState,
  Item,
} from "../typings/type";
import SiderInputBox from "../components/SiderInputBox";
import { reducer, T_ActionType } from "../reducer";
import StationCopoment from "../components/StationCopoment";
import LocationComponent from "../components/LocationComponent";
import KakaoMapComponent from "../components/KakaoMapComponent";
import { Layout } from "antd";

const { Header, Sider, Content, Footer } = Layout;

export const InitialState = {} as IInitialState;
type T_context = {
  state: IInitialState;
  dispatch: Dispatch<ReturnType<T_ActionType>>;
};
export const InitialStore = createContext<T_context>({
  state: InitialState,
  dispatch: () => {},
});

const BasicLayout = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const value = useMemo<T_context>(
    () => ({
      state,
      dispatch,
    }),
    [
      state.BasicbusInfo,
      state.BusLocationInfo,
      state.BusStationInfo,
      state.cityCode,
      state.routeId,
    ]
  );
  return (
    <>
      <InitialStore.Provider value={value}>
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider theme="light" width={400} style={{ padding: "20px" }}>
              <SiderInputBox />
              <LocationComponent />
            </Sider>
            <Content>
              <StationCopoment />
              <KakaoMapComponent />
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </InitialStore.Provider>
    </>
  );
};

export default BasicLayout;
