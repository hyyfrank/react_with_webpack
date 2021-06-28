import React, { Component } from "react";
import * as style from "../../css/main.scss";
import { map, filter } from "lodash-es";
import Business from "./bus"
import $ from "jquery";
import { Button } from 'antd';

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
