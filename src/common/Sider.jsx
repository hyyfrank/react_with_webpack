import { Layout, Menu, Image as AntdImage } from "antd";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  BgColorsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  InstagramOutlined
} from "@ant-design/icons";
import * as style from "../css/layout.less";
import leftLogo from "../images/logo_iot.png";

const { Sider } = Layout;

class SiderComponent extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  }

  render() {
    const { collapsed } = this.state;
    const { selectedKey } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={style.topLogo}>
          <div className={style.logoLayout}>
            {collapsed ? (
              <div className={style.detailLogo}>
                <AntdImage
                  alt="leftlogo"
                  className={style.logoImg}
                  src={leftLogo}
                  preview={false}
                />
              </div>
            ) : (
              <div className={style.toplogo2}>
                <AntdImage
                  alt="leftlogo"
                  className={style.logoImg}
                  src={leftLogo}
                  preview={false}
                />
                <h1>GLP</h1>
              </div>
            )}
          </div>
        </div>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={[selectedKey]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item
            key="dashboard"
            icon={<PieChartOutlined style={{ color: "#00AA4F" }} />}
          >
            <NavLink to="/dashboard">算法结果</NavLink>
          </Menu.Item>
          <Menu.Item
            key="deploys"
            icon={<BgColorsOutlined style={{ color: "#00AA4F" }} />}
          >
            <NavLink to="/deploys">部署列表</NavLink>
          </Menu.Item>
          <Menu.Item
            key="algorithms"
            icon={<DesktopOutlined style={{ color: "#00AA4F" }} />}
          >
            <NavLink to="/algorithms">算法列表</NavLink>
          </Menu.Item>
          <Menu.Item
            key="devices"
            icon={<InstagramOutlined style={{ color: "#00AA4F" }} />}
          >
            <NavLink to="/devices">相机列表</NavLink>
          </Menu.Item>
          <Menu.Item
            key="machines"
            icon={<ContainerOutlined style={{ color: "#00AA4F" }} />}
          >
            <NavLink to="/machines">服务器列表</NavLink>
          </Menu.Item>
        </Menu>
        <div className={style.bottomLink}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: this.toggle
            }
          )}
        </div>
      </Sider>
    );
  }
}
export default withRouter(SiderComponent);
