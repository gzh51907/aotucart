import React, { Component } from 'react';
import Api from './Api';
// 引入react-router-dom
import { Switch, Route, Redirect } from 'react-router-dom';
// 引入组件
import Home from './pages/Home';

class App extends Component {

    render() {
        return <div>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Redirect from="/" to="/home" exact />
                <Route render={() => <div><h1>404</h1>页面不存在</div>} />
            </Switch>
        </div>
    }

}

export default App;