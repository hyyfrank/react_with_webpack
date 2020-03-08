import React, { Component } from "react";
import * as style from "../css/main.scss";
import { map, filter } from "lodash-es";
import $ from "jquery";

class HomeComponent extends Component {
  render() {
    const { count,onIncreaseClick } = this.props;
    return [
      <span key="1">{count}</span>,
      <button key="2" onClick={onIncreaseClick}>Increase</button>
    ];
  }
}
export default HomeComponent;
