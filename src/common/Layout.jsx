import { Layout } from 'antd';
import React, { Component } from "react";
import * as style from '../css/layout.less';
const { Content} = Layout;
import HeaderComponent from "./Header"
import SiderComponent from "./Sider"
import FooterComponent from "./Footer"

export default class LayoutComponent extends Component {
	render() {
		return <Layout className={style.layoutContainer}>
              <SiderComponent />
              <Layout className="site-layout">
                <HeaderComponent />
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  {this.props.children}
                </Content>   
                <FooterComponent />  
              </Layout>
            </Layout>
			
	}
}

