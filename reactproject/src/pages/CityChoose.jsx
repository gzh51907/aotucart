import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
class CityChoose extends Component {
    render() {
        return (
            <div >
                <Row style={{ height: 50, paddingRight: 20, paddingLeft: 20 }}>
                    <Col span={2} style={{ textAlign: 'left', lineHeight: 3 }}>
                        <Icon type="left" />
                    </Col>
                    <Col span={22} style={{ textAlign: 'center', lineHeight: 2 }}>
                        <h2>城市选择</h2>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CityChoose;