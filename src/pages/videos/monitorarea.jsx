import React from "react";
import LayoutComponent from "../../common/Layout";

class VideoMonitorDetail extends React.PureComponent {
  render() {
    const { match } = this.props;
    const { id } = match.params;
    console.log(`current id get from path is: ${id}`);
    return (
      <LayoutComponent selectedKey={3}>
        <p>this is the edit monitor area page</p>
      </LayoutComponent>
    );
  }
}

export default VideoMonitorDetail;
