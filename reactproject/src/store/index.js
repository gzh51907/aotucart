import {createStore,applyMiddleware} from 'redux';

// 1.引入redux-saga
import createSagaMiddleware from 'redux-saga';

// 2.创建saga中间件
const sagaMiddleware = createSagaMiddleware();

import rootReducer from './reducer';

// 3.将 sagaMiddleware 连接至 Store
let enhancer = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer,enhancer);

// 4.运行 Saga配置
import rootSaga from '../saga'
sagaMiddleware.run(rootSaga);


export default store;