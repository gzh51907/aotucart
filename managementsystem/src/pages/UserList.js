import React, { Component } from 'react';
import { Table, Button,Pagination,Icon } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';


const columns = [
    {
        title: 'Uid',
        dataIndex: 'uid',
    },
    {
        title: '用户名',
        dataIndex: 'username',
    },
    {
        title: '用户密码',
        dataIndex: 'password',
    },{
        title: '手机号',
        dataIndex: 'phoneNum',
    },
    {
        title: '注册时间',
        dataIndex: 'regtime',
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
        uid:i,
        username: `日产GT ${i}`,
        password: '6666666',
        regtime: Date.now(),
        phoneNum:`1897777788${i}`
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
             <Table rowSelection={rowSelection} columns={columns} dataSource={data} 
             />
            
            </div>
        )
    }
}
export default GoodsList;