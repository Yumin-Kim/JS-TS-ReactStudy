import React from "react";
import { render } from "react-dom";
import BasicLayout from "./Layouts/index";
import "antd/dist/antd.css";
declare global {
  interface Window {
    kakao: any;
  }
}
render(<BasicLayout />, document.getElementById("app"));
