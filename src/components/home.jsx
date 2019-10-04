import React, { Component } from "react";
import * as style from "../css/main.scss";
import { map, filter } from "lodash-es";
import $ from "jquery";

class HomeComponent extends Component {
  render() {
    const { value, onIncreaseClick } = this.props;
    return [
      <span>{value}</span>,
      <button onClick={onIncreaseClick}>Increase</button>
    ];
  }
}
export default HomeComponent;
