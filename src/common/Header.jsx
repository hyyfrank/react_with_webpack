/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Layout, Menu, Dropdown } from "antd";
import React, { Component } from "react";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import * as style from "../css/layout.less";

const { Header } = Layout;

export default class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  render() {
    const menu = (
      <Menu mode="inline" theme="light" inlineCollapsed={this.state.collapsed}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <a href="#">个人中心</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <a href="#">个人设置</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <a href="/">退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header
        className="site-layout-background topdropdown"
        style={{ padding: 0 }}
      >
        <Dropdown overlay={menu} arrow={false}>
          <a
            className="ant-dropdown-link headermenuright"
            onClick={(e) => e.preventDefault()}
          >
            <div className={style.userLogo} />
            <div className={style.userName}>Serati Ma</div>
          </a>
        </Dropdown>
      </Header>
    );
  }
}
