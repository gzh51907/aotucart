import React from 'react';
import {render} from 'react-dom';
import {HashRouter,Route,BrowserRouter} from 'react-router-dom';
import App from './App.js';


// let MyContext = React.createContext()

render(
    <BrowserRouter>
        <App/>
        {/* <Route component={App}/> */}
    </BrowserRouter>,
    document.querySelector('#app')
)