import React, { Component } from 'react';
import { Row ,Col ,Icon } from 'antd';

// import '../css/buffet.css'
import {get} from '../../Api'








   
function Loading() {
    
    
        
        return (
            <div>
               <Row >
                   <Col span={24} style={{height:50,lineHeight:'50px',color:"#999",background:"#e9e9e9",textAlign:'center'}}>
                        ...加载中
                   </Col>
               </Row>
            </div>
        )
    

}
    


export default Loading;