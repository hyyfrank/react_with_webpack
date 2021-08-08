import { Layout } from "antd";
import React, { PureComponent } from "react";
import * as style from "../css/loading.less";

export default class LoadingComponent extends PureComponent {
  render() {
    return (
      <div className={style.xg}>
      <section className={style.lbody}>
        <div className={style.loading}></div>
        <div className={style.img}></div>
      </section>
    </div>
    );
  }
}
