import React, { Component } from "react";
import { Layout, Icon, Carousel, Radio, Button, Row, Col } from "antd";
const { Header, Sider, Content } = Layout;
import "../css/subscribe.css";
import axios from "axios";
class Subscribe extends Component {
  state = {
    show: false
  };
  back() {
    this.props.history.goBack();
  }
  goto() {
    this.props.history.push("/home");
  }
  async submit() {
    let car = "豪车";
    let city = this.select.value;
    let phone = this.phone.value;
    let name = this.name.value;
    let purpose = this.purpose.value;
    if (city === "请选择用车城市") {
      this.tc.innerHTML = "请选择用车城市";
      this.setState({
        show: true
      });
    } else if (name === "") {
      this.tc.innerHTML = "请填写您的姓名";
      this.setState({
        show: true
      });
    } else if (phone === "") {
      this.tc.innerHTML = "请填写您的手机号码";
      this.setState({
        show: true
      });
    } else if (phone) {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(phone)) {
        this.tc.innerHTML = "请填写正确的手机号";
        this.setState({
          show: true
        });
      } else {
        if (purpose === "请选择租车用途") {
          this.tc.innerHTML = "请选择租车用途";
          this.setState({
            show: true
          });
        } else {
          let { data } = await axios.post(
            "http://10.3.133.66:1907/qgq/goods/addsubscribe",
            {
              car,
              city,
              phone,
              name,
              purpose
            }
          );
          console.log(data);
          if (data.code === 1) {
            this.tc.innerHTML = "预约成功";
            this.setState({
              show: true
            });
            var time = setTimeout(
              function() {
                this.props.history.goBack();
                clearTimeout(time);
              }.bind(this),
              2000
            );
          } else {
            this.tc.innerHTML = "预约失败";
            this.setState({
              show: true
            });
            this.p;
          }
        }
      }
    }
    var time = setTimeout(
      function() {
        this.setState({
          show: false
        });
        clearTimeout(time);
      }.bind(this),
      2000
    );
  }
  render() {
    return (
      <div>
        <Layout>
          <div
            className="tc"
            ref={tc => (this.tc = tc)}
            style={{ display: this.state.show ? "block" : "none" }}
          ></div>
          <Header style={{ backgroundColor: "#Fff", padding: 0 }}>
            <Row>
              <Col
                span={4}
                style={{ paddingLeft: 20, height: 55 }}
                onClick={this.back.bind(this)}
              >
                <Icon type="left" style={{ fontSize: 16 }} />
              </Col>
              <Col
                span={16}
                style={{ height: 55, textAlign: "center", fontWeight: 600 }}
              >
                申请预约
              </Col>
              <Col
                span={4}
                style={{ paddingRight: 20, height: 55, textAlign: "right" }}
                onClick={this.goto.bind(this)}
              >
                <Icon type="home" style={{ fontSize: 16 }} />
              </Col>
            </Row>
          </Header>
          <Content className="view-body">
            <div className="view-body-1 ">
              <img src="../img/img1.png" alt="" />
              <Row style={{ height: 50, fontSize: 13 }}>
                <Col span={6} style={{ lineHeight: 3, color: "#333" }}>
                  车型
                </Col>
                <Col
                  span={18}
                  style={{ lineHeight: 3, textAlign: "right", color: "#333" }}
                >
                  豪华型
                </Col>
              </Row>
              <Row style={{ height: 50 }}>
                <Col span={6} style={{ lineHeight: 3, color: "#333" }}>
                  分类
                </Col>
                <Col
                  span={18}
                  style={{ lineHeight: 3, textAlign: "right", color: "#333" }}
                >
                  奥迪A6L、奔驰E级、宝马5系等
                </Col>
              </Row>
            </div>
            <div className="view-body-1 ">
              <Row>
                <Col span={8} style={{ textAlign: "left" }}>
                  用车城市
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <select
                    style={{ border: 0, textAlign: "center" }}
                    ref={select => (this.select = select)}
                  >
                    <option value="请选择用车城市">请选择用车城市</option>
                    <option value="上海">上海</option>
                    <option value="南京">南京</option>
                    <option value="杭州">杭州</option>
                    <option value="广州">广州</option>
                    <option value="深圳">深圳</option>
                    <option value="北京">北京</option>
                    <option value="重庆">重庆</option>
                    <option value="青岛">青岛</option>
                    <option value="成都">成都</option>
                    <option value="厦门">厦门</option>
                    <option value="武汉">武汉</option>
                  </select>
                </Col>
              </Row>

              <Row>
                <Col span={8} style={{ textAlign: "left" }}>
                  手机号
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <input
                    type="text"
                    placeholder="请输入您的手机号码"
                    ref={phone => (this.phone = phone)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={8} style={{ textAlign: "left" }}>
                  姓名
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <input
                    type="text"
                    placeholder="请输入您的姓名"
                    ref={name => (this.name = name)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={8} style={{ textAlign: "left" }}>
                  租车用途
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <select
                    style={{ border: 0, textAlign: "center" }}
                    ref={purpose => (this.purpose = purpose)}
                  >
                    <option>请选择租车用途</option>
                    <option value="1">个人用车</option>
                    <option value="2">企业用车</option>
                    <option value="4">网约车</option>
                    <option value="9">其他</option>
                  </select>
                </Col>
              </Row>

              <div
                style={{ textAlign: "center", marginBottom: 15, marginTop: 15 }}
              >
                <Button className="submit" onClick={this.submit.bind(this)}>
                  提交申请
                </Button>
              </div>
            </div>
            <div className="tips">
              <strong>我们会尽快联系您，提供专人服务</strong>
              <p>上海新共赢信息科技有限公司 沪ICP备14010921号</p>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Subscribe;
