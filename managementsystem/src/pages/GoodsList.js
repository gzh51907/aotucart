import React, { Component } from 'react';
import { Table, Button,Pagination,Icon } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import {get} from "../Api"

const columns = [
    {
        title: 'Gid',
        dataIndex: '_id',
    },
    {
        title: '品牌/车型',
        dataIndex: 'brand',
    },
    {
        title: '车牌号',
        dataIndex: 'plateNum',
    },
    {
        title: '地址',
        dataIndex: 'carAddr',
    },
    {
        title: '价格/天',
        dataIndex: 'dayPrice',
    },
    {
        title: '操作',
        dataIndex: 'button',
        render: () => <ButtonGroup><Button icon="edit" type="primary"></Button ><Button icon="delete" type="danger" ></Button></ButtonGroup>
    }
];

const data = [];
for (let i = 0; i < 26; i++) {
    data.push({
        key: i,
        brand: `日产GT-R 3.8 ${i}`,
        plateNum: '粤A66666',
        carAddr: `广州天河`,
        dayPrice:'685元/天'
    });
}
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

class GoodsList extends Component {

    state = {
        data:[],
    }
   
async componentDidMount(){
  //发送请求过去所有用户信息
   let {data:{data}} = await get('hrr/user/carlist');
   console.log(data);
    this.setState({
        data
    })
    
}
    render() {
        let {data} = this.state
        return (
            <div style={{overflowY:"auto",height:"100%"}}>
                <h2 style={{paddingLeft:"10px",color:"red"}}>商品列表</h2>
             <Table rowSelection={rowSelection}
              columns={columns} 
              dataSource={data} 
             scroll={{ x: "100%", y: 350 }}
             />
            
            </div>
        )
    }
}
export default GoodsList;