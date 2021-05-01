import * as React from "react";

//video Library Styles
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";
////
import Button from "antd/lib/button";
import { useCallback, useState } from "react";

interface VideoPlayerPropsInferface {
  videoJsOptions: videojs.PlayerOptions;
}
interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};
const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>() as any;
  const player = React.useRef<videojs.Player>();
  const [state, setstate] = useState<VideoJsPlayer>();

  React.useEffect(() => {
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      setstate(this);
      // console.log('onPlayerReady', this);
    });
    return () => {
      console.log("testtest");

      if (player.current) {
        player.current.dispose();
        state?.reset();
      }
    };
  }, [options, state]);

  const onClickPlayBtn = useCallback(() => {
    state?.play();
  }, [state]);

  const onClickPauseBtn = useCallback(() => {
    state?.pause();
  }, [state]);

  return (
    <div>
      <video
        ref={videoNode}
        style={{ marginBottom: "10px" }}
        className="video-js"
      />
      <div style={{ marginBottom: "10px" }}>
        <Button
          style={{ marginTop: "10px", marginRight: "8px" }}
          type="primary"
          onClick={onClickPlayBtn}
        >
          Play
        </Button>
        <Button type="primary" onClick={onClickPauseBtn}>
          Pause
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
