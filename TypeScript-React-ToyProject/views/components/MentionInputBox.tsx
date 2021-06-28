import React, { memo, useContext } from "react";
import Mentions from "antd/lib/mentions";
import { InitialStore } from "../Layouts";
import { antdDefaultColor } from "./SiderInputBox";
const { Option } = Mentions;

const MentionInputBox = () => {
  const { state } = useContext(InitialStore);
  const { BasicbusInfo } = state;

  const onChange = (value: any) => {
    console.log("Change:", value);
  };

  const onSelect = (option: any) => {
    console.log("select", option);
  };

  return (
    <Mentions
      style={{ width: "100%", marginBottom: "20px" }}
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
  );
};

export default memo(MentionInputBox);
