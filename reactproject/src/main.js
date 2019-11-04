import React from "react";
import { render } from "react-dom";
import { HashRouter, Route,BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./css/base.css";
// let MyContext = React.createContext()

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
