import React, { Component } from "react"
import { Button } from 'antd'

class HomeComponent extends Component {
  render() {
    const { count,onIncreaseClick } = this.props;
    return <div>
      <span key="1">{count}</span>
      <Button type="primary"  key="2" onClick={onIncreaseClick}>Primary Button</Button>
    </div>
  }
}
export default HomeComponent;
