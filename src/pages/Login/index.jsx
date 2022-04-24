import React from "react";

import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "@/assets/logo.png";
import "@/pages/Login/index.scss";
import { userLogin } from "@/store/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      await dispatch(userLogin(values));
      message.success("登录成功");
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || "登录失败");
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-container">
          <img className="login-logo" src={logo} alt="" />
          {/* 登录表单 */}
          <Form
            onFinish={onFinish}
            initialValues={{
              mobile: "13911111111",
              code: "246810",
            }}
            size="large"
            validateTrigger={["onChange", "onBlur"]}
            autoComplete="off"
          >
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "请输入手机号" },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "手机格式不正确",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入手机号"
              ></Input>
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入验证码" },
                { len: 6, message: "验证码6个字符串" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="请输入验证码"
              ></Input>
            </Form.Item>
            <Form.Item valuePropName="checked">
              <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
