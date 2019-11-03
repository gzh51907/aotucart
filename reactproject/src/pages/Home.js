import React, { Component } from 'react';
import { Row, Col, Icon, Input, Carousel } from 'antd';
import '../css/home.scss';
import LazyLoad from 'react-lazyload';
// axios请求
import axios from 'axios';
let aotu = axios.create({
    baseURL: 'http://116.62.209.91:1907/'
})
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            bannerlist: [],
            quickList: [],
            quickList1: [],
            modelList: [],
            modelList1: [],
            show:false,
            topClassName:''
        };
        this.windowOnScroll();
        let isScrollTop = true;
    }
    async componentDidMount() {
        let { data } = await aotu.get('goods/all?collection=y_banner')
        let { bannerList } = data.data[0]
        this.setState({
            bannerList: bannerList,
            quickList: data.data[0].quickList.slice(0, 5),
            quickList1: data.data[0].quickList.slice(5)
        })
        
        let result = await aotu.get('goods/all?collection=y_home')
        // console.log(result.data.data[0].modelList.slice(4, 5));
        this.setState({
            modelList: result.data.data[0].modelList.slice(1, 3),
            modelList1: result.data.data[0].modelList.slice(4, 5)
        })
    }
    goto = (url) => {
        let { history } = this.props
        history.push(url);
    }
    // 吸顶
    
    windowOnScroll(){
        let _this = this;
        window.onscroll = function(){
             //获取滚动条滚动的距离
            let h = document.documentElement.scrollTop;
            // console.log(h);
            if(h > 175){
                _this.setState({
                    show:true,
                    topClassName:'homeTopClass'
                })
            }else{
                _this.setState({
                    show:false,
                    topClassName:''
                })
            }
            
        }
    };
    goToXingqing = (carNo)=>{
        console.log(carNo);
        localStorage.setItem('carNo',carNo)
    }
    render() {
        let { quickList, bannerList, quickList1, modelList, modelList1 ,show} = this.state;
        let urlArr =['/buffet','/quick','/longrent','/sharecart','/carowner'];
        quickList.map((item, index)=> {
            item.targetUrl = urlArr[index]
       })
        let { history } = this.props;
        return (
            <div className="home">
                <div className="home-top">
                    <div style={{width:'100%'}} className={this.state.topClassName}>
                        <Row type="flex" >
                            <Col span={4} order={1} style={{ textAlign: 'center' }} >
                                <span style={{ fontSize: 18, color: '#fff', }}>上海</span><Icon type="down-circle" style={{ color: '#fff', marginLeft: 5 }} theme='filled' />
                            </Col>
                            <Col span={16} order={2} style={{ textAlign: 'center' }}>
                                <div style={{lineHeight:56,height:'100%',width:'100%'}}>
                                    <Input placeholder="搜索目的地、品牌、车型" style={{display:show?'block':'none',width:'100%',height:30,backgroundColor:'#fff',borderRadius:15,bottom:0}} onClick={this.goto.bind(this,'/search')} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                                </div>
                                
                            </Col>

                            <Col span={4} order={3} style={{ textAlign: 'center' }}>
                                <Icon type="user" style={{ color: '#FFF', fontSize: 18 }} onClick={()=>{history.push('/userCenter')}} />
                            </Col>
                        </Row>
                    </div>
                    
                    <div className='home-input'>
                        <Input placeholder="搜索目的地、品牌、车型" onClick={this.goto.bind(this,'/search')} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                    </div>
                    

                </div>
                <div className='icon-list'>
                    <Carousel>
                        <div>
                            <div className="icon-item">
                                {
                                    quickList.map(it => {
                                        return <a className='item' onClick={this.goto.bind(this,it.targetUrl)}>
                                            <LazyLoad>
                                                <img src={"https://carphoto.aotuzuche.com/" + it.iconPath} alt="" />
                                            </LazyLoad>
                                            <p>{it.name}</p>
                                        </a>
                                    })
                                }
                            </div>
                        </div>

                        <div>
                            <div className="icon-item">
                                {
                                    quickList1.map(it => {
                                        return <a className='item'>
                                            <LazyLoad>
                                                <img src={"https://carphoto.aotuzuche.com/" + it.iconPath} alt="" />
                                            </LazyLoad>
                                            <p>{it.name}</p>
                                        </a>
                                    })
                                }
                            </div>
                        </div>


                    </Carousel>
                </div>
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Carousel autoplay >
                    {
                        bannerList ?
                            bannerList.map(item => {
                                return <div>
                                    <LazyLoad>
                                         <img src={"https://carphoto.aotuzuche.com/" + item.picPath} alt="" style={{ width: '100%', height: 140 }} />
                                    </LazyLoad>
                                </div>
                            })
                            :
                            ''
                    }

                    </Carousel>
                </div>
                

                <div className='car-list'>
                    {
                        modelList.map(item => {
                            return <div><Row type="flex" style={{ marginBottom: 20 }}>
                                <Col span={18} order={1} style={{ textAlign: 'left' }}>
                                    <h1 style={{ fontSize: 20 }}>{item.title}</h1>
                                </Col>
                                <Col span={6} order={2} style={{ textAlign: 'right' }}>
                                    <a style={{
                                        color: '#333',
                                        fontSize: 13
                                    }}>全部</a><Icon type="caret-right" />
                                </Col>
                            </Row>
                                <Row gutter={10}>
                                    {item.carList.map(it => {
                                        return <Col span={12} style={{ minHeight: 212 }}>
                                            <LazyLoad>
                                               <img src={"https://carphoto.aotuzuche.com/" + it.picPath} onClick={this.goToXingqing.bind(this,it.carNo)} alt="" style={{ height: 107.5, width: 162.5 }} /> 
                                            </LazyLoad>
                                            
                                            <h3 style={{ fontSize: 16, color: '#333' }}>{it.brandInfo} {it.sweptVolum}</h3>
                                            <p><span style={{ color: '#666', fontSize: 13 }}>{it.plateNumber}</span><span style={{ fontSize: 13, marginLeft: 7, color: ' #f90' }}>{it.carScore + '分'}</span></p>
                                            <p style={{ fontSize: 12, color: '#f75559' }}>￥<span style={{ fontSize: 18 }}>{it.dayPrice}</span>/天</p>
                                        </Col>


                                    })}
                                </Row>
                            </div>

                        })
                    }
                    {
                        modelList1.map(item => {
                            return <div>
                                <Row type="flex" style={{ marginBottom: 20 }}>
                                    <Col span={18} order={1} style={{ textAlign: 'left' }}>
                                        <h1 style={{ fontSize: 20 }}>{item.title}</h1>
                                    </Col>
                                    <Col span={6} order={2} style={{ textAlign: 'right' }}>
                                        <a style={{
                                            color: '#333',
                                            fontSize: 13
                                        }}>全部</a><Icon type="caret-right" />
                                    </Col>
                                </Row>
                                <ul >
                                    {
                                        item.carTypeList.map(it => {
                                            return <li>
                                                <LazyLoad><img src={"https://carphoto.aotuzuche.com/" + it.picPath} onClick={this.goToXingqing.bind(this,it.carNo)} alt="" style={{ height: 107.5, width: 162.5 }} /></LazyLoad>
                                                
                                                <h3 style={{ fontSize: 16, color: '#333' }}>{it.brandInfo} {it.sweptVolum}</h3>
                                                <p><span style={{ color: '#666', fontSize: 13 }}>{it.plateNumber}</span><span style={{ fontSize: 13, marginLeft: 7, color: ' #666' }}>{"租赁指数  " + it.leaseIndex}</span></p>
                                                <p style={{ fontSize: 12, color: '#f75559' }}>￥<span style={{ fontSize: 18 }}>{it.dayPrice}</span>/天</p>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        })
                    }

                </div>

            </div>
        )
    }
}

export default Home;