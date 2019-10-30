/**
 * redux模块化
 * 合并多个reducer：影响到State的获取
 */

import {combineReducers} from 'redux';

import carReducer from './car';


let rootReducer = combineReducers({
   car:carReducer,
   
});

export default rootReducer;