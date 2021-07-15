import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import DeploysComponent from "./deploys";
import DeploysDetailComponent from "./detail";

class Deploys extends PureComponent {
  render() {
    const { location } = this.props;

    return (
      <LayoutComponent selectedKey="deploys">
        {location.pathname.indexOf("detail") === -1 ? (
          <DeploysComponent />
        ) : (
          <DeploysDetailComponent />
        )}
      </LayoutComponent>
    );
  }
}
export default Deploys;
