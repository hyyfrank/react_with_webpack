import React, { PureComponent } from 'react';
import LayoutComponent from '../../common/Layout';
import AlgorithmComponent from './algorithms';

class Algorithms extends PureComponent {
  render() {
    const id = this.props.match.params.id
    console.log("current id get from path is: " +id);
    return (
      <LayoutComponent selectedKey={2}>
        <AlgorithmComponent />
      </LayoutComponent>
    );
  }
}
export default Algorithms;
