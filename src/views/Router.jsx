import React, {useState, useEffect} from 'react';
import {getUserState} from '../state/user';
import Login from 'views/login';
import { createBrowserHistory } from "history";
import Dashboard from '../layouts/Dashboard/Dashboard'
import { BrowserRouter,Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute'
export default function Router(props) {
    let {loggedIn} = props;
    const hist = createBrowserHistory();

    useEffect(() => {
        loggedIn = getUserState().loggedIn
    },[])
    return (
        <BrowserRouter history={hist}>
    <Switch>
      {/* {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} exact component={prop.component} key={key} />;
      })} */}
     <Route path='/login' exact component={Login} />
     <ProtectedRoute  path='/' component={Dashboard} />
     {/* {loggedIn ? <Route path='/' exact component={Dashboard} /> : <Redirect to='/login'/>} */}
     </Switch>
  </BrowserRouter>
    )
}