import React, { Component } from "react"
import Business from "./bus"
import { Button } from 'antd'

class HomeComponent extends Component {
  
  render() {
    const { count,onIncreaseClick } = this.props;
    return <div>
      <span key="1">{count}</span>
      <Button type="primary"  key="2" onClick={onIncreaseClick}>Primary Button</Button>
      <Business></Business>
    </div>
  }
}
export default HomeComponent;
