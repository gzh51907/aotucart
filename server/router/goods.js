const express = require('express')

const router = express.Router()

let {mongo} = require('../db')

let {find,create,update,remove} = require('../db/mongo')

let {formatData} = require('../tools')
//爬取并修写入改图片路径所需模块
const fs = require('fs');
const path = require('path');
const request = require('request');
 

// 插入"库存"属性(随机数插入)
router.post('/update',async(req,res)=>{
    let data = await find('goodslist_all',{})
    data.forEach((item,i)=>{
        var randomNum = (Math.random()*1000).toFixed(0)
        item.kucun = randomNum
        update('goodslist_all',{_id:item._id},{kucun:item.kucun })
    })
     
    // let result = await update('goodslist_all',{},{kucun:randomNum})
    res.send(formatData({data:data}))
})

// router.post('/update',async(req,res)=>{
//     let data = await find('user',{})
//     data.forEach((item,i)=>{
        
//         // item.cart = []
//         update('user',{name:new RegExp(keyword,'g')},{cart:[]})
//     })
     
//     // let result = await update('goodslist_all',{},{kucun:randomNum})
//     res.send(formatData({data:data}))
// })



//修改商品信息
router.post('/change',async(req,res)=>{
    // let data = await find('goodslist_all',{})
    let {psname,price,info,currentprice,majorimg,kucun} = req.body
    let result = update('goodslist_all',{name:new RegExp(psname,'g')},{price:price,kucun:kucun,current_price:currentprice,goods_brief:info,default_photo:majorimg})
    // let result = update('test',{name:new RegExp(psname,'g')},{price:price},{kucun:kucun},{current_price:currentprice},{goods_brief:info},{default_photo:majorimg},{name:psname})
    
    res.send(formatData({data:result})) 
})





//获取所有商品

router.get("/all",async(req,res)=>{
    let {collection} = req.query
    let result = await find(collection,{})
    res.send(formatData({data:result}))
})

//分页获取商品
router.get('/page',async(req,res)=>{
    let {collection,limit} = req.query
    limit = Number(limit)
    let result = await find(collection,{},{limit:limit})
    res.send(formatData({data:result}))
})

//分页获取商品
router.get('/pages',async(req,res)=>{
    let {collection,limit,skip} = req.query
    limit = Number(limit)
    skip = Number(skip)
    let result = await find(collection,{},{limit:limit,skip:skip})
    res.send(formatData({data:result}))
})


//增加商品
router.post("/addproduct",async(req,res)=>{
    let {name,price,currentprice,majorimg,kucun,info,sellcount,id,brand,category} = req.body

    let result = await create('goodslist_all',[{name:name,price:price,sales_count:sellcount,currentprice:currentprice,default_photo:majorimg,kucun:kucun,info:info,id:id,brand:brand,category:category}])


    res.send(formatData({data:result}))
})
 


//根据关键字keyword获取商品
router.get('/keyword',async(req,res)=>{
    let {keyword} = req.query

    let result = await find('goodslist_all',{name:new RegExp(keyword,'g')})/*正则--名字包含keyword */
    res.send(formatData({data:result}))
})

//根据价格范围price获取商品 -- 一般用于价格筛选
router.get('/price',async(req,res)=>{
    let {min,max} = req.query
 
    let result = await find('goods',{price:{$gt:min,$lt:max}})
    res.send(formatData({data:result}))
})


/* 升序为1 降序为0  */
//根据条件对商品进行排序(升序) 
router.get('/:id/up',async(req,res)=>{
    let {id} = req.params
    id = Number(id)
    let {sort} = req.query
    let result = await find("goodslist_all",{category:id},{sort:sort,asc:1})
    res.send(result)
})

//根据条件对商品进行排序(降序)
router.get('/:id/down',async(req,res)=>{
    let {id} = req.params
    id = Number(id)
    let {sort} = req.query
    let result = await find("goodslist_all",{category:id},{sort:sort,asc:0})
    res.send(result)
})







//获取商品并且把图片经过处理
router.get("/all/img",async(req,res)=>{
    let result = await find('test',{})
    result.forEach((item,i)=>{
    
    //提取图片文件名
    let filename =  path.basename(item.default_photo.thumb);

    // 将图片写入本地
    request(item.default_photo.thumb).pipe(fs.createWriteStream('../webapp/src/assets/img/'+ filename));

    //改变数据区图片路径
    item.default_photo.thumb = 'img/'+filename;
    

    })
    res.send(result)
})

//根据id获取商品
router.get('/one/:id',async(req,res)=>{
    let {id} = req.params
    id = Number(id)
    let result = await find("goodslist_all",{id:id})
    res.send(formatData({data:result}))
    // res.send(id)
})

//根据id获取商品
router.get('/:id',async(req,res)=>{
    let {id} = req.params
    id = Number(id)
    let result = await find("goodslist_all",{category:id})
    res.send(formatData({data:result}))
    // res.send(id)
})



//根据keyword获取商品
// router.get('/query',(req,res)=>{


//     res.send(123)
// })


// 插入"库存"属性(随机数插入)
router.post('/gai',async(req,res)=>{

    let data1 = await find("goods",{})
    let data2 = await find("goodslist_all",{})

    // for(var i=0;i<100;i++){
    //     data2[i].img = data1[i].photo
    // }

    data2.forEach((item,i)=>{
        data2[i].img = data1[i].photo
        update('goodslist_all',{_id:item._id},{img:data1[i].photo })
    })

    
    // let data = await find('goodslist_all',{})
    // data.forEach((item,i)=>{
    //     var randomNum = (Math.random()*1000).toFixed(0)
    //     item.kucun = randomNum
    //     update('goodslist_all',{_id:item._id},{kucun:item.kucun })
    // })
     
    // let result = await update('goodslist_all',{},{kucun:randomNum})
    res.send(data2)
})



module.exports = router