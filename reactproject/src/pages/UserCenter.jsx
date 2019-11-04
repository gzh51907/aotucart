import React, { Component } from 'react';
import { Row, Col, Icon, List, Avatar, Tooltip } from 'antd';

class UserCenter extends Component {
    state = {
        data: [
            {
                title: '任务中心',
                imgurl: './img/icon1.png'
            },
            {
                title: '我的订单',
                imgurl: './img/icon2.png'
            },
            {
                title: '我的钱包',
                imgurl: './img/icon3.png'
            },
            {
                title: '长租账单',
                imgurl: './img/icon4.png'
            },
            {
                title: '我的收藏',
                imgurl: './img/icon5.png'
            },
            {
                title: '身份认证',
                imgurl: './img/icon6.png'
            },
            {
                title: '减免押金',
                imgurl: './img/icon7.png'
            },
            {
                title: '违章专区',
                imgurl: './img/icon8.png'
            },
            {
                title: '邀请有礼',
                imgurl: './img/icon9.png'
            },
            {
                title: '常见问题',
                imgurl: './img/icon10.png'
            },
            {
                title: '在线客服',
                imgurl: './img/icon11.png'
            },
            {
                title: '设置',
                imgurl: './img/icon12.png'
            },
        ],
        user: '注册/登录'
    }
    goto = (url) => {
        let { history } = this.props
        history.push(url);
    }
    componentDidMount() {

    }
    render() {
        let { data, user } = this.state;
        return (
            <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <div style={{ paddingLeft: 20, paddingRight: 20, position: "fixed", top: 0, left: 0, zIndex: 999, width: '100%', height: 50, backgroundColor: '#fff', lineHeight: 3 }}>
                    <Row type="flex">
                        <Col span={4} order={1} style={{ textAlign: 'left' }} >
                            <Icon type="left" />
                        </Col>
                        <Col span={16} order={2} style={{ textAlign: 'center' }}>
                            <h3>个人中心</h3>
                        </Col>
                        <Col span={4} order={3} style={{ textAlign: 'right' }} onClick={this.goto.bind(this, '/home')}>
                            <Icon type="home" />
                        </Col>
                    </Row>
                </div>

                <List.Item style={{ marginTop: 50 }}
                    onClick={this.goto.bind(this, '/login')}
                    actions={[
                        <Tooltip title="更多">
                            <Icon type="right" />
                        </Tooltip>]}>
                    <List.Item.Meta

                        avatar={<img src="./img/head.png" style={{ width: 52, height: 52 }} />}
                        title={<a style={{ lineHeight: 4 }}>{JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : '注册/登录'}</a>}
                    />
                </List.Item>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    split='false'
                    renderItem={item => (
                        <List.Item style={{ borderBottom: 0 }} actions={[
                            <Tooltip title="更多">
                                <Icon type="right" />
                            </Tooltip>]}>
                            <List.Item.Meta

                                avatar={<img src={item.imgurl} style={{ width: 19, height: 19 }} />}
                                title={<a>{item.title}</a>}
                            />
                        </List.Item>
                    )}
                />
            </div >
        )
    }
}

export default UserCenter;