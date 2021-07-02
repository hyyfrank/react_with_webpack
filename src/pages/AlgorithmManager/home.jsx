import React, { Component } from "react";
import { Button } from 'antd';
import LayoutComponent from "../../common/Layout"
import AlgorithmComponent from "./Algorithms"

class HomeComponent extends Component {
  
  render() {
    return  <LayoutComponent>
              <AlgorithmComponent></AlgorithmComponent>
            </LayoutComponent>
    
  }
}
export default HomeComponent;
