import {
  IBusLoactionItem,
  IBusStationItem,
  IInitialState,
  Item,
} from "./typings/type";

interface GET_BUS {
  readonly BASE_INFO: "GET_BUS_BASE_INFO";
  readonly STATION_INFO: "GET_BUS_STATION_INFO";
  readonly LOCATION_INFO_SUCCESS: "LOCATION_INFO_SUCCESS";
  readonly LOCATION_INFO_FAILURE: "LOCATION_INFO_FAILURE";
  readonly ROUTEID_INFO: "ROUTEID_INFO";
  readonly CITYCODE_INFO: "CITYCODE_INFO";
}
type T_ActionName = GET_BUS[keyof GET_BUS];
type T_Payload = IInitialState[keyof IInitialState];

export type T_ActionType = () => { type: T_ActionName; payload: T_Payload };

export function reducer(
  state: IInitialState,
  action: ReturnType<T_ActionType>
): IInitialState {
  console.log(action, state);

  switch (action.type) {
    case "GET_BUS_BASE_INFO":
      const BasicbusInfo = <Item[]>action.payload;
      return {
        ...state,
        BasicbusInfo,
      };
    case "GET_BUS_STATION_INFO":
      const BusStationInfo = <IBusStationItem[]>action.payload;
      return {
        ...state,
        BusStationInfo,
      };
    case "LOCATION_INFO_SUCCESS":
      console.log(action.payload);
      if (!Array.isArray(action.payload)) {
        return {
          ...state,
          BusLocationInfo: [{ ...(action.payload as any) }],
        };
      } else {
        return {
          ...state,
          BusLocationInfo: action.payload as IBusLoactionItem[],
        };
      }
    case "LOCATION_INFO_FAILURE":
      const data = state.BusStationInfo.splice(action.payload as number, 1);
      return {
        ...state,
        BusStationInfo: [...state.BusStationInfo],
        BusLocationInfo: [],
      };
    case "CITYCODE_INFO":
      return {
        ...state,
        cityCode: action.payload as number,
      };
    case "ROUTEID_INFO":
      return {
        ...state,
        routeId: action.payload as string,
      };
    default:
      return state;
  }
}
