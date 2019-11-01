import React, { Component } from "react";
import Api from "./Api";
import { connect } from "react-redux";

import {
  HashRouter,
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";

//引入路由
import Home from "./pages/Home";
import Buffet from "./pages/Buffet";
import Carlist from "./pages/Carlist";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import LongRent from "./pages/LongRent";
import Subscribe from "./pages/Subscribe";
import ShareCart from "./pages/ShareCart";
import FirstOrder from "./pages/Firstorder";

@withRouter
class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/longrent" component={LongRent} />
          <Route path="/reg" component={Reg} />
          <Route path="/login" component={Login} />
          <Route path="/carlist" component={Carlist} />
          <Route path="/firstorder" component={FirstOrder} />>
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/sharecart" component={ShareCart} />
          <Redirect from="/" to="/home" exact />
          <Route
            render={() => (
              <div>
                <h1>404</h1>页面不存在
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
