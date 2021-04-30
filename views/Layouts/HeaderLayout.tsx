import React, { useCallback, useState } from "react";
import { Layout, Button } from "antd";
import { YoutubeOutlined } from "@ant-design/icons";
import VideoModal from "../components/VideoModal";

const { Header } = Layout;

const HeaderLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const onClickYoutubeBtn = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <Header
      style={{
        backgroundColor: "rgba(0, 0, 0,0.12)",
        boxShadow: "3px 5px 5px rgba(0,0,0,.5)",
      }}
    >
      <Button
        onClick={onClickYoutubeBtn}
        type="primary"
        icon={<YoutubeOutlined />}
        danger
      >
        Youtube
      </Button>
      <VideoModal modalState={showModal} InVisiable={setShowModal} />
    </Header>
  );
};

export default HeaderLayout;
