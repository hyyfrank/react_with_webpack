import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import * as style from '../../css/main.css';

export default class App extends Component {
	constructor(){
		super();
		this.onFinish = this.onFinish.bind(this);
		this.onFinishFailed = this.onFinishFailed.bind(this);
	}
	onFinish(values){
		console.log('Success:', values);
	}
	onFinishFailed(errorInfos){
		console.log('Failed:', errorInfo);
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
								<Button type="primary" htmlType="submit">
								Login
								</Button>
							</Form.Item>
						</Form>
				</div>
			</div>
		);
	}
}
