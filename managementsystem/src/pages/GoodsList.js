import React, { Component } from 'react';
import { Table, Button, Pagination, Icon, Popconfirm } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { get, post } from "../Api"



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
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Gid',
                dataIndex: 'Gid',
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
                render: (text, record) =>
                 
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
                    
                    
                    
            }
        ];
    }
    state = {
        data: [],
    }

    async componentDidMount() {
        //发送请求获取所有用户信息
        let { data: { data } } = await get('hrr/user/carlist');
        console.log(data);
        let data1 = [];
        data.map(item => {
            data1.push({
                key: item._id,
                Gid: item._id,
                brand: item.brand,
                plateNum: item.plateNum,
                carAddr: item.carAddr,
                carNo: item.carNo,
                dayPrice: item.dayPrice
            })
        })
        this.setState({
            dataSource: data1
        })

    }
    handleDelete = async (key) => {
        const dataSource = [...this.state.dataSource];
        let { carNo } = dataSource.filter(item => item.key == key)[0]
        console.log(carNo);
        let { data } = await post('hrr/user/delcar', { id: carNo })
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        console.log(data);
        let { msg, code } = data;
        if (code) {
            alert(msg)
        } else {
            alert(msg)
        }
    };

    render() {
        let { dataSource } = this.state
        return (
            <div style={{ overflowY: "auto", height: "100%" }}>
                <h2 style={{ paddingLeft: "10px", color: "red" }}>商品列表</h2>
                <Table rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={dataSource}
                    scroll={{ x: "100%", y: 400 }}
                />

            </div>
        )
    }
}
export default GoodsList;