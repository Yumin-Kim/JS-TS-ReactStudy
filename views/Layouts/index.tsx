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
import KakaoMapComponent from "../components/KakaoMapComponent";
import { Layout } from "antd";
import LocationComponent from "../components/LocationComponent";

const { Header, Sider, Content, Footer } = Layout;

export const InitialState = {
  BasicbusInfo: [] as Item[],
  BusLocationInfo: [] as IBusLoactionItem[],
  BusStationInfo: [] as IBusStationItem[],
  cityCode: 0,
  routeId: "",
  resetMapState: false,
} as IInitialState;
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
      state.resetMapState,
    ]
  );
  return (
    <>
      <InitialStore.Provider value={value}>
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider
              theme="light"
              width={"35%"}
              style={{ padding: "0 20px", height: "100vh" }}
            >
              <SiderInputBox />
            </Sider>
            <Content>
              <LocationComponent />
            </Content>
          </Layout>
        </Layout>
      </InitialStore.Provider>
    </>
  );
};

export default BasicLayout;
