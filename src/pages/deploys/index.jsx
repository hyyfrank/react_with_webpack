import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import DeploysComponent from "./deploys";
import DeploysDetailComponent from "./detail";

class Deploys extends PureComponent {
  constructor() {
    super();
    this.getParameter = this.getParameter.bind(this);
  }

  getParameter(search, index) {
    const kvStr = search.split("&")[index];
    console.log(`kvStr:${kvStr}`);
    if (kvStr !== null) {
      return kvStr.split("=")[1];
    }
    return "";
  }

  render() {
    const { location } = this.props;
    const { search } = location;
    let obj;
    console.log(`path name:${JSON.stringify(search)}`);
    if (search !== "") {
      const algoNameFromPath = this.getParameter(search, 0);
      const gpuFromPath = this.getParameter(search, 1);
      obj = {
        iotCode: location.pathname.split("/").pop(),
        algoName: algoNameFromPath,
        gpu: gpuFromPath
      };
    }

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
