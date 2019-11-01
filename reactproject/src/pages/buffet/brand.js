import React, { Component } from 'react';
import { Row ,Col ,Icon,Tabs, Select } from 'antd';

// import '../css/buffet.css'
import {get} from '../../Api'

const { TabPane } = Tabs;




class Brand extends Component {

    state = {
        tabPosition: 'left',
        tab:[],
        list:[]
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition });
    }

    async componentDidMount(){
        let {data:{data}} = await get('/goods/all',{
            params:{collection:'z_cate'}
        })
        data = data[0].data
        // console.log(222,data)

        this.setState({
            ...this.state,
            tab:data.carPackageTypeList,
            list:data.packageList

        },()=>{
            console.log('tab:',this.state.tab)
            console.log('list:',this.state.list)
        })
    }   





    render() {
        let {tab,list} = this.state
        return (
            <div>
                <h2>分类页</h2>
                <Tabs tabPosition={this.state.tabPosition}>
                    {
                        tab.map((item,idx)=>{
                            return (
                                <TabPane tab={item.carPackageTypeText} key={item.carPackageTypeText}>
                                    <Row>
                                        {
                                            
                                        }
                                        <Col>
                                            <h4>title</h4>
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

export default Brand;