import React, { Component } from 'react';
import { Carousel,Row,Col ,Icon,Menu, Dropdown, message,Drawer} from 'antd';

import '../css/detail.css'
import {get,post} from '../Api'
// import Loadding from './buffet/loading'
import {days,getWeek,weekNum} from '../Api/time.js'
// console.log(days,weeks)
class Detail extends Component {
    // getWeekNum = getWeekNum()
    // getDay = getDay()
    state={
        detail:{},
        banner:[],
        realcar:{},
        date:[{
            day:days,
            num:"今"
        },{
            day:days+1,
            num:getWeek(weekNum+1)
        },{
            day:days+2,
            num:getWeek(weekNum+2)
        },{
            day:days+3,
            num:getWeek(weekNum+3)
        },{
            day:days+4,
            num:getWeek(weekNum+4)
        },{
            day:days+5,
            num:getWeek(weekNum+5)
        },{
            day:days+6,
            num:getWeek(weekNum+6)
        },]
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
            // console.log(days,weeks)
        })
    }

    da
    render() {
        let {detail,banner,realcar,date} = this.state

        return (
            <div id="detail" style={{width:"100%",paddingBottom:"65px"}}>
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
                            <h2 style={{fontWeight:800,fontSize:"22px"}}>{realcar.brand}<span style={{padding:"0 7px"}}>{detail.carBaseInfo.type}</span>{detail.carBaseInfo.sweptVolum}</h2>
                            <div className="price" style={{color:"red",fontSize:"16px",fontWeight:800}}>￥{realcar.dayPrice}/天</div>
                            <div><img src={'../imgs/logo/sp1.png'} style={{maxHeight:"20px"}}/><img src={'../imgs/logo/sp2.png'} style={{maxHeight:"20px",marginLeft:"5px"}}/></div>
                            <div style={{margin:"6px 0"}}>{detail.plateNum}  <span style={{padding:" 0 8px"}}>{detail.limitMileage} </span>      已租{detail.succTransCount}次</div>
                            <div style={{fontSize:"12px",marginTop:"8px",display:"block"}}>舒适驾驶</div>
                            <div style={{padding:"8px 0",borderBottom:"1px solid #e5e5e5",fontSize:"12px"}}>{realcar.carAddr}<span style={{float:"right",color:"#000"}}>{realcar.distanceTxt}></span></div>
                            <h4 style={{padding:"8px 0",}}>可租用时间</h4>
                            <Row style={{display:"flex",justifyContent:"space-between",paddingBottom:"20px",borderBottom:"1px solid #e5e5e5"}}>
                                {
                                    date.map((item,idx)=>{
                                        return(
                                            <Col key={item.num} span={3} style={{display:"flex",flexDirection:"column",textAlign:"center"}}>
                                                <span style={{color:item.num=="今"?"#58bc58":"#555",fontWeight:800}}>{item.num}</span>
                                                <i style={{width:"40px",height:"40px",
                                                background:"#e9e9e9",borderRadius:"50%",
                                                lineHeight:"40px",marginTop:"10px",
                                                fontWeight:700,color:item.num=="今"?"#58bc58":"#555"
                                                }}>{item.day}</i>
                                            </Col> 
                                        )
                                    })
                                }
                            </Row>
                            <h4 style={{padding:"8px 0",}}>用车限制</h4>
                            <div style={{width:"100%",overflowX:"auto",padding:"15px 0",height:"140px",borderBottom:"1px solid #e5e5e5"}}>
                                <div style={{width:"500px"}}>
                                {
                                detail.carRestrictionList.map((ele,x)=>{
                                    return(
                                        <div style={{width:"85px",height:"85px",display:"flex",
                                        justifyContent:"center",alignItems:"center",
                                        fontSize:"12px",flexDirection:"column",
                                        boxShadow: " 0 4px 12px 0 rgba(0, 0, 0, 0.2)",
                                        marginLeft:"15px",
                                        float:"left"
                                        }} key={ele.name}>
                                            <span>{ele.name}</span>
                                            <span>{ele.condition}</span>
                                        </div> 
                                    )
                                })
                            }
                                </div>
                            
                            </div>
                            <h4 style={{padding:"8px 0",}}>平台配置</h4>
                            <div style={{width:"100%",overflowX:"auto",padding:"15px 0",height:"140px",borderBottom:"1px solid #e5e5e5"}}>
                                <div style={{width:"600px"}}>
                                {
                                detail.propertyList.map((ele,x)=>{
                                    return(
                                        <div style={{width:"85px",height:"85px",display:"flex",
                                        justifyContent:"center",alignItems:"center",
                                        fontSize:"12px",flexDirection:"column",
                                        boxShadow: " 0 4px 12px 0 rgba(0, 0, 0, 0.2)",
                                        marginLeft:"15px",
                                        float:"left"
                                        }} key={ele.content}>
                                            <span>{ele.content}</span>
                                            <span ><img src={ele.imageUrl} style={{width:"25px",height:"25px"}}/></span>
                                        </div> 
                                    )
                                })
                            }
                                </div>
                            
                            </div>
                            

                        </div> :console.log("-----")
                    }
                    
                </div>    
                
                <div className="bottom" style={{height:"65px",padding:"10px",width:"100%",
                position:"fixed",bottom:0,textAlign:"center",background:"#fff",
                boxShadow: " 0 4px 12px 0 rgba(0, 0, 0, 0.2)"
                }}>
                    <button style={{color:"#fff",background:"#58bc58",width:"70%",margin:"0 auto",fontSize:"18px",lineHeight:"45px",
                    height:"45px"
                    }}
                    onClick={()=>this.props.history.push('/home')}
                    >立即租用</button>
                </div>
            </div>
        )
    }
}
import { format } from 'path';

export default Detail;