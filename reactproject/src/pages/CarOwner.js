import React, { Component } from 'react';
import { Button, Drawer, Icon, Form, Select, Input } from 'antd';
const { Option } = Select;

class CartOwner extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    closeBtn = () => {
        this.setState({
            visible: false,
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleSelectChange = value => {
        console.log(value);
        // this.props.form.setFieldsValue({
        //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        // });
    };
    render() {
        let { show } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ position: 'relative' }}>
                <div style={{ position: "relative" }}>
                    <img src="../assets/img/carowner.jpg" style={{ width: '100%' }} alt="" />
                </div>
                <div style={{ position: 'absolute', top: 0, left: -1 }}><img src="../assets/img/carowner.png" style={{ width: '100%' }} alt="" /></div>
                <div style={{ marginBottom: 60 }}><img src="../assets/img/carowner1.png" style={{ width: '100%' }} alt="" /></div>
                <Button type="primary" block style={{ height: 65, position: 'fixed', bottom: 0, left: 0, zIndex: 111, border: 'none', backgroundImage: 'linear-gradient(90deg,#0ab882,#43d96e)', fontSize: 17, fontWeight: 700 }} onClick={this.showDrawer}>点击加入凹凸车主</Button>
                <Drawer
                    title={<div><Icon type="close" onClick={this.closeBtn} style={{ fontSize: 18 }} /> <h2>成为车主</h2></div>}
                    placement='bottom'
                    height='100%'
                    mask='false'
                    closable={false}
                    visible={this.state.visible}
                >
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入姓名' }],
                            })(<Input placeholder="姓名(必填)" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('city', {
                                rules: [{ required: true, message: '请输入城市' }],
                            })(<Input placeholder="城市(必填)" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请选择租期' }],
                            })(
                                <Select
                                    placeholder="请选择租期"
                                    onChange={this.handleSelectChange}
                                    style={{ border: 0 }}
                                >
                                    <Option value="短租(短租灵活，以天为单位">短租(短租灵活，以天为单位)</Option>
                                    <Option value="长租(收益高，省时省力，28天起租)">长租(收益高，省时省力，28天起租)</Option>
                                    <Option value=">短租、长租都可以">短租、长租都可以</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('carBrand', {
                                rules: [{ required: true, message: '请填写车辆品牌' }],
                            })(<Input placeholder="车辆品牌" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('carModel', {
                                rules: [{ required: true, message: '请填写车辆型号' }],
                            })(<Input placeholder="车辆型号" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请填写手机号' }],
                            })(<Input placeholder="手机号(必填)" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('note', {
                            })(<Input placeholder="验证码(必填)" addonAfter="获取验证码" />)}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12 }}>
                            <Button type="primary" htmlType="submit" block>
                                点击加入
                            </Button>
                        </Form.Item>
                    </Form>

                </Drawer>
            </div>
        )
    }
}
CartOwner = Form.create({})(CartOwner);
export default CartOwner;