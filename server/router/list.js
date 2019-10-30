const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData,token} = require('../tools')


//获取所有用户数据
router.get('/all',async(req,res)=>{
    
    let result = await find('list',{})
    res.send(formatData({data:result}))
})

 


//获取数据并查询数据库是否存在数据---->如果用户名已经存在  返回结果 {code:0,msg:"fail,data:查询结果（json字符串）},"
router.get('/check',async(req,res)=>{
    let {username} = req.query
    let result = await find('list',{username:username})
    
    if(result.length!=0){
        res.send(formatData({code:0,data:result}))
    }
    
    res.send(formatData({data:result}))
})

//获取数据并查询数据库是否存在数据---->如果用户名已经存在  返回结果 {code:0,msg:"fail,data:查询结果（json字符串）},"-->后台管理员
router.get('/managecheck',async(req,res)=>{
    let {username} = req.query
    let result = await find('admin_login',{username:username})
    
    if(result.length!=0){
        res.send(formatData({code:0,data:result}))
    }
    console.log(username)
    res.send(formatData({data:result}))
})


//插入用户信息 
router.post('/reg',async(req,res)=>{
    
    let {username,password,email} = req.body
    let data = await find('list',{username:username})
    
    // res.send(data)
    let result
    let msg
    if(data.length !=0){
        result=[]
        msg="用户名已经存在"
    }else{
    let {username,password,email} = req.body
        result = await create("list",[{username:username,password:password,username2:"绿军人浩克",email:email}])
        msg="插入成功"
    }
    res.send({msg:msg,data:result})
    
})

//修改用户信息
router.post('/change',async(req,res)=>{
    // let data = await find('goodslist_all',{})
    let {username,email,password,username2,phone,price} = req.body
    let result = update('user',{username:username},{price:price,email:email,password:password,username2:username2,phone:phone})
    // let result = await update('goodslist_all',{},{kucun:randomNum})
    res.send(formatData({data:result}))
})
// ,name:name,password:password,username2:username2,phone:phone
//后台插入用户信息
router.post('/backreg',async(req,res)=>{
    
    let {username,password,phone,email,username2} = req.body
    let data = await find('user',{username:username})
    
    // res.send(data)
    let result
    let msg
    if(data.length !=0){
        result=[]
        msg="用户名已经存在"
    }else{
        result = await create("user",[{username:username,password:password,phone:phone,email:email,username2:username2}])
        msg="插入成功"
    }
    res.send({msg:msg,data:result})
    
})

//后台管理员插入用户信息
router.post('/managereg',async(req,res)=>{
    
    let {username,password} = req.body
    let data = await find('admin_login',{username:username})
    
    // res.send(data)
    let result
    let msg
    if(data.length !=0){
        result=[]
        msg="用户名已经存在"
    }else{
        result = await create("admin_login",[{username:username,password:password}])
        msg="插入成功"
    }
    res.send({msg:msg,data:result})
    
})

//登录接口
// router.post('/login',async(req,res)=>{

//     let {username,password} = req.body
//     let result = await find('user',{username:username})
//     result = result[0]
//     if(result.length == 0){
//         res.send('该用户名不存在')
//     }else{
//         if(result.password === password){
//             res.send(formatData({code:1,data:result}))
//         }else if(result.password != password){
//             res.send(formatData({code:0}))
//         }
//     }
//     res.send(result)


// })

//token检验登录 -- 后台
router.get('/login',async (req,res)=>{
    let {username,password,mdl} = req.query;

    let result = await mongo.find('admin_login',{username,password});

    

    if(result.length>0){
        // 如用户需要免登陆操作，则生成一个token并返回给前端
        let Authorization
        if(mdl){
            Authorization = token.create(username)
        }
        res.send(formatData({data:Authorization}));
    }else{
        res.send(formatData({code:0}))
    }
})

//token检验登录
router.get('/loginin',async (req,res)=>{
    let {username,password,mdl} = req.query;

    let result = await mongo.find('user',{username,password});

    

    if(result.length>0){
        // 如用户需要免登陆操作，则生成一个token并返回给前端
        let Authorization
        if(mdl){
            Authorization = token.create(username)
        }
        res.send(formatData({data:Authorization}));
    }else{
        res.send(formatData({code:0}))
    }
})


//用户修改
router.post('/changeqty',async(req,res)=>{
    let {user,cart} = req.body

    let result = await update('user',{username:user},{cart:cart})
    res.send(result)
})


//后台删除用户
router.post('/delback',async(req,res)=>{
    let {product} = req.body
    let result = await remove('list',{product:product})
    res.send(formatData({data:result}))
})


//增加用户属性
router.post('/put',async(req,res)=>{
    
    let result = await update('user',{username:"zhouxiaohui"},{username2:"羊城通丢了"})
    res.send(formatData({data:result}))
})

//根据id获取单个商品
router.get('/:id',async(req,res)=>{
    let {id} = req.params
    id = Number(id)
    let result = await find("goodslist_all",{id:id})
    res.send(formatData({data:result}))
    // res.send(id)
})

router.post('/addlist',async(req,res)=>{
    let {user,product,qty,totalprice} = req.body 

    let result = await create('list',[{username:user,product:product,qty:qty,totalprice:totalprice,date:"2019-10-22"}])
    res.send(formatData({data:result}))
})




module.exports = router