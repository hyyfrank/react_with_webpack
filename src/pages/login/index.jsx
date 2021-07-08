import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom'
import fetchLoginStaus from '../../services/login'
import { FormInstance } from 'antd/lib/form';
import * as style from '../../css/main.less';


export default class LoginComponent extends Component {
	constructor(){
		super();
		this.formRef = React.createRef();
		this.checkLogin = this.checkLogin.bind(this);
	}
	
	
	checkLogin(){
		this.formRef.current.validateFields()
		.then((data)=>{
			return fetchLoginStaus(data.username,data.password);
		})
		.then(({data})=>{
			if(data.response.state === "OK"){
				this.props.history.push("/dashboard")
			}else{
				console.log("login checked failed.")
				message.error('用户名或者密码错误!请重试',1)
			}
		})
		.catch((errorInfo) => {
			console.log('errorInfo ...', errorInfo);
		});
		
		
	}
	render() {
		return (
			<div className={style.loginContainer}>
				<div className={style.centerArea}>
					<div className={style.plsLogo}></div>
						<Form
							ref={this.formRef}
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
								wrapperCol={{
								offset: 8,
								span: 16,
								}}
							>
								<Button type="primary" htmlType="submit" onClick={this.checkLogin}>
									<Link to="">Login</Link>
								</Button>
							</Form.Item>
						</Form>
				</div>
			</div>
		);
	}
}
