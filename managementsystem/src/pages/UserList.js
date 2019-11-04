import React, { Component } from 'react';
import { Table, Button, Pagination, Icon,Popconfirm } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { get,post } from '../Api'
import { Item } from 'rc-menu';

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

    constructor() {
        super();
        this.columns = [
            {
                title: 'Uid',
                key: '_id',
                dataIndex: 'Uid',
            },
            {
                title: '昵称',
                key: 'username2',
                dataIndex: 'username2',
            },
            {
                title: '手机号',
                key: 'username',
                dataIndex: 'username',
            },
            {
                title: '注册时间',
                key: 'regtime',
                dataIndex: 'regtime',
            },
            {
                title: '操作',
                key: 'button',
                dataIndex: 'button',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            }
        ]
    }

    state = {
        dataSource: [],

    }

    async componentDidMount() {
        //发送请求过去所有用户信息
        let { data: { data } } = await get('hrr/user/all');
        console.log(data);
        let data1 = [];
        data.map(item => {
            //    console.log(item);
            data1.push({
                key: item._id,
                Uid: item._id,
                username2: item.username2,
                username: item.username,
                regtime: item.regtime,
            });
        })
        this.setState({
            dataSource: data1
        })
    }

     handleDelete =async (key) => {
         
        console.log(key);
        const dataSource = [...this.state.dataSource];
        let {username} = dataSource.filter(item => item.key == key)[0]
        console.log(username);
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        let {data} = await post('hrr/user/deluser',{username})
        let {msg,code} = data;
        if(code){
            alert(msg)
        } else {
            alert(msg)
        }
      };

    render() {
        let { dataSource } = this.state
        return (
            <div style={{ overflowY: "auto", height: "100%" }}>
                <h2 style={{ paddingLeft: "10px", color: "red" }}>用户列表</h2>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={dataSource}
                    scroll={{ x: "100%", y: 400 }}
                />
            </div>
        )
    }
}
export default GoodsList;