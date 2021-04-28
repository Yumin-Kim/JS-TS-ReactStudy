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
        <SiderInputBox />
        <LocationComponent />
        <StationCopoment />
        <KakaoMapComponent />
      </InitialStore.Provider>
    </>
  );
};

export default BasicLayout;
