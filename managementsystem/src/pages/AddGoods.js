import React, { Component } from 'react';
import { get } from '../Api'
import { Form, Icon, Input, Button, Checkbox, Upload, Modal,message  } from 'antd';


class Login extends Component {
    state = {
        formlist: [{
            title: 'brand',
            name: "品牌/型号"
        }, {
            title: 'carAddr',
            name: "地址"
        }, {
            title: 'plateNum',
            name: "车牌号"
        }, {
            title: 'dayPrice',
            name: "价格/天"
        }],
        imageUrl:''

    }

    goto = () => {
        let { history } = this.props
        history.push('/home/')
    }
    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // let { username, password, remember } = values;
                // let { data:{code} } = await get('hrr/user/login', {
                //     params: {
                //         username,
                //         password,
                //     }
                // })

                // if(code){
                //     let {history} = this.props
                //     localStorage.setItem("username",username);
                //     history.push('/home/');
                // }else {
                //     alert("用户名或密码不匹配")
                // }

            }

        });
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
    }
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    render() {
        let { formlist, imageUrl} = this.state
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <div style={{ margin: " auto", width: '100%'}}>
                <h3 style={{ margin: "5px 0 0 20px", color: 'red' }}>添加商品</h3>
                <Form onSubmit={this.handleSubmit} className="login-form"
                    style={{
                        width: 600, padding: "10px 10px 10px 30px",
                        borderRadius: "10px"
                    }}>
                    {

                        formlist.map(item => {
                            return <div>
                                <span>{item.name} :</span>
                                <Form.Item>
                                    {getFieldDecorator(item.title, {
                                        rules: [{ required: true, message: `Please input your ${item.title}` }],
                                    })(
                                        <Input
                                            prefix={<Icon type={item.title} style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder={item.title}
                                        />,
                                    )}
                                </Form.Item>
                            </div>

                        })
                    }
                    <Upload
                        name="avatar"
                        multiple="true"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit"
                            style={{}}>
                            确认添加
                        </Button>
                        <Button type="danger"
                            onClick={this.goto}>
                            取消添加
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );


    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
