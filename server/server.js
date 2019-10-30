const express = require('express');

const app = express();

app.use(express.static('./'))

let {PORT} = require('./config.json')
let Router = require('./router/index.js')

app.use(Router)

app.listen(PORT,()=>{
    console.log("服务器开启:"+PORT)
})