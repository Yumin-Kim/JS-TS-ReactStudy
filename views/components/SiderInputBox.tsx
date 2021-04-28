import React, {
  ButtonHTMLAttributes,
  DOMAttributes,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { getBusBasic, getBusBasicInfo, getBusStationInfo } from "../api/busapi";
import { InitialStore, InitialState } from "../Layouts/index";
import { reducer } from "../reducer";

const SiderInputBox = () => {
  const { state, dispatch } = useContext(InitialStore);
  const { BasicbusInfo, BusLocationInfo, BusStationInfo } = state;
  const cityCodeRef = useRef<string>();
  useEffect(() => {
    if (!BasicbusInfo) {
      (async () => {
        const data = await getBusBasic();
        if (data) {
          dispatch({ type: "GET_BUS_BASE_INFO", payload: data });
        }
      })();
    }
  }, []);

  const onClickCityCategory = useCallback(
    async (params: React.MouseEvent<HTMLButtonElement>) => {
      dispatch({
        type: "CITYCODE_INFO",
        payload: Number((params.target as any).value),
      });
      const { response: responseBusStation } = await getBusStationInfo(
        Number((params.target as any).value)
      );
      dispatch({
        type: "GET_BUS_STATION_INFO",
        payload: responseBusStation.body.items.item,
      });
    },
    []
  );

  return (
    <div>
      {BasicbusInfo &&
        BasicbusInfo.map((params, index) => {
          return (
            <button
              value={params.citycode}
              onClick={onClickCityCategory}
              key={`${index}_${params.citycode}`}
            >
              {params.cityname}
            </button>
          );
        })}{" "}
    </div>
  );
};

export default SiderInputBox;
