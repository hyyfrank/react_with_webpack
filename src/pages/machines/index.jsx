import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
// import MachinesComponent from "./machines";
import MachinesComponent from "./machines";

class Machine extends PureComponent {
  render() {
    return (
      <LayoutComponent selectedKey="machines">
        <MachinesComponent />
      </LayoutComponent>
    );
  }
}
export default Machine;
