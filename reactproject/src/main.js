import React from 'react';
import {render} from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store'

// let MyContext = React.createContext()

render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
    ,
    document.getElementById('app')
)