import React, {
    Component
} from 'react';
import Api from './Api';
import {
    connect
} from 'react-redux';
import './App.css';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";


//引入路由
import Home from './pages/Home';
import Buffet from './pages/Buffet';
import Carlist from './pages/Carlist';
import Login from './pages/Login';
import Reg from './pages/Reg';
import Test from './pages/Test';
import Detail from './pages/Details';


@withRouter
class App extends Component {

    render() {

        return (<div style={{ width: "100%", height: "100%" }}>

            <Switch >

                <Route path="/home" component={Home} />
                {/* buffet 自助租车 */}
                {/* <Route path="/buffet" component={Buffet} /> */}
                <Route path="/citychoose" component={CityChoose} />
                <Route path="/carowner" component={CarOwner} />
                <Route path="/search" component={Search} />
                <Route path="/userCenter" component={UserCenter} />
                <Route path="/login" component={Login} />
                <Route path="/carlist" component={Carlist} />
                <Route path="/buffet" component={Buffet} />
                <Route path="/quick" component={Quick} />
                <Route path="/test" component={Test} />
                <Route path="/detail" component={Detail} />
                <Redirect from="/" to="/home" exact />
                <Route render={() => <div> <h1> 404 </h1>页面不存在</div>} />
            </Switch>

        </div>
        )
    }

}
export default App;
