import React, { Component } from "react";
import LayoutComponent from "../../common/Layout"
import AlgorithmComponent from "./algorithms"

class HomeComponent extends Component {
  
  render() {
    return  <LayoutComponent selectedKey={2}>
              <AlgorithmComponent></AlgorithmComponent>
            </LayoutComponent>
    
  }
}
export default HomeComponent;