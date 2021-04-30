import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { InitialStore } from "../Layouts/index";
import { Tag, Divider, Empty, Spin } from "antd";
import { antdDefaultColor } from "./SiderInputBox";
import KakaoMapComponent from "./KakaoMapComponent";
import { IBusLoactionItem } from "../typings/type";

const LocationComponent = () => {
  const { state } = useContext(InitialStore);
  const [checkThis, setCheckThis] = useState(false);
  const [
    requireKakaoMapInfoList,
    setRequireKakaoMapInfoList,
  ] = useState<IBusLoactionItem>({} as IBusLoactionItem);
  const { BusLocationInfo, resetMapState } = state;

  const onClickBusLoaction = useCallback(
    (params: IBusLoactionItem) => {
      setRequireKakaoMapInfoList({ ...params });
      setCheckThis(true);
    },
    [requireKakaoMapInfoList]
  );

  return (
    <div style={{ padding: "40px", boxSizing: "border-box" }}>
      {BusLocationInfo.length !== 0 && (
        <div>
          <Divider>선택 지역 : ___ 현 운행 버스 입니다</Divider>
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
