import React, { FC } from "react";
import Modal from "antd/lib/modal";
import loadable from "@loadable/component";

const VideoPlayer = loadable(
  () => import(/* webpackChunkName: "VideoPlayer" */ "./VideoPlayer")
);

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
      <VideoPlayer options={videoJsOptions} />
    </Modal>
  );
};

export default VideoModal;
