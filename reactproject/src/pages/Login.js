import React, { Component } from 'react';
import { Tabs, Form, Icon, Input, Button, Checkbox, notification } from 'antd';
const { TabPane } = Tabs;
import Api from '../Api'
import '../css/login.css'; 
class Login extends Component {
    handleReg = e => {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, async (err, values) => {
            if (!err) {
                // console.log('reg: ', values);
                // 注册 添加到数据库
                let { username, password } = values;
                let { data } = await Api.post('user/reg', {
                    username,
                    password,
                })
                // console.log(data.insertedCount);
                if (data.insertedCount) {
                    notification.open({
                        message: '注册验证',
                        description:
                            '注册成功！',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            }
        });
    }
    handleLogin = e => {
        e.preventDefault();
        this.props.form.validateFields({ force: true }, async (err, values) => {
            if (!err) {
                // console.log('login: ', values);
                let { username, password } = values;
                let { data } = await Api.get('user/loginin', {
                    params: {
                        username, password, mdl: 1
                    }
                })
                if (data.code === 1) {
                    localStorage.setItem('user', JSON.stringify({ username, Authorization: data.data }))
                    this.props.history.push('/userCenter')
                } else {
                    notification.open({
                        message: '登录验证',
                        description:
                            '请确认手机号和密码！',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            }
        });
    }
    // 手机号输入框验证
    handleConfirmBlur = async e => {
        const val = e.target.value;
        if (val != '' && (/^1[3456789]\d{9}$/.test(val))) {
            // 查询数据库
            let { data } = await Api.get('user/check', {
                params: {
                    username: val
                }
            })
            if (data.code === 0) {
                notification.open({
                    message: '注册验证',
                    description:
                        '该手机号已被注册！',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        } else {
            notification.open({
                message: '注册验证',
                description: '请输入正确的手机号！',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div style={{ position: 'relative' }} className="login1">
                    <img src="./img/login.jpg" style={{ height: 255, width: '100%' }} alt="" />
                    <h1 style={{ backgroundImage: 'url(./img/logo.png)', position: 'absolute', top: -1, left: -1, width: 121, height: 59 }}></h1>
                    <div style={{ position: 'absolute', left: 15, top: 200, paddingLeft: 15, paddingRight: 15, backgroundColor: '#fff', borderTopLeftRadius: 15, width: '90%' }}>
                        <Tabs defaultActiveKey="1" style={{ width: '100%' }} tabBarGutter={90}>
                            <TabPane tab="手机号注册" key="1" >
                                <div style={{ marginTop: 20 }}>
                                    <Form onSubmit={this.handleReg} className="login-form" size="small">
                                        <Form.Item>
                                            {getFieldDecorator('username', {
                                                rules: [{ required: true, message: '请输入手机号!' }, { pattern: new RegExp(/^1[3456789]\d{9}$/, "g"), message: '请输入正确的手机号' }],
                                            })(
                                                <Input placeholder="请输入手机号" onBlur={this.handleConfirmBlur} />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: '请输入密码!' }],
                                            })(
                                                <Input
                                                    type="password"
                                                    placeholder="请输入密码"
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#00bc93', border: 'none' }} className="login-form-button">注册</Button>

                                        </Form.Item>
                                    </Form>
                                </div>

                            </TabPane>
                            <TabPane tab="手机号登录" key="2">
                                <div style={{ marginTop: 30 }}>
                                    <Form onSubmit={this.handleLogin} className="login-form" size="small">
                                        <Form.Item>
                                            {getFieldDecorator('username', {
                                                rules: [{ required: true, message: '请输入手机号' },],
                                            })(
                                                <Input
                                                    placeholder="请输入手机号"
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: '请输入密码' }],
                                            })(
                                                <Input
                                                    type="password"
                                                    placeholder="请输入密码"
                                                />,
                                            )}
                                        </Form.Item>
                                        <Form.Item>


                                            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#00bc93', border: 'none' }} className="login-form-button">登录</Button>

                                        </Form.Item>
                                    </Form>
                                </div>
                            </TabPane>

                        </Tabs>
                    </div>
                </div>

            </div >
        )
    }
}
Login = Form.create({})(Login);
export default Login;