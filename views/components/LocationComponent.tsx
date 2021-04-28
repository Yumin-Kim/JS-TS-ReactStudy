import React from "react";
import { useContext } from "react";
import { InitialStore } from "../Layouts/index";
import { Tag } from "antd";

const LocationComponent = () => {
  const { state } = useContext(InitialStore);
  const { BusLocationInfo } = state;
  if (BusLocationInfo) {
    console.log(BusLocationInfo.length);
  }

  return (
    <div>
      Tag
      <Tag color="blue">LocationComponent</Tag>
      <Tag color="cyan">LocationComponent</Tag>
      <Tag color="geekblue">LocationComponent</Tag>
      <Tag color="gold">LocationComponent</Tag>
      {BusLocationInfo &&
        BusLocationInfo.length !== 0 &&
        BusLocationInfo.map(params => {
          return <h1>{params.routetp}</h1>;
        })}
      <Tag color="orange">LocationComponent</Tag>
      <Tag color="red">LocationComponent</Tag>
    </div>
  );
};

export default LocationComponent;
