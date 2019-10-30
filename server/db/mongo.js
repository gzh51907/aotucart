const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const {DBurl,DBname} = require('../config.json')
//连接mongodb
// MongoClient.connect('mogo://localhost:27017',(error,client)=>{
//     if(error) throw error
//     let db = client.db('category')
// })
const connect = async()=>{
    // return new Promise((resolve,reject)=>{
    //     MongoClient.connect(DBurl,(error,client)=>{
    //         if(error) throw error
    //         let db = client.db(DBname)
    //         resolve({client,db})
    //     }) 
    // })
    let result
    try{
        let client = await MongoClient.connect(DBurl);  
        let db = client.db(DBname)
        result = {client,db}
    }catch(err){
        result = err
    }
    return result
}

//增加数据
async function create(colName,data){
    let {client,db} = await connect()
    let collection = db.collection(colName)
    let result = await collection.insertMany(data)
    client.close()
    return result
}

//删除数据
let remove = async(colName,query)=>{
    let {client,db} = await connect()
    let collection = db.collection(colName)
    let result = await collection.deleteMany(query)
    client.close()
    return result
}
 

//更新数据
let update = async(colName,query,data)=>{
    let {client,db} = await connect()
    let collection = db.collection(colName)
    let result = await collection.updateMany(query,{$set:data})
    client.close()
    return result
}

//查询数据
async function find(colName,query={},{sort,skip,limit,asc}={}){
    let {db,client} = await connect();

     //  获取集合
     let collection = db.collection(colName);

    //  针对id进行处理
    // '5d5667d8f174c9ca8ea897d8' -> ObjectId("5d5667d8f174c9ca8ea897d8")
    if(query._id){
        query._id = ObjectId(query._id);
    }

    let result = await collection.find(query);

    // 筛选
    if(sort){
        let opt = {}
        opt[sort] = asc?1:-1;
        result = result.sort(opt);
    }

    if(limit){
        result = result.limit(limit);
    }

    if(skip){
        result = result.skip(skip);
    }

     let data = await result.toArray();
     
     client.close();

    // 执行find方法，不会得到data，而是得到promise对象
    // 要得到data，必须then或者await
     return data;
}





module.exports = {
    find,
    create,
    update,
    remove
}