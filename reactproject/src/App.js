import React, { Component } from 'react';
import Api from './Api';
import {connect} from 'react-redux';

import {
    HashRouter,
    BrowserRouter,
    Route,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';


//引入路由
import Home from './pages/Home';
import Buffet from './pages/Buffet';
import Carlist from './pages/Carlist';
import Login from './pages/Login';
import Reg from './pages/Reg';


@withRouter

class App extends Component{

    

    render(){

        return(
            <div>
                       


            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/reg" component={Reg} />
                <Route path="/login" component={Login} />
                <Route path="/carlist" component={Carlist} />
                <Redirect from="/" to="/home" exact />
                <Route render={() => <div><h1>404</h1>页面不存在</div>} />
            </Switch>
            </div>
        )
    }
}

export default App;