import React, { useEffect } from "react";
import { useContext } from "react";
import { InitialStore } from "../Layouts";

const KakaoMapComponent = () => {
  const { state, dispatch } = useContext(InitialStore);
  const { BusLocationInfo } = state;

  useEffect(() => {
    if (BusLocationInfo) {
      console.log("BusLocationInfo componentDidUpdate");
    }
  }, [BusLocationInfo]);

  return <div>{BusLocationInfo && <p>Hello</p>}</div>;
};

export default KakaoMapComponent;
