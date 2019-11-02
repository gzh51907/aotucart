import React, { Component } from 'react';
import Cate from './buffet/cate'

class Test extends Component {
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Cate history={this.props.history}></Cate>
            </div>
        )
    }
}

export default Test;