import { Layout } from "antd";
import React, { PureComponent } from "react";
import * as style from "../css/layout.less";

const { Footer } = Layout;

export default class FooterComponent extends PureComponent {
  render() {
    return (
      <Footer className={style.footStyle}>
        Global Logistic Properties ©2021 Created by Algorithm Team.
      </Footer>
    );
  }
}
