const express = require('express')

const router = express.Router()

let {mongo} = require('../../db')

let {find,create,update,remove} = require('../../db/mongo')

let {formatData} = require('../../tools')
//爬取并修写入改图片路径所需模块
const fs = require('fs');
const path = require('path');
const request = require('request');



router.post("/addsubscribe", async (req, res) => {
      let { car,city, phone, name, purpose } = req.body;
    
      let result = await create("q_subscribe", [{ car, city, phone, name, purpose }]);
    
      res.send(formatData({ data: result }));
    });




module.exports = router