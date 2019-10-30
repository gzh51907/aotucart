const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData} = require('../tools')
//爬取并修写入改图片路径所需模块
const fs = require('fs');
const path = require('path');
const request = require('request');
 






//获取所有商品

router.get("/all",async(req,res)=>{
    let{collection} = req.query
    let result = await find(collection,{})
    res.send(formatData({data:result}))
    // res.send("333")
})





module.exports = router