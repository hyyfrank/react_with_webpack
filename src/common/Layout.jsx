import { Layout, Menu } from 'antd';
import { Icon } from '@ant-design/compatible'
import React, { Component } from "react";
const { Header, Content, Footer, Sider } = Layout;


export default class LayoutComponent extends Component {
	render() {
		return (
			<Layout>
                <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">算法服务管理</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span className="nav-text">视频服务管理</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <Icon type="upload" />
                    <span className="nav-text">监控区域管理</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                    <Icon type="bar-chart" />
                    <span className="nav-text">统一配置管理</span>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />
                        ...
                        <br />
                        Really
                        <br />...
                        <br />
                        Really
                        <br />...
                        <br />
                        Really
                        <br />...
                        <br />
                        Really
                        <br />...
                        <br />
                        Really
                        <br />...
                        <br />
                        Really
                        <br />...
                        <br />
                        Really
                        <br />
                        content
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>)
	}
}

