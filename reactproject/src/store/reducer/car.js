/**
 * 购物车reducer
 */
import {GET_ID} from '../action/car';

let initialState = {
    carlist:[]
}

// Reducer：用于定义修改state方式，必须返回一个新的state
// 复制一份，并覆盖
function reducer(state=initialState,{type,payload}){
    return state
}

export default reducer;