import React, { Component } from 'react';
import { Row ,Col ,Icon,Tabs, Select ,Drawer, Button } from 'antd';

import '../../css/category.css'
import {get} from '../../Api'
// import axios from 'axios'
//hoc
// import {test} from '../../hoc'



const { TabPane } = Tabs;

// @test

class Category extends Component {
    
    state = {
        tabPosition: 'left',
        tab:[],
        list:[],
        visible:false,
        datainf:{},
        detail:{}
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition });
    }



    async componentDidMount(){
        let {data:{data}} = await get('/goods/all',{
            params:{collection:'z_taocan'}
        })
        
        // data = data[0].data
        console.log(222,data)

        this.setState({
            ...this.state,
            tab:data,
            list:data.packageList,
            
        },()=>{
            // console.log('tab:',this.state.tab)
            // console.log('list:',this.state.list)
            // console.log('hoc:',this.props)
        })
    }   

    getData = async(id)=>{
        
    }



    //底部弹窗
    showDrawer = async (id) => {
        let {data:{data}} = await get('./hui/goods/taocan',{
            params:{
                id
            }
        })
        let {data:{data:detail}} = await get('/goods/all',{
            params:{collection:'z_detail'}
        })
        // data = data[0]
        detail = detail[0]
        this.setState({
          visible: true,
          datainf: data,
          detail
        });
        console.log(this.state)
        
    };

    onClose = () => {
        this.setState({
          visible: false,
        });
      };


    render() {
        let {tab,list,datainf:dt,detail} = this.state
        return (
            <div style={{height:'100%',overflow:"hidden",position: 'relative'}}  id="category">
                <Row>
                    <Col span={24}></Col>
                    <Col span={24}></Col>
                    <Col span={24}></Col>
                </Row>
                <Tabs tabPosition={this.state.tabPosition} >
                    {
                        tab.map((item,idx)=>{
                            return (
                                <TabPane tab={item.text} key={item.text} forceRender={false}>
                                    <Row>
                                        {   
                                            idx==7||idx==8?<h2>暂无数据</h2>:
                                            item.packageList.map((ele,i)=>{
                                                return(
                                                
                                                        <Col key={i} style={{background:"#fff",height:300,marginTop:"10px"}} 
                                                        className="item"
                                                        onClick={this.showDrawer.bind(this,ele.id)}
                                                        >
                                                        <h4>{ele.name}</h4>
                                                        <p className="desc">{ele.description}</p>
                                                        <div className="img"><img src={"https://carphoto.atzuche.com/"+ele.coverImagePath}></img></div>
                                                        <div className="price">￥<span>{ele.dayPrice}</span>/天<em></em></div>
                                                        <div className="item-bottom">
                                                            <p className="info">
                                                                <span>{ele.limitMileage}</span>
                                                                <span>{ele.gbType}</span>
                                                                <span>{ele.seatNum}座</span>
                                                            </p>
                                                            <p className="content">{ele.brandDescription}</p>
                                                        </div>
                                                    </Col>
                                                    
                                                    
                                                )
                                            })
                                        }
                                        
                                    </Row>
                                </TabPane>
                            )
                        })
                    }
  
                </Tabs>
                <div style={{ marginTop: 16 }}>
                <Button type="primary" onClick={this.showDrawer}>
                    Open
                </Button>
                </div>
                <Drawer
                title={<div><h5 style={{fontSize:"18px",fontWeight:800}}>{dt.name}</h5><h6>{dt.plateNumType}</h6></div>}
                placement="bottom"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                getContainer={false}
                style={{ position: 'absolute' }}
                >
                    <div className="picwall" style={{height:"185px"}}>
                        {   
                            dt.imgArr?dt.imgArr.map((x,i)=>{
                                return <img src={x} key={x} style={{maxWidth:200,marginLeft:"10px"}} ></img>
                            }):console.log('-------')
                            
                        }
                    </div>
                    <div className="draw-info">
                        <h3 style={{fontSize:"15px",marginBottom:"10px",fontWeight:800}}>基本配置</h3>
                        <Row style={{fontSize:"12px"}}>
                            <Col span={12} style={{marginBottom:"10px"}}>年款：{detail.modelYear}</Col>
                            <Col span={12} style={{marginBottom:"10px"}}>座位数：{detail.seatNum}</Col>
                            <Col span={12} style={{marginBottom:"10px"}}>车门数：{detail.doorNum}</Col>
                            <Col span={12} style={{marginBottom:"10px"}}>变速箱：{detail.gbType}</Col>
                            <Col span={12} style={{marginBottom:"10px"}}>日限历程：{detail.limitMileage}</Col>
                            <Col span={12} style={{marginBottom:"10px"}}>{detail.oilType}</Col>
                        </Row>
                    </div>
                    <div className="draw-info" style={{padding:"15px 0"}}>
                        <h3 style={{fontSize:"15px",marginBottom:"10px",fontWeight:800}}>建议乘坐人数</h3>
                        <Row style={{fontSize:"12px"}}>
                            <Col span={24} style={{marginBottom:"10px"}}>{detail.takeNum}</Col>
                        </Row>
                    </div>
                    <div className="draw-info" style={{padding:"15px 0"}}>
                        <h3 style={{fontSize:"15px",marginBottom:"10px",fontWeight:800}}>建议乘车型特点</h3>
                        <Row style={{fontSize:"12px"}}>
                            <Col span={24} style={{marginBottom:"10px"}}>{detail.carTypeChara}</Col>
                        </Row>
                    </div>
                    <div className="draw-info" style={{padding:"15px 0"}}>
                        <h3 style={{fontSize:"15px",marginBottom:"10px",fontWeight:800}}>你可能取到的车型</h3>
                        <Row style={{fontSize:"12px"}}>
                            <Col span={24} style={{marginBottom:"10px"}}>{detail.carTypePossible}</Col>
                        </Row>
                    </div>
                    <div className="button-group" style={{textAlign:"center"}}>
                        <Button onClick={this.onClose}>取消</Button>
                        <Button type="primary">提交</Button>
                        
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Category;