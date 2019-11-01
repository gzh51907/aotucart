import React,{Component} from 'react';
import axios from 'axios';

// 高阶组件必须返回一个组件
export function withUser(InnerComponent){
    let username = localStorage.getItem('username');
    try{
        username = JSON.parse(username);
        this.setState({username})
    }catch(err){

    }
    return function(){
        return <InnerComponent username={username}/>
    }
}

export function withTheme(InnerComponent){
    return class extends Component{
        constructor(){
            super()
            this.state = {
                theme:''
            }
        }
        async componentDidMount(){
            let {data} = await axios.get('/theme');
            this.setState({
                theme:data.theme
            })
        }
        render(){
            let {theme} = this.state;
            return <InnerComponent theme={theme}/>
        }
    }
}