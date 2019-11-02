import React, { Component } from 'react';
import { Row, Col, Icon, Input, Button } from 'antd';
import '../css/search.css';
class Search extends Component {
    render() {
        let { history } = this.props;
        return (
            <div style={{ paddingLeft: 20, paddingRight: 20 }} className='search'>
                <Row style={{ height: 50 }}>
                    <Col span={2} style={{ textAlign: 'left', lineHeight: 3 }}>
                        <Icon type="left" onClick={() => { history.goBack() }} />
                    </Col>
                    <Col span={22} style={{ textAlign: 'right', lineHeight: 3 }}>
                        <h5>清空</h5>
                    </Col>
                </Row>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <Input addonBefore={<Icon type="environment" />} addonAfter={<Icon type="global" />} defaultValue="在哪里用车？" />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Input addonBefore={<Icon type="book" />} defaultValue="全部品牌、车型" />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <Input addonBefore={<Icon type="history" />} defaultValue="不限时间" />
                </div>
                <Button type="primary" block style={{ height: 50 }}>搜索</Button>
                <Row style={{ marginTop: 30 }}>
                    <Col span={22} style={{ textAlign: 'left', }}>
                        <h4 style={{ fontWeight: 600 }}>搜索历史</h4>
                    </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        <Icon type="delete" />
                    </Col>
                </Row>
                <Row style={{ marginTop: 30, marginBottom: 15 }}>
                    <Col span={20} style={{ textAlign: 'left', }}>
                        <h4 style={{ fontWeight: 600 }}>热门城市</h4>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <h4>全部</h4>
                    </Col>
                </Row>

                <ul className="city-list">
                    <li>上海</li><li>南京</li><li>杭州</li><li>广州</li><li>深圳</li><li>北京</li><li>重庆</li><li>青岛</li><li>成都</li><li>厦门</li><li>武汉</li>
                </ul>

            </div>
        )
    }
}
export default Search;