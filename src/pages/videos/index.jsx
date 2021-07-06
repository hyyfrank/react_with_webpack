import React, { Component } from "react";
import { Button } from 'antd';
import LayoutComponent from "../../common/Layout"
import VideoComponent from "./video"

class Video extends Component {
  
  render() {
    return  <LayoutComponent selectedKey={'videos'}>
              <VideoComponent></VideoComponent>
            </LayoutComponent>
    
  }
}
export default Video;
