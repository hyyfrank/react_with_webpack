import { Layout } from 'antd';
import React, { Component } from "react";
const { Footer} = Layout;
import * as style from '../css/layout.less';

export default class FooterComponent extends Component {
    render(){
        return <Footer className={style.footStyle}>Global Logistic Properties ©2021 Created by Algorithm Team.</Footer>
    }
}