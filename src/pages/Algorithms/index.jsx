import React, { PureComponent } from "react";
import LayoutComponent from "../../common/Layout";
import AlgorithmComponent from "./algorithms";

class Algorithms extends PureComponent {
  render() {
    const { match } = this.props;
    const { id } = match.params;
    console.log(`current id get from path is: ${id}`);
    return (
      <LayoutComponent selectedKey="algorithms">
        <AlgorithmComponent />
      </LayoutComponent>
    );
  }
}
export default Algorithms;
