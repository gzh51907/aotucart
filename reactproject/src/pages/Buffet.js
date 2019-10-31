import React, { Component } from 'react';
import { Carousel,Row,Col ,Icon,Menu, Dropdown, message} from 'antd';


import '../css/buffet.css'
import {get} from '../Api'
class Buffet extends Component {

    state = {
        carlist:[]
    }

    

    async componentDidMount(){
        let {data:{data}} = await get('/goods/all',{
            params:{collection:"z_carlist"}
        })
        // console.log(data)
        this.setState({
            carlist:data
        })
    }


    render() {
        let {carlist} = this.state
        console.log(222,carlist)
        return (
            <div className="box" style={{height:"100%",background:"#e9e9e9",overflow:"auto"}}>
                <Row className="title" type="flex" align="middle">
                    <Col span={3}>
                        <Icon type="left"></Icon>
                    </Col>
                    <Col span={18}>
                        自助找车
                    </Col>
                    <Col span={3}>
                        <Icon type="home"></Icon>
                    </Col>
                </Row>
                <div className="top">
                    <Row className="top-header">
                        <Col span={24}></Col>
                        <Col span={24}></Col>
                    </Row>
                </div>
                <div className="main">
                    <div className="content-top">
                        <Row style={{height:45,borderBottom:"1px #999 solid"}}>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}></Col>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}></Col>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}></Col>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}></Col>
                        </Row>
                        <Row style={{height:60}}></Row>
                    </div>
                    <Row className="banner"><img src="../imgs/zizhubanner.jpg"/></Row>
                    <Row className="content">
                        {
                            carlist.map(item=>{
                                
                                return <Col className="cars" style={{marginBottom:"10px"}} key={item._id}>
                                        <img src={`https://carphoto.atzuche.com/`+item.coverPic} style={{width:150,height:100}}/>
                                        <div className="cars-right">
                                            <h4 className="car-name">{item.brand}</h4>
                                            <p className="car-info"><span>{item.plateNum}</span><em>{item.distance}</em></p>
                                            <p className="car-point">{item.carScore + '分'}<em>{item.evalTagList?item.evalTagList[0]:''}</em></p>
                                            <p className="car-price"><span>{'￥'+item.dayPrice+'天'}</span><em>已租{item.transCount}次</em></p>
                                        </div>
                                    </Col>
                                
                            })
                        }
                        {/* <Col className="cars" style={{marginBottom:"10px"}}>
                            <img src="../imgs/zizhubanner.jpg" style={{width:150,height:100}}/>
                            <div className="cars-right">
                                <h4 className="car-name">蔚来 蔚然锦和</h4>
                                <p className="car-info"><span>鱼A****11</span><em>7.4KM</em></p>
                                <p className="car-point">5.0分<em>驾驶舒适</em></p>
                                <p className="car-price"><span>￥500/天</span><em>已租22次</em></p>
                            </div>
                        </Col> */}
                    </Row>
                    
                </div>
            </div>
        ) 
    }
}

export default Buffet;