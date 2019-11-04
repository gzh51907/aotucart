import React, { Component } from 'react';
import { Carousel,Row,Col ,Icon,Menu, Dropdown, message,Drawer} from 'antd';

import '../css/buffet.css'
import {get} from '../Api'
import Loadding from './buffet/loading'
import Cate from './buffet/cate'


class Buffet extends Component {

    state = {
        carlist:[],
        total:190,
        pause:false,
        show:false,
        sort:'none',
        color:'#e9e9e9',
        paixu:'综合排序',
        type:'zonghe',
        visible:false,
        typeid:'',
    }

    // car=[]

    async componentDidMount(){
        this.setState({
            typeid:2
        })
        let {total,type} = this.state
        let carbrand = localStorage.getItem("goodsType")
        // this.setState({
        //     typeid:localStorage.getItem("goodsType")
        // },()=>{
        //     
        // })

        if(carbrand){
            let {data:{data}} = await get('/hui/goods/keyword',{
                params:{
                    keyword:carbrand
                }
            })
            // console.log("++++++______+++++___++++",data)
            this.setState({
                ...this.state,
                carlist:data,
            })
        }else{
            if(type=='zonghe'){
                let data = await this.layLoad(10,0)
                // console.log(data)
                this.setState({
                    ...this.state,
                    carlist:data,
                })
            }else{
                let data = await this.layLoad(60,0)
                // console.log(data)
                this.setState({
                    ...this.state,
                    carlist:data,
                })
            }
        }


        
        

       
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
        let i =30
        if(isBottom==true){
            console.log('到底了')
            if(i<=total){
                this.setState({
                    show:true
                })
                setTimeout(async () => {
                    let data = await this.layLoad(30,i+30)
                    // console.log(33333,data,i)
                    
                    
                    this.setState({
                        carlist:this.state.carlist.concat(data),
                    },()=>{
                        i+=30
                    }) 
                }, 2000);
            }
        }
    }

    

    goto=(path)=>{
        this.props.history.push(path)
    }

    onSort = ()=>{
        console.log(this.sort)
        // this.sort.style.display="block"
        this.setState({
            sort:'block',
            
        },()=>{
            // console.log(this.state.sort)
        })
    }


     sortBtn = async (paixu,type)=>{
        this.setState({
            color:'#58bc58',
            paixu,
            type
        },async ()=>{
            let data = await this.layLoad(60,0)
            this.setState({
                carlist:data
            })
        })
        setTimeout(() => {
            this.setState({
                sort:'none'
            },()=>{
                // console.log(this.state.sort)
            })
        }, 1000);
        console.log(type)
        // let {data} = await 
        
    }
 


    async layLoad(limit=10,skip=0){

        if(this.state.type=='priceup'){
            let {data:{data}} = await get('/hui/goods/priceup',{
                params:{
                    sort:"dayPrice",
                    limit,
                    skip
                }
            })
            return data
        }else if(this.state.type=='pricedown'){
            let {data:{data}} = await get('/hui/goods/pricedown',{
                params:{
                    sort:"dayPrice",
                    limit,
                    skip
                }
            })
            // console.log('22222')
            return data

        }else if(this.state.type=='zuce'){
            // console.log(777777777)
            let {data:{data}} = await get('/hui/goods/zucidown',{
                params:{
                    sort:"transCount",
                    limit,
                    skip
                }
            })
            return data
        }else if(this.state.type=='distance'){
            let {data:{data}} = await get('/hui/goods/distance',{
                params:{
                    sort:"distance",
                    limit,
                    skip
                }
            })
            return data
        }else if(this.state.type=='zonghe'){
            // console.log(8888)
            let {data:{data}} = await get('/hui/goods/pages',{
                params:{
                    limit,
                    skip
                }
            })
            return data
        }

        
    }
  
    //抽屉
    showDrawer = () => {
        this.setState({
          visible: true,
        });
        this.props.history.push("/test")
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
    
      sendCar=(id)=>{
        localStorage.removeItem("carNo")
        localStorage.setItem("carNo",id)
        this.props.history.push('/detail')
      }

    render() {
        let {carlist,show,sort,paixu} = this.state
        // console.log(222,carlist)
        return (
            <div  style={{height:"100%",background:"#e9e9e9",overflow:"hidden"}}  id="buffet">
                <Row className="title" type="flex" align="middle">
                    <Col span={3}>
                        <Icon type="left" onClick={this.goto.bind(this,'/home')}></Icon>
                    </Col>
                    <Col span={18}>
                        自助找车
                    </Col>
                    <Col span={3}>
                        <Icon type="home" onClick={this.goto.bind(this,'/home')}></Icon>
                    </Col>
                </Row>
                {/* <div className="top">
                     
                </div> */}
                <div className="main" style={{height:"100%",overflow:"auto"}} ref={e=>(this.scrollDom = e)}>
                    <div className="content-top">
                        <Row style={{height:45,borderBottom:"1px #e9e9e9 solid"}}className="c-top">
                            <Col span={6} style={{height:45,lineHeight:"45px",color:"#58bc58"}} onClick={this.onSort.bind(this)} >{paixu}<Icon type='caret-down' style={{color:'#999'}}></Icon></Col>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}>区域<Icon type='caret-down' style={{color:'#999'}}></Icon></Col>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}>租金<Icon type='caret-down' style={{color:'#999'}}></Icon></Col>
                            <Col span={6} style={{height:45,lineHeight:"45px"}}>品牌<Icon type='caret-down' style={{color:'#999'}} onClick={this.showDrawer}></Icon></Col>
                            <Col className="sort" span={24} style={{display:sort}}>
                                <Row ref={e=>(this.sort = e)} >
                                    <Col onClick={this.sortBtn.bind(this,'综合排序',"zonghe")}>综合排序</Col>
                                    <Col onClick={this.sortBtn.bind(this,"价格最低","priceup")}>价格最低</Col>
                                    <Col onClick={this.sortBtn.bind(this,"价格最高","pricedown")}>价格最高</Col>
                                    <Col onClick={this.sortBtn.bind(this,"距离最近","distance")}>距离最近</Col>
                                    <Col onClick={this.sortBtn.bind(this,"租次最多","zuce")}>租次最多</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{height:50}}></Row>
                    </div>
                    <Row className="banner" style={{marginTop:"50px"}}><img src="../img/zizhubanner.jpg"/></Row>
                    <Row className="content">
                        {
                            carlist.map((item,i)=>{
                                
                                return <Col className="cars" style={{marginBottom:"10px"}} key={i} onClick={()=>this.sendCar(item.carNo)}>
                                        <img src={`https://carphoto.atzuche.com/`+item.coverPic} style={{width:150,height:100}}/>
                                        <div className="cars-right">
                                            <h4 className="car-name">{item.brand}</h4>
                                            <p className="car-info"><span>{item.plateNum}</span><em>{item.distance+'km'}</em></p>
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
                
                {/* <Drawer
               
                placement="bottom"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                getContainer={false}
                style={{ position: 'absolute' }}
                >
                    <Cate></Cate>
                </Drawer> */}
            </div>
        ) 
    }
}

export default Buffet;