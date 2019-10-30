const express = require('express')

const router = express.Router();

const {formatData,token} = require('../tools')

let goodsRouter = require('./goods')
let userRouter = require('./user')
let listRouter = require('./list')
let cartRouter = require('./cart')
// let loginRouter = require('./login')

//允许跨域请求
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

        // 跨域请求CORS中的预请求
        if(req.method=="OPTIONS") {
            res.sendStatus(200);/*让options请求快速返回*/
        } else{
            next();
        }

})

router.use(express.urlencoded({extended:true}),express.json());//推导：内部自动调用next

router.use('/goods',goodsRouter)
router.use('/user',userRouter)
router.use('/list',listRouter)
router.use('/cart',cartRouter)
// router.use('/login',loginRouter)

//校验token
router.get('/verify',(req,res)=>{
    let Authorization = req.get('Authorization');

    // 校验token有效性
    let result = token.verify(Authorization);

    res.send(formatData({code:result?1:0}))
});

module.exports = router