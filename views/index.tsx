import React from "react";
import { Head } from "@react-ssr/nestjs-express";
import BasicLayout from "./Layouts/index";
import "antd/dist/antd.css";
declare global {
  interface Window {
    kakao: any;
  }
}
interface IndexProps {
  message: string;
}

const Index = (props: IndexProps) => {
  return (
    <>
      <Head>
        <title>An example of @react-ssr/nestjs-express!!</title>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7250bf819d0f84eda2f84fa26fe67eda"
        ></script>
      </Head>
      <BasicLayout />
    </>
  );
};

export default Index;
