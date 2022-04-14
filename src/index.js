import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.2.0";

import indexRoutes from "routes/index.jsx";
import dotenv from "dotenv"
import axios from "axios";
import {getUserState} from "state/user"

dotenv.config()
axios.defaults.baseURL = "http://demos.smt.sa:3005"

axios.interceptors.request.use(function (config) {
  if (config) {
    const state = getUserState();
    config.headers.authorization = `Bearer ${state.token}`
    config.headers['Access-Control-Allow-Origin'] = '*'
    
  }
  return config;
})

axios.interceptors.response.use(function (response) {
  console.log(response.data)
  if (response && response.data.status === 'success') {
    return response.data.data;
  }
  else
    return [];
})

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
