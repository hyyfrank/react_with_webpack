import React, { Component } from "react";
import { Button } from 'antd';
import LayoutComponent from "../../common/Layout"
import VideoComponent from "./video"

class HomeComponent extends Component {
  
  render() {
    return  <LayoutComponent selectedKey={3}>
              <VideoComponent></VideoComponent>
            </LayoutComponent>
    
  }
}
export default HomeComponent;
