import { Layout, Menu } from 'antd';
import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import * as style from '../css/layout.less';
const {Sider} = Layout;
import {
  BgColorsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
  const { SubMenu } = Menu;

class SiderComponent extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
      this.setState({
          collapsed: !this.state.collapsed,
      });
  }
    render(){
      const selectedStr = this.props.selectedKey.toString();
      console.log("selected in sider.jsx"+selectedStr)
      return (<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className={style.topLogo}>
            <div className={style.logoLayout}>
              {
                this.state.collapsed ? <div className={style.detailLogo}></div>:<h1>GLP</h1>
              }  
            </div>
        </div>
        <Menu
          defaultSelectedKeys={[selectedStr]}
          defaultOpenKeys={[selectedStr]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="algorithms" icon={<DesktopOutlined />}>
            <NavLink to="/algorithms">Algorithms</NavLink>
          </Menu.Item>
          <Menu.Item key="videos" icon={<ContainerOutlined />}>
            <NavLink to="/videos">Videos</NavLink>
          </Menu.Item>
          <Menu.Item key="configs" icon={<BgColorsOutlined />}>
            <NavLink to="/configs">Configs</NavLink>
          </Menu.Item>
        </Menu>
        <div className={style.bottomLink}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
        </div>
      </Sider>)
    }
  }
  export default withRouter(SiderComponent);