import React, { useCallback, useState } from "react";
import Layout from "antd/lib/layout";
import Button from "antd/lib/button";
import YoutubeOutlined from "@ant-design/icons/YoutubeOutlined";
import loadable from "@loadable/component";
import { Custom_Header } from "./style";

const VideoModal = loadable(
  () => import(/* webpackChunkName: "VideoModal" */ "../components/VideoModal")
);
const { Header } = Layout;

const HeaderLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const onClickYoutubeBtn = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);
  return (
    <Custom_Header>
      <Button
        onClick={onClickYoutubeBtn}
        type="primary"
        icon={<YoutubeOutlined />}
        danger
      >
        Youtube
      </Button>
      <VideoModal modalState={showModal} InVisiable={setShowModal} />
    </Custom_Header>
  );
};

export default HeaderLayout;
