import React, { Component } from 'react';


import {
    HashRouter,
    BrowserRouter,
    Route,
    Redirect,
    Switch,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Home from './pages/Home';
import Login from './pages/Login'
// import 'antd/dist/antd.css';

import { connect } from 'react-redux';

@withRouter

class App extends Component {

    render(){
        return (
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Redirect from="/" to="/Login" exact/>
            </Switch>
        )
    }

}


 export default App;
