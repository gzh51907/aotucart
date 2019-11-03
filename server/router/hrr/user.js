const express = require('express')

const router = express.Router()

let {mongo} = require('../../db')

let {find,create,update,remove} = require('../../db/mongo')

let {formatData,token} = require('../../tools')


//token检验登录 -- 后台
router.get('/login',async (req,res)=>{
        let {username,password} = req.query;
        // password = Number(password)
        let result = await find('h_admin_login',{username,password});
        if(result.length>0){
            res.send(formatData({code:1})) 
        }else{
            res.send(formatData({code:0,data:result}))
        }

})

router.post('/reg',async (req,res)=>{
    let {username,password,phonenum} = req.body;
    // let {username,password,email} = req.body
    let data = await find('y_user',{username:phonenum})
    let result
    if(data.length !=0){
        result=[]
        msg="用户名已经存在"
        res.send({code:0,msg:msg,data:result})
    }else{
        result = await create('y_user',[{username:phonenum,password,username2:username,regtime:new Date().toLocaleString()}]);
        msg="插入成功"

        res.send({code:1,msg:msg,data:result})
    }
    
})


//获取所有商品

router.get("/all",async(req,res)=>{
    // let {collection} = req.query
    let result = await find("y_user",{})
    res.send(formatData({data:result}))
})

 
router.get("/carlist",async(req,res)=>{
    // let {collection} = req.query
    let result = await find("z_carlist",{})
    res.send(formatData({data:result}))
})


//删除商品
router.post('/delcar',async(req,res)=>{
    let {id} = req.body
    let result = await remove('z_carlist',{carNo:id})
    if(result.result.n==1){
        res.send({msg:"删除成功",code:1})
    }else{
        res.send({msg:"删除失败",code:0})
    }
})

//删除用户
router.post('/deluser',async(req,res)=>{
    let {username} = req.body
    let result = await remove('y_user',{username:username})
    if(result.result.n==1){
        res.send({msg:"删除成功",code:1})
    }else{
        res.send({msg:"删除失败",code:0})
    }
    
})


//增加商品
router.post("/addcar",async(req,res)=>{
    let {brand,carAddr,plateNum,dayPrice} = req.body

    let result = await create('z_carlist',[{brand,carAddr,plateNum,dayPrice}])

    if(result.code==1){
        res.send({code:1,msg:"插入成功"})
    }else{
        res.send({code:0,msg:"插入失败"})
    }
    
})
 



module.exports = router