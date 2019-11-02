import React, { Component } from "react";
import { Icon, Carousel, Drawer, Button, Radio, Row, Col, Input } from "antd";

import BMap from "BMap";
import "../css/sharcart.css";
class ShareCart extends Component {
  state = {
    city: "",
    show: true,
    visible: false,
    search: true
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value
    });
  };
  shows() {
    this.setState({
      show: false
    });
  }
  back() {
    this.props.history.goBack();
  }
  goto(path) {
    this.props.history.push(path);
  }
  searchBtn() {
    this.setState({
      search: true
    });
  }
  SearchCity(ads) {
    console.log(ads);
    var map = new BMap.Map("address");
    // var point = new BMap.Point(116.331398, 39.897445);
    var local = new BMap.LocalSearch(map, {
      renderOptions: { map: map, panel: "results" }
    });
    local.search(ads);
  }
  dw() {
    localStorage.cy = "北京";
    var map = new BMap.Map("address");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    var myGeo = new BMap.Geocoder();
    var geolocation = new BMap.Geolocation();

    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.centerAndZoom(r.point, 15);
        map.panTo(r.point.lng, r.point.lat);

        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(
          result
        ) {
          if (result) {
            console.log(result);
            localStorage.city = result.addressComponents.city;
          }
        });
      }
    });

    // 根据坐标得到地址描述

    var opts = {
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      offset: new BMap.Size(20, 300)
    };
    var op = { offset: new BMap.Size(20, 200) };
    map.addControl(new BMap.NavigationControl(op));
    //设置缩放按钮位置及类型

    //将定位控件添加到地图上

    map.addControl(new BMap.GeolocationControl(opts));
    var myIcon = new BMap.Icon(
      "http://7xic1p.com1.z0.glb.clouddn.com/markers.png",
      new BMap.Size(23, 25)
    );
    var marker = new BMap.Marker(point, { Icon: myIcon }); // 创建标注
    map.addOverlay(marker);
    console.log(point);
    // var myIcon = new BMap.Icon(
    //   "http://7xic1p.com1.z0.glb.clouddn.com/markers.png",
    //   new BMap.Size(23, 25)
    // );
    // var marker = new BMap.Marker(point, { Icon: myIcon }); // 创建标注
    // map.addOverlay(marker);
    // function myFun(result) {
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   console.log(result);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
    // var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
    //   icon: icon
    // });

    // var geoc = new BMap.Geocoder();
    // map.addEventListener("click", function(e) {
    //   var pt = e.point;
    //   geoc.getLocation(pt, function(rs) {
    //     var addComp = rs.addressComponents;
    //     alert(
    //       addComp.province +
    //         ", " +
    //         addComp.city +
    //         ", " +
    //         addComp.district +
    //         ", " +
    //         addComp.street +
    //         ", " +
    //         addComp.streetNumber
    //     );
    //   });
    // });
  }
  componentDidMount() {
    this.dw();

    this.setState({
      city: localStorage.city ? localStorage.city : localStorage.cy
    });
    if (localStorage.city === "") {
      window.alert("定位失败");
    }
  }

  render() {
    let { city, show, search } = this.state;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="address" id="address"></div>
        <div className="search" onClick={this.searchBtn.bind(this)}>
          <Icon
            type="search"
            style={{ color: "#000", fontSize: 16, fontWeight: 500 }}
          />
        </div>
        <div
          className="search-box"
          style={{ display: search ? "block" : "none" }}
        >
          <div
            style={{
              width: "100%",
              height: 40,
              boxShadow: "0 5px 10px 0 rgba(86,76,39,.1)",
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Row style={{ height: "100%" }}>
              <Col span={5} style={{ height: "100%", lineHeight: 3 }}>
                {city}
              </Col>
              <Col span={14}>
                <Input
                  placeholder="查找起始位置或目的地"
                  size="large"
                  style={{ border: 0 }}
                  onChange={this.SearchCity()}
                />
              </Col>
              <Col
                span={5}
                style={{ height: "100%", lineHeight: 3, textAlign: "right" }}
              >
                取消
              </Col>
            </Row>
          </div>
          <div className="results"></div>
          <div
            style={{
              textAlign: "center",
              fontSize: 23,
              fontWeight: 200,
              marginTop: 30
            }}
          >
            <h1>清空历史记录</h1>
          </div>
        </div>
        <div className="box-header">
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
              onClick={this.goto.bind(this, "/home")}
            >
              <Icon type="user" style={{ fontSize: 20 }} />
            </Col>
          </Row>
          <Row style={{ height: 50, textAlign: "center" }}>
            <Col span={8} style={{ height: "100%" }}>
              自由租
            </Col>
            <Col
              span={8}
              style={{ height: "100%" }}
              onClick={this.goto.bind(this, "/firstorder")}
            >
              抢先订
            </Col>
            <Col span={8} style={{ height: "100%" }}>
              好玩的车
            </Col>
          </Row>
        </div>
        <div
          className="masker"
          style={{ display: show ? "block" : "none" }}
          onClick={this.shows.bind(this)}
        ></div>
        <div className="box-foot" style={{ bottom: show ? 0 : -50 }}>
          <Button
            className="bt"
            ref={btn => (this.btn = btn)}
            onClick={this.showDrawer}
          >
            立即用车
          </Button>
          <div className="box-foot-1">
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                最新活动
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                更多
                <Icon type="right" />
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 20 }}>
              <Col span={12}>
                <div className="f-box f-box1 "></div>
              </Col>
              <Col span={12}>
                <div className="f-box f-box2"></div>
              </Col>
            </Row>
          </div>
        </div>
        <Drawer
          title="租车信息"
          placement={"bottom"}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{ zIndex: 200 }}
        >
          <h1 style={{ fontSize: 26 }}>暂无车辆</h1>
        </Drawer>
      </div>
    );
  }
}

export default ShareCart;
