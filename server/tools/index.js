let formatData = ({code=1,msg="success",data=[]}={})=>{
    if(code == 0){
        msg = "fail"
    }
    return{
        code,
        msg,
        data
    }
}

const token = require("./token")

module.exports = {
    formatData,
    token
}