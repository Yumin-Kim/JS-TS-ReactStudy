import React, { useCallback, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { InitialStore } from "../Layouts/index";
import Tag from "antd/lib/tag";
import Divider from "antd/lib/divider";
import Empty from "antd/lib/empty";
import { IBusLoactionItem, IBusStationItem } from "../typings/type";
import loadable from "@loadable/component";
import { antdDefaultColor } from "./SiderInputBox";
import { getBusLocationInfo } from "../api/busapi";
import message from "antd/lib/message";
///
const KakaoMapComponent = loadable(
  () =>
    import(/* webpackChunkName: "KakaoMapComponent" */ "./KakaoMapComponent")
);
///
const LocationComponent = () => {
  const { state, dispatch } = useContext(InitialStore);
  const [checkThis, setCheckThis] = useState(false);
  const [onclickValid, setOnclickValid] = useState(false);
  const [index, setIndex] = useState(0);
  const [counterIndex, setCounterIndex] = useState(0);
  const [requireKakaoMapInfoList, setRequireKakaoMapInfoList] =
    useState<IBusLoactionItem>({} as IBusLoactionItem);
  const { BusLocationInfo, cityCode, routeId, BasicbusInfo, BusStationInfo } =
    state;
  const cityName = useRef<string>();
  // const interval = useRef<any>(null);
  // const timeout = useRef<any>(null);
  const statioinInfo =
    useRef<Pick<IBusStationItem, "endnodenm" | "startnodenm" | "routeno">>();
  useEffect(() => {
    if (BusLocationInfo.length > 0) {
      if (BusStationInfo.length > 0) {
        const [data] = BasicbusInfo.filter(
          params => Number(params.citycode) === cityCode
        );
        const { cityname } = data;
        cityName.current = cityname;
      }
      if (routeId.trim() !== "") {
        const [data] = BusStationInfo.filter(
          params => params.routeid === routeId
        );

        const { startnodenm, routeno, endnodenm } = data;
        statioinInfo.current = { startnodenm, routeno, endnodenm };
      }
    }
  }, [cityCode, routeId, BusLocationInfo]);

  useEffect(() => {
    if (checkThis) {
      console.log("checkThis", checkThis);
      let timeout: any = null;
      let interval: any = null;
      let counter = 0;
      setCounterIndex(counter);
      interval = window.setInterval(async () => {
        let findIndex = 0;
        BusStationInfo.find((params, index) => {
          if (params.routeid === routeId) findIndex = index;
        });
        const { response: responseBusLocation } = await getBusLocationInfo({
          cityCode,
          routeId,
        });
        dispatch({
          type: "SWITCH_COMPONENT",
          payload: true,
        });
        dispatch({ type: "ROUTEID_INFO", payload: routeId });
        if ((responseBusLocation.body.items as any) === "") {
          dispatch({
            type: "LOCATION_INFO_FAILURE",
            payload: findIndex,
          });
          message.warning(`조회 결과 없습니다!`);
        } else {
          dispatch({
            type: "LOCATION_INFO_SUCCESS",
            payload: responseBusLocation.body.items.item,
          });
          counter++;
          message.success(`10초당 ${counter} 조회 >> 총 10회 성공!`);
          setCounterIndex(counter);
          setRequireKakaoMapInfoList({
            ...responseBusLocation.body.items.item[index],
          });
        }
      }, 1000 * 10);
      timeout = window.setTimeout(
        () => clearInterval(interval),
        1000 * 10 * 10
      );
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [checkThis, onclickValid]);

  const onClickBusLoaction = useCallback(
    (params: IBusLoactionItem) => (index: number) => {
      setOnclickValid(prev => !prev);
      setRequireKakaoMapInfoList({
        ...params,
      });
      setIndex(index);

      setCheckThis(true);
    },
    [requireKakaoMapInfoList, BusLocationInfo]
  );

  return (
    <div
      style={{
        margin: "0 auto",
        marginTop: "20px",
        width: "50vw",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "white",
      }}
    >
      {BusLocationInfo.length !== 0 && (
        <div style={{ marginTop: "100px" }}>
          <h2>현재 위치 입니다 원하는 버스를 선택하여 조회 해주세요</h2>
          {checkThis && <h3>10초당 {counterIndex}번 10회 조회 됩니다</h3>}
          <div style={{ marginBottom: "10px" }}>
            <Divider style={{ borderColor: "#40a9ff" }} dashed>
              {cityName.current}
            </Divider>
            {statioinInfo.current?.routeno}번
            <Divider type="vertical" style={{ borderColor: "#40a9ff" }} />
            {statioinInfo.current?.startnodenm} ~{" "}
            {statioinInfo.current?.endnodenm}
            <Divider type="vertical" style={{ borderColor: "#40a9ff" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            {BusLocationInfo.map((params, index) => {
              return (
                <Tag
                  color={antdDefaultColor[index]}
                  onClick={() => onClickBusLoaction(params)(index)}
                >
                  {params.routetp}
                </Tag>
              );
            })}
          </div>
          <KakaoMapComponent
            checkThis={checkThis}
            changeCheckThis={setCheckThis}
            KakaoMapListInfo={requireKakaoMapInfoList}
          />
        </div>
      )}
      {BusLocationInfo.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default LocationComponent;
