import React, { Component } from "react";
import axios from "axios";
import { Layout, Icon, Carousel, Radio, Button } from "antd";
const { Header, Content } = Layout;
const RadioGroup = Radio.Group;
// import {} from 'redux'
import "../css/longRent.css";
class LongRent extends Component {
  state = {
    data: []
  };
  async componentDidMount() {
    console.log(this.props.history);
    let {
      data: { data }
    } = await axios.get("http://10.3.133.66:1907/goods/all?", {
      params: {
        collection: "q_cczc"
      }
    });
    this.setState({
      data
    });
    console.log(data);
  }
  goto() {
    this.props.history.push("/subscribe");
  }

  render() {
    let { data } = this.state;
    return (
      <div>
        <Layout style={{ backgroundColor: "#eeeeeee5" }}>
          <Header
            style={{
              height: 55,
              padding: 0,
              backgroundColor: "#eeeeeee5",
              textAlign: "left"
            }}
          >
            <Icon
              type="left"
              style={{ paddingLeft: 20, fontSize: 16, color: "#333 " }}
            />
          </Header>
          <Content style={{ paddingBottom: 15 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between ",
                padding: "0px 20px"
              }}
            >
              <p style={{ display: "flex" }}>
                <h1 style={{ fontSize: 26 }}>超值便捷月租 </h1>
                <span
                  style={{ color: "#009288", lineHeight: 4, fontWeight: 400 }}
                >
                  （30天起）
                </span>
              </p>
              <a
                style={{
                  color: "#009288",
                  textDecoration: "underline ",
                  lineHeight: 3
                }}
              >
                规则说明
              </a>
            </div>
            <div
              style={{
                padding: "0px 20px 20px 20px",
                fontSize: 13,
                color: "#999"
              }}
            >
              车型丰富 海量车源 车况优异 超值优惠 专业服务 用车无忧
            </div>
            <div></div>
            <Carousel
              dotPosition="top left"
              className="swipe"
              autoplay
              style={{ marginLeft: 20 }}
            >
              <div className=" swipe-box-1">
                <h1 class="swipe-box-title">经济型</h1>
                <h2 class="swipe-box-price">
                  <p>
                    <span class="swipe-box-price-num">2700</span>元起/月
                  </p>
                  <p>
                    <span class="swipe-box-price-del">6000元起/月</span>
                  </p>
                </h2>
                <p class="swipe-box-type">车型分类</p>
                <p class="swipe-box-type-of">
                  大众朗逸、丰田卡罗拉、福特福克斯等
                </p>
                <img
                  class="swipe-box-img swipe-box-img-1"
                  src="../img/ia_100000010.png"
                  alt=""
                />
              </div>

              <div className=" swipe-box-2">
                <h1 class="swipe-box-title">经济型</h1>
                <h2 class="swipe-box-price">
                  <p>
                    <span class="swipe-box-price-num">2700</span>元起/月
                  </p>
                  <p>
                    <span class="swipe-box-price-del">6000元起/月</span>
                  </p>
                </h2>
                <p class="swipe-box-type">车型分类</p>
                <p class="swipe-box-type-of">
                  大众朗逸、丰田卡罗拉、福特福克斯等
                </p>
                <img
                  class="swipe-box-img swipe-box-img-1"
                  src="../img/ia_100000012.png"
                  alt=""
                />
              </div>
              <div className=" swipe-box-3">
                <h1 class="swipe-box-title">经济型</h1>
                <h2 class="swipe-box-price">
                  <p>
                    <span class="swipe-box-price-num">2700</span>元起/月
                  </p>
                  <p>
                    <span class="swipe-box-price-del">6000元起/月</span>
                  </p>
                </h2>
                <p class="swipe-box-type">车型分类</p>
                <p class="swipe-box-type-of">
                  大众朗逸、丰田卡罗拉、福特福克斯等
                </p>
                <img
                  class="swipe-box-img swipe-box-img-1"
                  src="../img/ia_100000013.png"
                  alt=""
                />
              </div>
              <div className=" swipe-box-4">
                <h1 class="swipe-box-title">经济型</h1>
                <h2 class="swipe-box-price">
                  <p>
                    <span class="swipe-box-price-num">2700</span>元起/月
                  </p>
                  <p>
                    <span class="swipe-box-price-del">6000元起/月</span>
                  </p>
                </h2>
                <p class="swipe-box-type">车型分类</p>
                <p class="swipe-box-type-of">
                  大众朗逸、丰田卡罗拉、福特福克斯等
                </p>
                <img
                  class="swipe-box-img swipe-box-img-1"
                  src="../img/ia_100000013.png"
                  alt=""
                />
              </div>
              <div className=" swipe-box-5">
                <h1 class="swipe-box-title">经济型</h1>
                <h2 class="swipe-box-price">
                  <p>
                    <span class="swipe-box-price-num">2700</span>元起/月
                  </p>
                  <p>
                    <span class="swipe-box-price-del">6000元起/月</span>
                  </p>
                </h2>
                <p class="swipe-box-type">车型分类</p>
                <p class="swipe-box-type-of">
                  大众朗逸、丰田卡罗拉、福特福克斯等
                </p>
                <img
                  class="swipe-box-img swipe-box-img-1"
                  src="../img/ia_100000014.png"
                  alt=""
                />
              </div>
            </Carousel>
          </Content>
          <div className="body-bg"></div>
          <p
            style={{
              marginBottom: 10,
              fontSize: 13,
              textAlign: "center",
              marginTop: 10
            }}
          >
            已有253000人预约
          </p>
          <Button className="submit" onClick={this.goto.bind(this)}>
            申请预约 <Icon type="arrow-right" />
          </Button>
          <div style={{ width: "100%", height: 10 }}></div>
        </Layout>
      </div>
    );
  }
}

export default LongRent;
