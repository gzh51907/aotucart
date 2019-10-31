import React, { Component } from 'react';
import { Carousel,Row,Col ,Icon,Menu, Dropdown, message} from 'antd';

import '../css/buffet.css'
import {get} from '../Api'
import Loadding from './buffet/loading'



class Buffet extends Component {

    state = {
        carlist:[],
        total:190,
        pause:false,
        show:false
    }

    // car=[]

    async componentDidMount(){
        let {total} = this.state
        let data = await this.layLoad(10,0)
        // console.log(data)
        this.setState({
            ...this.state,
            carlist:data,
        })

       
        //添加滚动条事件
        if(this.scrollDom){
            this.scrollDom.addEventListener('scroll',()=>{
                
                this.onScroll(this)
                // console.log('滚')
            })
        }

    }
    
    onScroll = ()=>{
        let {total,show} = this.state
        let { clientHeight, scrollHeight, scrollTop } = this.scrollDom;
        scrollTop = Math.ceil(scrollTop)
        const isBottom = clientHeight + scrollTop === scrollHeight;
        console.log(clientHeight, scrollHeight, scrollTop, isBottom);
        let i =0
        if(isBottom==true){
            console.log('到底了')
            if(i<=total){
                this.setState({
                    show:true
                })
                setTimeout(async () => {
                    let data = await this.layLoad(10,i+10)
                    // console.log(33333,data,i)
                    
                    i+=10
                    this.setState({
                        carlist:this.state.carlist.concat(data),
                    },()=>{
                        // console.log(55555,this.state.carlist)
                    }) 
                }, 2000);
               
            }

              
        }

    }

    async layLoad(limit=10,skip=0){
        let {data:{data}} = await get('/hui/goods/pages',{
            params:{
                limit,
                skip
            }
        })
        return data
    }


    render() {
        let {carlist,show} = this.state
        // console.log(222,carlist)
        return (
            <div className="box" style={{height:"100%",background:"#e9e9e9",overflow:"auto"}} ref={e=>(this.scrollDom = e)}>
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
                            carlist.map((item,i)=>{
                                
                                return <Col className="cars" style={{marginBottom:"10px"}} key={i}>
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
                    
                    </Row>
                    {   //懒加载--》加载中
                        show?<Loadding></Loadding>:<></>
                    }
                    
                </div>
            </div>
        ) 
    }
}

export default Buffet;