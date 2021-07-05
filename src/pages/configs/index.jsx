import React, { Component } from "react";
import { Button } from 'antd';
import LayoutComponent from "../../common/Layout"
import ConfigsComponent from "./configs"

class Configs extends Component {
  
  render() {
    return  <LayoutComponent selectedKey={3}>
              <ConfigsComponent></ConfigsComponent>
            </LayoutComponent>
    
  }
}
export default Configs;
