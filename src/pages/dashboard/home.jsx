import React, { PureComponent } from 'react';
import LayoutComponent from '../../common/Layout';
import DashboardComponent from './dashboard';

class HomeComponent extends PureComponent {
  render() {
    return (
      <LayoutComponent selectedKey={2}>
        <DashboardComponent />
      </LayoutComponent>
    );
  }
}
export default HomeComponent;
