/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import LayoutComponent from "../../common/Layout"

class VideoMonitorDetail extends React.Component {
  constructor() {
    super();
  }

  render() {
    const id = this.props.match.params.id
    console.log("current id get from path is: " +id);
    return (
      <LayoutComponent selectedKey={3}>
       <p>this is the edit monitor area page</p>
      </LayoutComponent>
    );
  }
}


export default VideoMonitorDetail;
