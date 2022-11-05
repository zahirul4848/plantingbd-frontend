import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminRoute({component: Component, ...rest}) {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <Route {...rest} render={props=> userInfo && userInfo.isAdmin ? <Component {...props}/> : <Redirect to="/signin" />} />
  )
}
