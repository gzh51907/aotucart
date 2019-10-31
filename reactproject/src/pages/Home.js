import React, { Component } from 'react';
import {get} from '../Api'
import axios from 'axios'
class Home extends Component {

    async componentDidMount(){
        // let {data} = await get("goods/all?collection=y_banner")
        // let {data} = await get("goods/all",{
        //     params:{collection:'y_banner'}
        // })
        // console.log(data)
    }


    render() {
        return (
            <div>
                Home/首页
            </div>
        )
    }
}

export default Home;