import React, { memo, useCallback, useContext, useEffect, useRef } from "react";
import { getBusBasic, getBusStationInfo } from "../api/busapi";
import { InitialStore } from "../Layouts/index";
import { Tag, Mentions, Divider } from "antd";
import {
  PresetColorTypes,
  PresetStatusColorTypes,
} from "antd/lib/_util/colors";
const { Option } = Mentions;

const data = [...PresetColorTypes, ...PresetStatusColorTypes];

const SiderInputBox = () => {
  const { state, dispatch } = useContext(InitialStore);
  const { BasicbusInfo } = state;
  const dataLength = useRef<number>(data.length);
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
        {BasicbusInfo &&
          BasicbusInfo.map((params, index) => {
            if (index < data.length) {
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
      {BasicbusInfo &&
        BasicbusInfo.map((params, index) => {
          if (index < data.length) {
            return (
              <Tag
                style={{ fontSize: "17px", marginBottom: "8px" }}
                color={data[index]}
                onClick={() => onClickCityCategory(params.citycode)}
                key={`${index}_${params.citycode}`}
              >
                {params.cityname}
              </Tag>
            );
          }
        })}{" "}
    </div>
  );
};

export default memo(SiderInputBox);
