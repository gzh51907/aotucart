import React,{Component} from 'react';
import { Menu, Icon,Button } from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom';
const { SubMenu } = Menu;
import './Home.scss';
import GoodsList from './GoodsList'
import AddGoods from './AddGoods'
import GoodsClassify from './GoodsClassify'
import AddUser from './AddUser'
import OrderList from './OrderList'
import UserList from './UserList'

class Home extends Component{
    state = {
       theme:{theme: 'dark',
        current: '1'
    },
    menu1:[{
        name:"商品管理",
        icon:"appstore",
        menu2:[{
            name:"goodslist",
            title:"商品列表",
            path:"/goodslist"
        },{
            name:"classify",
            title:"商品分类",
            path:"/goodsclassify"
        },{
            name:"addgoods",
            title:"添加商品",
            path:"/addgoods"
        }] 
    },{
        name:"用户管理",
        icon:"user",
        menu2:[{
            name:"userlist",
            title:"用户列表",
            path:"/userlist"
        },{
            name:"adduser",
            title:"添加用户",
            path:"/adduser"
        }]  
    },{
        name:"订单管理",
        icon:"bars",
        menu2:[{
            name:"orderlist",
            title:"订单列表",
            path:"/orderlist"
        }] 
    }]  
      };
      goto = ({key})=>{
        this.props.history.push(key);
      }
    logout = ()=>{
        this.props.history.push("/");
        localStorage.clear("username");
    }
    //   changeTheme = value => {
    //     this.setState({
    //       theme: value ? 'dark' : 'light',
    //     });
    //   };
    
    //   handleClick = e => {
    //     console.log('click ', e);
    //     this.setState({
    //       current: e.key,
    //     });
    //   };

    render(){
        let {theme} = this.state;
        let {menu1} = this.state;
        let {path,url} = this.props.match;
        let user = localStorage.getItem("username");
        console.log(user);
        return (
            <div className="home">
              <div className="header">
                  <h2>凹凸租车后台管理系统</h2>
                  <p>管理员：{user} <Button icon="logout" size="small" type="primary"
                  onClick={this.logout}></Button></p>
              </div>
              <div className="sider">
        <Menu
          theme={theme.theme}
          style={{ width: "100%"}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
        {  
           menu1.map(item=>{
            return <SubMenu
            key={item.name}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
              {
                  item.menu2.map(item=>{
                      return <Menu.Item key={url + item.path}
                      onClick = {this.goto}
                      >{item.title}</Menu.Item>
                  })
               }            
          </SubMenu>
           }) 
           }
        </Menu>
        
              </div>
              <div className="right">
                  <Switch>
                  <Route path={path + "/goodslist"} component={GoodsList} />
                  <Route path={path + "/addgoods"} component={AddGoods} />
                  <Route path={path + "/goodsclassify"} component={GoodsClassify} />
                  <Route path={path + "/adduser"} component={AddUser} />
                  <Route path={path + "/orderlist"} component={OrderList} />
                  <Route path={path + "/userlist"} component={UserList} />
                  <Redirect from="/home" to={path + "/goodslist"} exact/>
                  </Switch>
              </div>
            </div>
        )
    }
}

export default Home;