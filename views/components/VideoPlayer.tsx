import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface VideoPlayerPropsInferface {
  videoJsOptions: videojs.PlayerOptions;
}

export default class VideoPlayer extends React.Component {
  private player?: videojs.Player;
  private videoNode?: HTMLVideoElement;

  constructor(props: VideoPlayerPropsInferface) {
    super(props);
    this.state = {
      player: undefined,
      videoNode: undefined,
    };
    // this.onClickPauseBtn = this.onClickPauseBtn.bind(this);
  }

  componentDidMount() {
    // instantiate video.js
    console.log(this);
    const { videoNode }: any = this.state;

    //   if (this.props) {
    this.setState(() => ({
      player: videojs(videoNode, this.props as any).ready(function () {
        console.log("onPlayerReady", this);
        return this;
      }),
    }));
    //   }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onClickPauseBtn = (Parma: any) => {
    console.log(Parma);

    // if (this.player) this.player?.pause();
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className="c-player">
        <div
          className="c-player__screen"
          style={{ width: "100%", height: "200px" }}
          data-vjs-player="true"
        >
          <video
            ref={(node: HTMLVideoElement) => (this.videoNode = node)}
            className="video-js "
          />
        </div>
        <div className="c-player__controls">
          <button>Play</button>
          <button onClick={() => this.onClickPauseBtn(this)}>Pause</button>
        </div>
      </div>
    );
  }
}
