/**
 * Redux-Saga
    * Generator生成器函数
    * Iterator迭代器
 */

function* HelloSaga(){
    yield 100;
    // console.log(777);
    yield 200;
    // console.log(888);
    return 300
 }

 let res = HelloSaga();// 得到一个Iterator迭代

 export default HelloSaga;