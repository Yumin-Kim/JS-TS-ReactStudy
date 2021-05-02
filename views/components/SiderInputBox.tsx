import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getBusBasic, getBusStationInfo } from "../api/busapi";
import { InitialStore } from "../Layouts/index";
import Divider from "antd/lib/divider";
import Spin from "antd/lib/spin";
import {
  PresetColorTypes,
  PresetStatusColorTypes,
} from "antd/lib/_util/colors";
import loadable from "@loadable/component";
//
const TagList = loadable(
  () => import(/* webpackChunkName: "TagList" */ "./TagList")
);
const MentionInputBox = loadable(
  () => import(/* webpackChunkName: "MentionInputBox" */ "./MentionInputBox")
);
const StationCopoment = loadable(
  () => import(/* webpackChunkName: "StationCopoment" */ "./StationCopoment")
);
//
export const antdDefaultColor = [
  ...PresetColorTypes,
  ...PresetStatusColorTypes,
];

const SiderInputBox = () => {
  const { state, dispatch } = useContext(InitialStore);
  const [loadingState, setLoadingState] = useState(false);
  const { BasicbusInfo, BusStationInfo, cityCode } = state;
  const selectCityName = useRef<string>();
  const openTable = useRef<boolean>(false);
  useEffect(() => {
    if (BasicbusInfo.length === 0) {
      (async () => {
        const data = await getBusBasic();
        if (data) {
          dispatch({ type: "GET_BUS_BASE_INFO", payload: data });
        }
      })();
    }
    if (cityCode > 0) {
      const [filterBaiscBusInfo] = BasicbusInfo.filter(
        value => Number(value.citycode) === cityCode
      );
      const { cityname } = filterBaiscBusInfo;
      selectCityName.current = cityname;
      setLoadingState(true);
      openTable.current = false;
      setTimeout(() => {
        setLoadingState(false);
      }, 800);
    }
  }, [cityCode]);

  const onClickCityCategory = useCallback(
    async (params: string) => {
      dispatch({
        type: "CITYCODE_INFO",
        payload: Number(params),
      });

      const { response: responseBusStation } = await getBusStationInfo(
        Number(params)
      );
      dispatch({
        type: "GET_BUS_STATION_INFO",
        payload: responseBusStation.body.items.item,
      });
      if (BusStationInfo.length === 0) {
        setLoadingState(true);
        setTimeout(() => {
          setLoadingState(false);
        }, 800);
      }
      openTable.current = true;
    },
    [BusStationInfo]
  );

  return (
    <div>
      <Divider orientation="left">지역을 선택해주세요</Divider>
      <MentionInputBox />
      <TagList
        ListElement={BasicbusInfo}
        onClickTagFunc={onClickCityCategory}
      />
      <div style={{ height: "70vh" }}>
        {BusStationInfo.length === 0 && loadingState && (
          <Spin style={{ display: "block", margin: "100px auto 0" }} />
        )}
        {BusStationInfo.length !== 0 && (
          <div>
            <Divider style={{ borderColor: "#40a9ff" }} dashed>
              {selectCityName.current}
            </Divider>
            <Divider orientation="left">운행 버스 목록입니다</Divider>
            {!loadingState ? (
              <StationCopoment />
            ) : (
              <Spin style={{ display: "block", margin: "100px auto 0" }}>
                Loading
              </Spin>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SiderInputBox);
