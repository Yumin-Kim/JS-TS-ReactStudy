import React, {
  createContext,
  Dispatch,
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
import { reducer, T_ActionType } from "../reducer";
import Layout from "antd/lib/layout";
import loadable from "@loadable/component";
import { GetCurrentPostioin } from "../api/util";
import notification, { NotificationPlacement } from "antd/lib/notification";

const HeaderLayout = loadable(
  () => import(/* webpackChunkName: "HeaderLayout" */ "./HeaderLayout")
);
const LocationComponent = loadable(
  () =>
    import(
      /* webpackChunkName: "LocationComponent" */ "../components/LocationComponent"
    )
);
const SiderInputBox = loadable(
  () =>
    import(
      /* webpackChunkName: "SiderInputBox" */ "../components/SiderInputBox"
    )
);
const { Sider, Content } = Layout;

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
  const openNotification = (placement: NotificationPlacement) => {
    notification.info({
      message: `위치 기반 동의`,
      description:
        "현재 위치를 기반으로 지도 확인이 가능하기 때문에 좌측상단 위치 정보를 동의해주세요",
      placement,
    });
  };
  useEffect(() => {
    if (window.navigator) {
      if (window.navigator.geolocation) {
        openNotification("bottomLeft");
        (async () => {
          await GetCurrentPostioin();
        })();
      }
    }
  }, []);

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
          <HeaderLayout />
          <Layout>
            <Sider
              theme="light"
              width={"30vw"}
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
