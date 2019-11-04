import React, { Component } from 'react';
import { Result, Button  } from 'antd';

class Jieguo extends Component {

    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/home')
        }, 5000);
    }


    render() {
        return (
            <div className="z_result">
                <Result
                    status="success"
                    title="提交成功"
                    subTitle="三天内会有工作人员联系您，请保持电话通畅"
                    extra={[
                    <Button type="primary" key="console">
                        继续
                    </Button>,
                    <Button key="buy">返回</Button>,
                    ]}
                />

            </div>
        )
    }
}

export default Jieguo;