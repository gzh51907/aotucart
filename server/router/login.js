const express = require('express')
const router = express.Router();
const {mysql:query} = require('../db')

//注册接口 ==>在mysql数据库中设置username的值为唯一
router.post('/reg',async(req,res)=>{
    let {username,password} = req.body
    
    let sql = `insert into login (username,password) values ("${username}","${password}")`
    
    let result = await query(sql)
    
    res.send(result)

    
})
//登录接口
router.post('/login',async(req,res)=>{
    let{username,passwword} = req.body

    let sql = `select * from login where username="${username}"`

    let result = await query(sql)
    if(result.username == username&& result.password == password){
        res.send("登录成功")
    }else{
        res.send("登录失败")
    }
    
})

module.exports = router