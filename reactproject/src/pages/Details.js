import React, { Component } from 'react';
import { Carousel,Row,Col ,Icon,Menu, Dropdown, message,Drawer} from 'antd';

import '../css/detail.css'
import {get,post} from '../Api'
// import Loadding from './buffet/loading'


class Detail extends Component {

    state={
        detail:{},
        banner:[],
        realcar:{}
    }

    async componentDidMount(){


        let carid = localStorage.getItem("carNo")
        console.log(carid)
        // carid = carid+''
        if(carid){
            let {data:{data}} = await get('/hui/goods/one',{
                params:{
                    id:carid
                }
            })
            this.setState({
                realcar:data
            })
            console.log("carNo",data)
        }

        let {data:{data}} = await get('/goods/all?collection=z_car_detail')
        data=data[0]
        this.setState({
            detail:data,
            banner:data.images
        },()=>{
            console.log(this.state.detail)
        })
    }

    da
    render() {
        let {detail,banner,realcar} = this.state

        return (
            <div id="detail">
                <Carousel autoplay>
                    {
                        banner.map((item,i)=>{
                            return (
                                <img src={`https://carphoto.aotuzuche.com/${item.picPath}`} key={item.picPath}/>
                            )
                         })
                    }
                    
                        
                    
                </Carousel>,
                <div className="content" style={{padding:"5px 10px"}}>
                    {
                        detail.carBaseInfo?
                        <div className="base-info" style={{width:"100%"}}>
                            <h2>{realcar.brand}<span style={{padding:"0 7px"}}>{detail.carBaseInfo.type}</span>{detail.carBaseInfo.sweptVolum}</h2>
                            <div className="price" style={{color:"red",fontSize:"16px",fontWeight:800}}>￥{realcar.dayPrice}/天</div>
                            <div><img src={'../imgs/logo/sp1.png'} style={{maxHeight:"20px"}}/><img src={'../imgs/logo/sp2.png'} style={{maxHeight:"20px",marginLeft:"5px"}}/></div>
                            <div style={{marginTop:"8px"}}>{detail.plateNum}  <span style={{padding:" 0 8px"}}>{detail.limitMileage} </span>      已租{detail.succTransCount}次</div>
                            <div style={{fontSize:"12px",marginTop:"8px",display:"block"}}>舒适驾驶</div>

                        </div> :console.log("-----")
                    }
                    
                </div>    
                
            </div>
        )
    }
}

export default Detail;