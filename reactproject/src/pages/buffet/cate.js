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
        tab:[],
        list:[]
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition });
    }

    //根据不同类型渲染不同结果
    changeShow = ()=>{

    }

    getType = ()=>{
        

    }


    async componentDidMount(){
        let {data:{data}} = await get('/goods/all',{
            params:{collection:'z_category'}
        })
        data = data[0]
        console.log(222,data)

        this.setState({
            ...this.state,
            tab:data.brandSortMap,
            list:data.packageList

        },()=>{
            // console.log('tab:',this.state.tab)
            // console.log('list:',this.state.list)
            // console.log('hoc:',this.props)
        })
    }   





    render() {
        let {tab,list} = this.state
        return (
            <div>
                <h2><Icon type="close"></Icon>品牌与车系</h2>
                <Tabs tabPosition={this.state.tabPosition}>
                    {
                        tab.map((item,idx)=>{
                            return (
                                <TabPane tab={<h4>{item.carPackageTypeText}</h4>} key={item.carPackageTypeText}>
                                    <Row>
                                        {
                                            
                                        }
                                        <Col>
                                            <h4>{item.carPackageTypeText}</h4>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )
                        })
                    }
                    
                </Tabs>
            </div>
        )
    }
}

export default Cate;