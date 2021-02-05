import React from 'react';
import { Route } from 'react-router-dom';
import AuthenticationContainer from '../AuthenticationContainer';

const AuthenticationRoutes = () => (
  <>
    <Route exact path="/login">
      <AuthenticationContainer type="login" />
    </Route>
    <Route exact path="/signup">
      <AuthenticationContainer type="signup" />
    </Route>
  </>
);

export default AuthenticationRoutes;
