import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  console.log(auth);
  const { user } = auth;
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <div>
            {console.log('found user', user)}
            <Component {...props} />
          </div>
        ) : (
          <div>
            {console.log('No user', user)}
            <Redirect to={{ pathname: '/', state: { referer: location.pathname } }} />
          </div>
        )
      }
    />
  );
};
