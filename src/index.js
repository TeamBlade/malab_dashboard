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
axios.defaults.baseURL = "http://localhost:3003"

axios.interceptors.request.use(function (config) {
  if (config) {
    const state = getUserState();
    config.headers.authorization = `Bearer ${state.token}`
    // config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjU4YTkxOWQzOGQ3MDBkYTRiZDhiNWQiLCJpYXQiOjE2NDk5Nzg3MzcsImV4cCI6MTk2NDk5Nzg3Mzd9.CiiUfO35ZY46kL6VWr34ooil_gucfritQSzaEs9WSG4`

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
}, err => [])

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
