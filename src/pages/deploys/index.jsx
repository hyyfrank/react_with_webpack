import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import DeploysComponent from "./deploys";

class Deploys extends PureComponent {
  render() {
    return (
      <LayoutComponent selectedKey="configs">
        <DeploysComponent />
      </LayoutComponent>
    );
  }
}
export default Deploys;
