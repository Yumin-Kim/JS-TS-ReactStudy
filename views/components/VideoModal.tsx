import React, { FC } from "react";
import { Modal } from "antd";
import VideoPlayer from "./VideoPlayer";

interface VideoModalProps {
  InVisiable: React.Dispatch<React.SetStateAction<boolean>>;
  modalState: boolean;
}
const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: "http://vjs.zencdn.net/v/oceans.mp4",
      type: "video/mp4",
    },
  ],
};
const VideoModal: FC<VideoModalProps> = ({
  InVisiable: setIsModalVisible,
  modalState: isModalVisible,
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <VideoPlayer {...videoJsOptions} />
    </Modal>
  );
};

export default VideoModal;
