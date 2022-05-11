import ProtectedRoute from 'components/ProtectedRoute';
import { createBrowserHistory } from "history";
import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from 'views/login';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { getUserState } from '../state/user';
import Home from './Home';

export default function Router(props) {
  let { loggedIn } = props;
  const hist = createBrowserHistory();

  useEffect(() => {
    loggedIn = getUserState().loggedIn
  }, [])
  return (
    <BrowserRouter history={hist}>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/home' component={Home} />
        <ProtectedRoute path='/' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}