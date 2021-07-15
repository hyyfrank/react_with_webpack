import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import DevicesComponent from "./devices";

class Algorithms extends PureComponent {
  render() {
    const { match } = this.props;
    const { id } = match.params;
    console.log(`current id get from path is: ${id}`);
    return (
      <LayoutComponent selectedKey="devices">
        <DevicesComponent />
      </LayoutComponent>
    );
  }
}
export default Algorithms;
