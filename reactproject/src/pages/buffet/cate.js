import React, { Component } from 'react';
import { Row ,Col ,Icon,Tabs, Select } from 'antd';

import '../../css/cate.css'
import {get} from '../../Api'
//hoc
// import {test} from '../../hoc'


 
const { TabPane } = Tabs;

// @test

class Cate extends Component {
    
    state = {
        tabPosition: 'left',
        num:[],
        brand:[],
        host:[],
        list:[]
    }


    //根据不同类型渲染不同结果
    changeShow = ()=>{

    }

    getType = ()=>{
        

    }

    sendId=(id)=>{
        localStorage.clear()
        localStorage.setItem("goodsType",id)
        this.props.history.push('/buffet')
    }

    async componentDidMount(){
        let {data:{data}} = await get('/goods/all',{
            params:{collection:'z_category'}
        })
        data = data[0]
        // console.log(222,data)

        let {data:{data:list}} = await get('/goods/all',{
            params:{collection:'z_brand'}
        })
        console.log(list)
        this.setState({
            list,
            num:Object.keys(data.brandSortMap),
            brand:Object.values(data.brandSortMap),
            host:data.hotBrandConfigList

        },()=>{ 
            console.log('tab:',this.state)
            
        })
        console.log(this.props)
    }   
 

    handleClick=(e)=>{
        console.log(888)
        // e.stopPropagation()
    }

    render() {
        let {brand,host,num,list} = this.state
        return (
            <div id="cate">
                <h2><Icon type="close" onClick={()=>this.props.history.push('/buffet')}></Icon>品牌与车系</h2>
                <Tabs tabPosition={this.state.tabPosition}>
                    {
                        brand.map((item,i)=>{
                            return item.map((ele,idx)=>{
                                return(
                                    <TabPane tab={<div><img src={`./img/${ele.iconName}`} 
                                    style={{width:"25px",height:"25px"}}/>
                                    <span>{ele.txt}</span></div>} key={ele.txt} 
                                    style={{padding:"20px"}} forceRender={false}
                                    >
                                        <Row>
                                            {
                                                list.map((el,x)=>{
                                                    return el.type==ele.id?el.typeList.map((a,b)=>{
                                                        return <Col key={a.txt} 
                                                                style={{textAlign:"center",padding:"16px 0px"}}
                                                                onClick = {()=>this.sendId(ele.txt)}
                                                                >
                                                                    {a.txt}
                                                                </Col>
                                                    }):""
                                                         
                                                })
                                            }
                                            {/* <Col>
                                                <h4>{ele.txt}</h4>
                                            </Col> */}
                                        </Row>
                                    </TabPane>
                                )
                            })
                            
                        })
                    }
                    
                </Tabs>
                    
            </div>
        )
    }
}

export default Cate;