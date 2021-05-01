import React, { useCallback, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { InitialStore } from "../Layouts/index";
import Tag from "antd/lib/tag";
import Divider from "antd/lib/divider";
import Empty from "antd/lib/empty";
import { IBusLoactionItem, IBusStationItem } from "../typings/type";
import loadable from "@loadable/component";
import { antdDefaultColor } from "./SiderInputBox";
///
const KakaoMapComponent = loadable(
  () =>
    import(/* webpackChunkName: "KakaoMapComponent" */ "./KakaoMapComponent")
);
///
const LocationComponent = () => {
  const { state } = useContext(InitialStore);
  const [checkThis, setCheckThis] = useState(false);
  const [
    requireKakaoMapInfoList,
    setRequireKakaoMapInfoList,
  ] = useState<IBusLoactionItem>({} as IBusLoactionItem);
  const {
    BusLocationInfo,
    cityCode,
    routeId,
    BasicbusInfo,
    BusStationInfo,
  } = state;
  const cityName = useRef<string>();
  const statioinInfo = useRef<
    Pick<IBusStationItem, "endnodenm" | "startnodenm" | "routeno">
  >();
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

  const onClickBusLoaction = useCallback(
    (params: IBusLoactionItem) => {
      setRequireKakaoMapInfoList({ ...params });
      setCheckThis(true);
    },
    [requireKakaoMapInfoList]
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
        <div>
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
                  onClick={() => onClickBusLoaction(params)}
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
