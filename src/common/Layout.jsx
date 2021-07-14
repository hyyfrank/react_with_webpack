import { Layout } from "antd";
import React, { PureComponent } from "react";
import * as style from "../css/layout.less";
import HeaderComponent from "./Header";
import SiderComponent from "./Sider";
import FooterComponent from "./Footer";

const { Content } = Layout;

export default class LayoutComponent extends PureComponent {
  render() {
    const { selectedKey, children } = this.props;
    return (
      <Layout className={style.layoutContainer}>
        <SiderComponent selectedKey={selectedKey} />
        <Layout className="site-layout">
          <HeaderComponent />
          <Content
            className="site-layout-background"
            style={{
              margin: "0px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
            <FooterComponent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
