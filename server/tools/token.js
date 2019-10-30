const jwt = require('jsonwebtoken')
let {secret} = require('../config.json')

//创建token
let create = (data,expiresIn = 250)=>{
    let token = jwt.sign({data},secret,{expiresIn})
    return token
}

//校验token
let verify = (token)=>{
    let res
    try{
        let result = jwt.verify(token,secret)
        console.log('token校验：',result)
        res = true
    }catch{
        res = false
    }
    return res

}



module.exports = {
    create, 
    verify
}