import React, { useCallback, useEffect, useReducer } from "react";
import { useContext } from "react";
import { getBusLocationInfo } from "../api/busapi";
import { InitialState, InitialStore } from "../Layouts";
import { reducer } from "../reducer";

const StationCopoment = () => {
  const { state, dispatch } = useContext(InitialStore);
  const { BusStationInfo, cityCode } = state;

  //cityCode 사용 함에 있어 useCallbak능력 알게됨 ㄷㄷ
  const onClickBusLocation = useCallback(
    async (params: React.MouseEvent<HTMLButtonElement>) => {
      const routeId = (params.target as any).value;
      const { response: responseBusLocation } = await getBusLocationInfo({
        cityCode,
        routeId,
      });
      dispatch({ type: "ROUTEID_INFO", payload: routeId });
      if ((responseBusLocation.body.items as any) === "") {
        let findIndex = 0;
        BusStationInfo.find((params, index) => {
          if (params.routeid === routeId) findIndex = index;
        });
        dispatch({
          type: "LOCATION_INFO_FAILURE",
          payload: findIndex,
        });
      } else {
        dispatch({
          type: "LOCATION_INFO_SUCCESS",
          payload: responseBusLocation.body.items.item,
        });
      }
    },
    [cityCode, BusStationInfo]
  );

  return (
    <>
      {BusStationInfo &&
        BusStationInfo.map((params, index) => {
          return (
            <div key={`${params.routeid}_${index}`}>
              <div>
                <button onClick={onClickBusLocation} value={params.routeid}>
                  {params.startnodenm} ~~ {params.endnodenm}
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default StationCopoment;
