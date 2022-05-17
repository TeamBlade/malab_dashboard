import "assets/css/material-dashboard-react.css?v=1.2.0";
import axios from "axios";
import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { getUserState } from "state/user";
import Router from "views/Router";
dotenv.config();
// axios.defaults.baseURL = "http://demos.smt.sa:3020";
axios.defaults.baseURL = "http://localhost:3003";

axios.interceptors.request.use(function (config) {
  if (config) {
    const state = getUserState();
    config.headers.authorization = `Bearer ${state.token}`;
    // config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjU4YTkxOWQzOGQ3MDBkYTRiZDhiNWQiLCJpYXQiOjE2NDk5Nzg3MzcsImV4cCI6MTk2NDk5Nzg3Mzd9.CiiUfO35ZY46kL6VWr34ooil_gucfritQSzaEs9WSG4`

    config.headers["Access-Control-Allow-Origin"] = "*";
  }
  return config;
});

axios.interceptors.response.use(
  function (response) {
    if (response && response.data.status === "success") {
      if (response.data.data || response.data.data == 0) {
        console.log(response.data);
        return response.data.data;
      } else return [];
    } else {
      console.error(response.data);
      return [];
    }
  },
  (err) => {
    console.error(err);
    return [];
  }
);

ReactDOM.render(<Router />, document.getElementById("root"));
