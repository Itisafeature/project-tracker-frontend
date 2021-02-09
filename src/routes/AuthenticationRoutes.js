import React from 'react';
import { Route } from 'react-router-dom';
import AuthenticationContainer from '../AuthenticationContainer';

const AuthenticationRoutes = ({ loginUser, signupUser }) => (
  <>
    <Route exact path="/login">
      <AuthenticationContainer type="login" loginUser={loginUser} />
    </Route>
    <Route exact path="/signup">
      <AuthenticationContainer type="signup" signupUser={signupUser} />
    </Route>
  </>
);

export default AuthenticationRoutes;
