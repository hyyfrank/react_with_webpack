import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import DeploysComponent from "./deploys";
import DeploysDetailComponent from "./detail";

class Deploys extends PureComponent {
  render() {
    const { location } = this.props;
    const obj = {
      iotCode: location.pathname.split("/").pop()
    };
    console.log(`location obj:${JSON.stringify(obj)}`);

    return (
      <LayoutComponent selectedKey="deploys">
        {location.pathname.indexOf("detail") === -1 ? (
          <DeploysComponent />
        ) : (
          <DeploysDetailComponent {...obj} />
        )}
      </LayoutComponent>
    );
  }
}
export default Deploys;
