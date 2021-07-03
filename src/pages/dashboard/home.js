import React, { Component } from "react";
import { Button } from 'antd';
import LayoutComponent from "../../common/Layout"
import DashboardComponent from "./dashboard"

class HomeComponent extends Component {
  
  render() {
    return  <LayoutComponent selectedKey={1}>
              <DashboardComponent></DashboardComponent>
            </LayoutComponent>
    
  }
}
export default HomeComponent;
