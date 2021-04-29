import React, { memo, useCallback, useContext, useEffect, useRef } from "react";
import { getBusBasic, getBusStationInfo } from "../api/busapi";
import { InitialStore } from "../Layouts/index";
import { Tag, Mentions, Divider, Row, Col } from "antd";
import StationCopoment from "./StationCopoment";
import {
  PresetColorTypes,
  PresetStatusColorTypes,
} from "antd/lib/_util/colors";
const { Option } = Mentions;

export const antdDefaultColor = [
  ...PresetColorTypes,
  ...PresetStatusColorTypes,
];

const SiderInputBox = () => {
  const { state, dispatch } = useContext(InitialStore);
  const { BasicbusInfo, BusStationInfo } = state;
  useEffect(() => {
    if (BasicbusInfo.length === 0) {
      (async () => {
        const data = await getBusBasic();
        if (data) {
          dispatch({ type: "GET_BUS_BASE_INFO", payload: data });
        }
      })();
    }
  }, []);

  const onChange = (value: any) => {
    console.log("Change:", value);
  };

  const onSelect = (option: any) => {
    console.log("select", option);
  };

  const onClickCityCategory = useCallback(async (params: string) => {
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
  }, []);

  return (
    <div>
      <Divider orientation="left">지역을 선택해주세요</Divider>
      <Mentions
        style={{ width: "100%" }}
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@세종시"
        placement="top"
      >
        {BasicbusInfo.length !== 0 &&
          BasicbusInfo.map((params, index) => {
            if (index < antdDefaultColor.length) {
              return (
                <Option
                  value={params.cityname}
                  key={`${index}_${params.citycode}`}
                >
                  {params.cityname}
                </Option>
              );
            }
          })}
      </Mentions>
      {/* ref로 limit정하고 버튼눌렀을때 해당 limit를 통해서 더 보여주는 씩으로 진행 */}
      {BasicbusInfo.length !== 0 &&
        BasicbusInfo.map((params, index) => {
          if (index < antdDefaultColor.length) {
            return (
              <Tag
                style={{ fontSize: "17px", marginBottom: "8px" }}
                color={antdDefaultColor[index]}
                onClick={() => onClickCityCategory(params.citycode)}
                key={`${index}_${params.citycode}`}
              >
                {params.cityname}
              </Tag>
            );
          }
        })}

      {BusStationInfo.length !== 0 && (
        <div>
          <Divider orientation="left">지역을 선택해주세요!!</Divider>
          <StationCopoment />
        </div>
      )}
    </div>
  );
};

export default memo(SiderInputBox);
