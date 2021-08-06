import React, { PureComponent } from "react";
import { Image as AntdImage } from "antd";
import * as style from "../../css/dashboard.less";
import logo from "../../images/404image.jpeg";

class Image404Component extends PureComponent {
  render() {
    return (
      <div className={style.image404}>
        <AntdImage src={logo} />
        <span>[0000000000],FREE,2000-01-01 00:00:00</span>
      </div>
    );
  }
}
export default Image404Component;
