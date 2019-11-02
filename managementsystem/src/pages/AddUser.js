import React, { Component } from 'react';
import { get,post } from '../Api'
import { Form, Icon, Input, Button, Checkbox } from 'antd';


class Login extends Component {
   
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { username, password, phonenum } = values;
                let { data } = await post('hrr/user/reg', {                   
                        phonenum,
                        username,
                        password
                })
               let {code,msg} = data
                console.log(code,msg);
                if(code){
                   alert(msg)
                }else {
                   alert(msg)
                }
                
            }

        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ margin: "50px auto", width: 500 }}>
                <h1 style={{ textAlign: 'center' }}>添加用户</h1>
                <Form onSubmit={this.handleSubmit} className="login-form"
                    style={{
                        width: 500, border: "1px solid #1890ff", padding: "50px 20px", background: "#cccc",
                        borderRadius: "10px"
                    }}>
                    <Form.Item>
                        {getFieldDecorator('phonenum', {
                            rules: [{ required: true, message: 'Please input your phonenum!' }],
                        })(
                            <Input
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="phonenum"
                            />,
                        )}
                    </Form.Item>
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
                        {/* {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href=""
                            style={{ float: "right" }}>
                            Forgot password
          </a> */}
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            style={{ width: "100%" }}>
                            添加用户
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
