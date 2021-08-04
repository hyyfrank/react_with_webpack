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
      collapsed: false
    };
  }

  render() {
    const { collapsed } = this.state;
    const menu = (
      <Menu theme="light">
        <Menu.Item key="1" icon={<PieChartOutlined />} disabled>
          <a href="#">个人中心</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />} disabled>
          <a href="#">个人设置</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <a href="/">退出登录</a>
        </Menu.Item>
      </Menu>
    );
    const gardenName = sessionStorage.getItem("gardenName");
    console.log(`header get garden name : ${gardenName}`);
    return (
      <Header
        className="site-layout-background topdropdown"
        style={{ padding: 0 }}
      >
        <div className="gardenName">{gardenName} </div>
        <Dropdown overlay={menu} arrow={false}>
          <a
            className="ant-dropdown-link headermenuright"
            onClick={(e) => e.preventDefault()}
          >
            <div className={style.userLogo} />
            <div className={style.userName}>g2link</div>
          </a>
        </Dropdown>
      </Header>
    );
  }
}
