import React, { PureComponent } from 'react';
import LayoutComponent from '../../common/Layout';
import DashboardComponent from './dashboard';

class Dashboard extends PureComponent {
  render() {
    return (
      <LayoutComponent selectedKey="dashboard">
        <DashboardComponent />
      </LayoutComponent>
    );
  }
}
export default Dashboard;
