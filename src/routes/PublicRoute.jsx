import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest} render={({ location }) =>
        !isAuthenticated ? (children) :
        (<Redirect to={{ pathname: '/boards' }} />)
      }
    />
  )
}

export default PublicRoute;