import React, { Component } from 'react';
import { Table, Button,Pagination,Icon } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import {get} from '../Api'
import { Item } from 'rc-menu';
const columns = [
    {
        title: 'Uid',
        dataIndex: '_id',
    },
    {
        title: '昵称',
        dataIndex: 'username2',
    },
    {
        title: '手机号',
        dataIndex: 'username',
    },
    {
        title: '注册时间',
        dataIndex: 'regtime',
    },
    {
        title: '操作',
        dataIndex: 'button',
        render: () => <ButtonGroup><Button icon="edit" type="primary"></Button ><Button icon="delete" type="danger" onClick={remveItem}></Button></ButtonGroup>
    }
]

function remveItem(a) {
    console.log(a);
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
            columns : [
                // {
                //     title: 'Uid',
                //     dataIndex: '_id',
                // },
                // {
                //     title: '昵称',
                //     dataIndex: 'username2',
                // },
                // {
                //     title: '手机号',
                //     dataIndex: 'username',
                // },
                // {
                //     title: '注册时间',
                //     dataIndex: 'regtime',
                // },
                {
                    title: '操作',
                    dataIndex: 'button',
                    render: () => <ButtonGroup><Button icon="edit" type="primary"></Button ><Button icon="delete" type="danger" onClick={remveItem}></Button></ButtonGroup>
                }
            ]
        }
    
       
  async componentDidMount(){
      //发送请求过去所有用户信息
       let {data:{data}} = await get('hrr/user/all');
       console.log(data);
        this.setState({
            data,
            // columns:[data,...this.state.columns]
        })

        
    }
    render() {
        let {data} = this.state
        return (
            <div style={{overflowY:"auto",height:"100%"}}>
                <h2 style={{paddingLeft:"10px",color:"red"}}>用户列表</h2>
             <Table rowSelection={rowSelection} columns={columns} dataSource={data}
             scroll={{ x: "100%", y: 350 }}  }

             />
            </div>
        )
    }
}
export default GoodsList;