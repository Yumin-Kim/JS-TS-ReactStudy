import React from "react";
import { useContext } from "react";
import { InitialStore } from "../Layouts/index";

const LocationComponent = () => {
  const { state } = useContext(InitialStore);
  const { BusLocationInfo } = state;
  if (BusLocationInfo) {
    console.log(BusLocationInfo.length);
  }

  return (
    <div>
      <div>LocationComponent</div>
      <div>LocationComponent</div>
      <div>LocationComponent</div>
      <div>LocationComponent</div>
      {BusLocationInfo &&
        BusLocationInfo.length !== 0 &&
        BusLocationInfo.map(params => {
          return <h1>{params.routetp}</h1>;
        })}
      <div>LocationComponent</div>
      <div>LocationComponent</div>
    </div>
  );
};

export default LocationComponent;
