import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import VideoComponent from "./video";

class Video extends PureComponent {
  render() {
    return (
      <LayoutComponent selectedKey="videos">
        <VideoComponent />
      </LayoutComponent>
    );
  }
}
export default Video;
