import { Layout, Menu } from 'antd';
import React, { Component } from "react";
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

export default class SiderComponent extends Component {
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
      return (<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className={style.topLogo}>
            <div className={style.logoLayout}>
              {
                this.state.collapsed ? <div className={style.detailLogo}></div>:<h1>GLP</h1>
              }  
            </div>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Algorithms
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Videos
          </Menu.Item>
          <Menu.Item key="4" icon={<BgColorsOutlined />}>
            Configs
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
            <Menu.Item key="55">Option 5</Menu.Item>
            <Menu.Item key="66">Option 6</Menu.Item>
            <Menu.Item key="77">Option 7</Menu.Item>
            <Menu.Item key="88">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
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
             