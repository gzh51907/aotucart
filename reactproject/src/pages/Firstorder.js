import React, { Component } from "react";
import { Icon, Carousel, Button, Row, Col, Tabs, Tag } from "antd";
const { TabPane } = Tabs;
import "../css/sharcart.css";
import "../css/firstorder.css";
class ShareCart extends Component {
  state = {
    city: "",
    show: true
  };

  shows() {
    this.setState({
      show: false
    });
  }
  back() {
    this.props.history.goBack();
  }
  goto() {
    this.props.history.push("/home");
  }

  componentDidMount() {
    this.setState({
      city: localStorage.city ? localStorage.city : localStorage.cy
    });
  }

  render() {
    let { city, show } = this.state;
    return (
      <div>
        <div
          className="box-header"
          style={{ boxShadow: " 0 5px 10px 0 rgba(86,76,39,.1)" }}
        >
          <Row style={{ height: 43 }}>
            <Col
              span={4}
              style={{
                paddingLeft: 20,
                height: "100%",
                lineHeight: 3
              }}
              onClick={this.back.bind(this)}
            >
              <Icon type="left" style={{ fontSize: 20 }} />
            </Col>
            <Col
              span={16}
              style={{ height: "100%", textAlign: "center", fontWeight: 600 }}
            >
              {city}
            </Col>
            <Col
              span={4}
              style={{
                paddingRight: 20,
                height: "100%",
                textAlign: "right",
                lineHeight: 3
              }}
              onClick={this.goto.bind(this)}
            >
              <Icon type="user" style={{ fontSize: 20 }} />
            </Col>
          </Row>
          <Row style={{ height: 50, textAlign: "center" }}>
            <Col
              span={8}
              style={{ height: "100%" }}
              onClick={this.back.bind(this)}
            >
              自由租
            </Col>
            <Col span={8} style={{ height: "100%" }}>
              抢先订
            </Col>
            <Col span={8} style={{ height: "100%" }}>
              好玩的车
            </Col>
          </Row>
        </div>
        <div className="main-box">
          <div>
            <Carousel autoplay>
              <div className="l_box">
                <img src="../img/1558065214626.png" alt="" />
              </div>
              <div className="l_box">
                <img src="../img/1564541684772.png" alt="" />
              </div>
            </Carousel>
          </div>
          <div>
            <Tabs defaultActiveKey="1" tabBarGutter={45}>
              <TabPane tab="任意租" key="1">
                <Row style={{ marginTop: 20 }}>
                  <Col span={10}>
                    <img src="../img/kia_hc.png" alt="" className="img-box" />
                  </Col>
                  <Col span={14}>
                    <Row style={{ color: "#000000" }}>
                      <Col span={12} style={{ fontSize: 18, fontWeight: 500 }}>
                        起亚焕驰
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <i style={{ fontSize: 13 }}>￥</i>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                          98
                        </span>
                        天/起
                      </Col>
                    </Row>
                    <p style={{ marginTop: 10 }}>
                      <Tag>泸牌</Tag> <Tag>自动挡</Tag> <Tag>油车</Tag>
                      <Tag>五座</Tag>
                    </p>
                  </Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                  <Col span={10}>
                    <img src="../img/aodia3.png" alt="" className="img-box" />
                  </Col>
                  <Col span={14}>
                    <Row style={{ color: "#000000" }}>
                      <Col span={12} style={{ fontSize: 18, fontWeight: 500 }}>
                        奥迪A3
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <i style={{ fontSize: 13 }}>￥</i>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                          158
                        </span>
                        天/起
                      </Col>
                    </Row>
                    <p style={{ marginTop: 10 }}>
                      <Tag>泸牌</Tag> <Tag>自动挡</Tag> <Tag>油车</Tag>
                      <Tag>五座</Tag>
                    </p>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="七日租" key="2">
                <Row style={{ marginTop: 20 }}>
                  <Col span={10}>
                    <img src="../img/kia_hc.png" alt="" className="img-box" />
                  </Col>
                  <Col span={14}>
                    <Row style={{ color: "#000000" }}>
                      <Col span={12} style={{ fontSize: 18, fontWeight: 500 }}>
                        起亚焕驰
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <i style={{ fontSize: 13 }}>￥</i>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                          96
                        </span>
                        天/起
                      </Col>
                    </Row>
                    <p style={{ marginTop: 10 }}>
                      <Tag>泸牌</Tag> <Tag>自动挡</Tag> <Tag>油车</Tag>
                      <Tag>五座</Tag>
                    </p>
                  </Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                  <Col span={10}>
                    <img src="../img/aodia3.png" alt="" className="img-box" />
                  </Col>
                  <Col span={14}>
                    <Row style={{ color: "#000000" }}>
                      <Col span={12} style={{ fontSize: 18, fontWeight: 500 }}>
                        奥迪A3
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <i style={{ fontSize: 13 }}>￥</i>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                          155
                        </span>
                        天/起
                      </Col>
                    </Row>
                    <p style={{ marginTop: 10 }}>
                      <Tag>泸牌</Tag> <Tag>自动挡</Tag> <Tag>油车</Tag>
                      <Tag>五座</Tag>
                    </p>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="30日起" key="3">
                <Row style={{ marginTop: 20 }}>
                  <Col span={10}>
                    <img src="../img/kia_hc.png" alt="" className="img-box" />
                  </Col>
                  <Col span={14}>
                    <Row style={{ color: "#000000" }}>
                      <Col span={12} style={{ fontSize: 18, fontWeight: 500 }}>
                        起亚焕驰
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <i style={{ fontSize: 13 }}>￥</i>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                          98
                        </span>
                        天/起
                      </Col>
                    </Row>
                    <p style={{ marginTop: 10 }}>
                      <Tag>泸牌</Tag> <Tag>自动挡</Tag> <Tag>油车</Tag>
                      <Tag>五座</Tag>
                    </p>
                  </Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                  <Col span={10}>
                    <img src="../img/aodia3.png" alt="" className="img-box" />
                  </Col>
                  <Col span={14}>
                    <Row style={{ color: "#000000" }}>
                      <Col span={12} style={{ fontSize: 18, fontWeight: 500 }}>
                        奥迪A3
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <i style={{ fontSize: 13 }}>￥</i>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                          158
                        </span>
                        天/起
                      </Col>
                    </Row>
                    <p style={{ marginTop: 10 }}>
                      <Tag>泸牌</Tag> <Tag>自动挡</Tag> <Tag>油车</Tag>
                      <Tag>五座</Tag>
                    </p>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
            ,
          </div>
        </div>
      </div>
    );
  }
}

export default ShareCart;
