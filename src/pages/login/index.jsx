import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { fetchLoginStaus, fetchGardenInfos } from "../../services/login";
import * as style from "../../css/main.less";
import APICONST from "../../services/APIConst";

export default class LoginComponent extends Component {
  constructor() {
    super();
    this.formRef = React.createRef();
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin() {
    this.formRef.current
      .validateFields()
      .then((data) => {
        const formData = new FormData();
        const obj = {
          type: "LOGIN",
          login: {
            user: data.username,
            pass: data.password
          },
          ctrl_key: -1
        };
        formData.append("req", JSON.stringify(obj));
        return fetchLoginStaus(formData);
      })
      .then(({ data }) => {
        if (data.response.detail === "OK") {
          sessionStorage.setItem("ctrl_key", data.ctrl_key);
        } else {
          console.log("login checked failed.");
          message.error("用户名或者密码错误!请重试", 1);
        }
      })
      .then(() => {
        // start to load garden infos.
        const obj = { type: "SERVER_CONFIG" };
        return fetchGardenInfos(obj);
      })
      .then(({ data }) => {
        console.log(`get machine infos: ${JSON.stringify(data)}`);
        const { BASE_URL } = APICONST;
        const port = Number(BASE_URL.split(":")[2]);
        console.log(`port is:${port}`);
        // const mockPort = 20061;
        const gardenInfo = data.response.detail.filter((item) => {
          return item.HttpPort === port;
        });
        console.log(`get garden info item:${JSON.stringify(gardenInfo)}`);
        if (gardenInfo.length > 0) {
          sessionStorage.setItem(
            "gardenName",
            `${gardenInfo[0].DeviceName}[${gardenInfo[0].DeviceType}]`
          );
          sessionStorage.setItem(
            "isAlgoritmServer",
            gardenInfo[0].DeviceName.indexOf("算法") !== -1
          );
          console.log(
            `isAlgorithm: ${gardenInfo[0].DeviceName.indexOf("算法")}`
          );
        }
        const { history } = this.props;
        history.push("/dashboard");
      })
      .catch((errorInfo) => {
        console.log("errorInfo ...", errorInfo);
      });
  }

  render() {
    return (
      <div className={style.loginContainer}>
        <div className={style.centerArea}>
          <div className={style.plsLogo} />
          <Form
            ref={this.formRef}
            name="basic"
            className={style.formContainer}
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            initialValues={{
              remember: true
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!"
                }
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
                  message: "Please input your password!"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.checkLogin}
              >
                <Link to="">Login</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
