import { Layout } from 'antd';
import React, { Component } from "react";
import * as style from '../css/layout.less';
const { Content} = Layout;
import HeaderComponent from "./Header"
import SiderComponent from "./Sider"
import FooterComponent from "./Footer"

export default class LayoutComponent extends Component {
  constructor(){
    super();
  }
  
	render() {
    console.log("selected in layout.jsx"+this.props.selectedKey)
		return <Layout className={style.layoutContainer}>
              <SiderComponent selectedKey={this.props.selectedKey}/>
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

