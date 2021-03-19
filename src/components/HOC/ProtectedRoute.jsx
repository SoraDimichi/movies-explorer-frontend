import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoginLoading } from '../../utils/consts';
import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      () => ((props.loggedIn === isLoginLoading)
        ? <Preloader />
        : (props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />))
    }
  </Route>
);

export default ProtectedRoute;
