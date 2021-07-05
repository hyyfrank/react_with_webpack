import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import * as style from '../../css/main.less';


export default class LoginComponent extends Component {
	constructor(){
		super();
		this.onFinish = this.onFinish.bind(this);
		this.onFinishFailed = this.onFinishFailed.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
	}
	onFinish(values){
		console.log('Success:', values);
	}
	onFinishFailed(errorInfos){
		console.log('Failed:', errorInfo);
	}
	checkLogin(){

	}
	render() {
		return (
			<div className={style.loginContainer}>
				<div className={style.centerArea}>
					<div className={style.plsLogo}></div>
						<Form
							name="basic"
							className={style.formContainer}
							labelCol={{
								span: 8,
							}}
							wrapperCol={{
								span: 16,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={this.onFinish}
							onFinishFailed={this.onFinishFailed}
							>
							<Form.Item
								label="Username"
								name="username"
								rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
								]}
							>
								<Input.Password />
							</Form.Item>

							<Form.Item
								name="remember"
								valuePropName="checked"
								wrapperCol={{
								offset: 8,
								span: 16,
								}}
							>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Form.Item
								wrapperCol={{
								offset: 8,
								span: 16,
								}}
							>
								<Button type="primary" htmlType="submit" onClick={this.checkLogin}>
									<Link to="/dashboard">Login</Link>
								</Button>
							</Form.Item>
						</Form>
				</div>
			</div>
		);
	}
}
