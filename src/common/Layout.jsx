import { Layout, Menu } from 'antd';
import React, { Component } from "react";
import * as style from '../css/layout.less';
const { Header, Content, Sider, Footer} = Layout;

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

export default class LayoutComponent extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    shouldComponentUpdate(){
      return true;
    }
	render() {
		return <Layout className={style.layoutContainer}>
              <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className={style.topLogo}>
                    <div className={style.logoLayout}>
                      {
                        this.state.collapsed ? <div className={style.detailLogo}></div>:<h1>GLP</h1>
                      }  
                    </div>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                  </Menu.Item>
                  <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                  </Menu.Item>
                  <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                  </Menu.Item>
                </Menu>
                <div className={style.bottomLink}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                  })}
                </div>
              </Sider>
              <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                  
                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  Content
                </Content>
                
              </Layout>
            </Layout>
			
	}
}

