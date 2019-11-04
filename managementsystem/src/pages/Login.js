import React, { Component } from 'react';
import { get } from '../Api'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class Login extends Component {
    // state = {
    //     code: ''
    // }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //拿到val值发送请求进行验证
                //验证通过跳到Home组件 
                // let {history} = this.props
                // history.push(`/Home);
                // 并保存用户名到本地
                // this.props.history.push("/home")
                let { username, password, remember } = values;
                let { data:{code} } = await get('hrr/user/login', {
                    params: {
                        username,
                        password,
                    }
                })

                if(code){
                    let {history} = this.props
                    localStorage.setItem("username",username);
                    history.push('/home/');
                }else {
                    alert("用户名或密码不匹配")
                }
                
            }

        });
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ margin: "50px auto", width: 500 }}>
                <h1 style={{ textAlign: 'center' }}>凹凸租车后台管理系统</h1>
                <Form onSubmit={this.handleSubmit} className="login-form"
                    style={{
                        width: 500, border: "1px solid #1890ff", padding: "50px 20px", background: "#cccc",
                        borderRadius: "10px"
                    }}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href=""
                            style={{ float: "right" }}>
                            Forgot password
          </a>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            style={{ width: "100%" }}>
                            登录
          </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );

    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
