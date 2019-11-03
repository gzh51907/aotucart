import React, { Component } from 'react';
import Category from './taocan/category'
import { Row ,Col ,Icon,Tabs, Select } from 'antd';

class Quick extends Component {

    

    render() {
 
        return (
            <div id="quick" style={{height:"100%"}}>
                <h2 style={{background:"#333",color:"#fff"}}>
                    <Icon type="left"></Icon>
                    套餐下单
                </h2>
                
                <Category></Category>
            </div>
        )
    }
}

export default Quick;