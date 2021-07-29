import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import DeploysComponent from "./deploys";
import DeploysDetailComponent from "./detail";
import DeploysInstrumentComponent from "./instrument";

class Deploys extends PureComponent {
  render() {
    const { location } = this.props;
    const obj = {
      iotCode: location.pathname.split("/").pop()
    };
    console.log(`location obj:${JSON.stringify(obj)}`);

    let renderComponent = null;
    if (location.pathname.indexOf("detail") !== -1) {
      renderComponent = <DeploysDetailComponent {...obj} />;
    } else if (location.pathname.indexOf("instrument") !== -1) {
      renderComponent = <DeploysInstrumentComponent {...obj} />;
    } else {
      renderComponent = <DeploysComponent />;
    }

    return (
      <LayoutComponent selectedKey="deploys">{renderComponent}</LayoutComponent>
    );
  }
}
export default Deploys;
