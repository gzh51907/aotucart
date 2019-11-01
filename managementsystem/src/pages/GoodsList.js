import React, { Component } from 'react';
import { Table, Button,Pagination,Icon } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';


const columns = [
    {
        title: 'Gid',
        dataIndex: 'key',
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
    render() {
        return (
            <div style={{overflowY:"auto",height:"100%"}}>
                <h2 style={{paddingLeft:"10px",color:"red"}}>商品列表</h2>
             <Table rowSelection={rowSelection} columns={columns} dataSource={data} 
             />
            
            </div>
        )
    }
}
export default GoodsList;