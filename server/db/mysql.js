const mysql = require('mysql')

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database: 'goods',
    multipleStatements: true
});



function query(sql){
    return new Promise((resolve,reject)=>{
        pool.query(sql,(error,result,filed)=>{
            if(error){
                reject(error)
            }
                resolve(result)
            
        })
    })

}

module.exports = query