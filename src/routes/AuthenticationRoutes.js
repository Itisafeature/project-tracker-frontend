import React from 'react';
import { Route } from 'react-router-dom';
import AuthenticationContainer from '../AuthenticationContainer';

const AuthenticationRoutes = ({ createOrAuthenticateUser }) => (
  <>
    <Route exact path="/login">
      <AuthenticationContainer
        type="login"
        createOrAuthenticateUser={createOrAuthenticateUser}
      />
    </Route>
    <Route exact path="/signup">
      <AuthenticationContainer
        type="signup"
        createOrAuthenticateUser={createOrAuthenticateUser}
      />
    </Route>
  </>
);

export default AuthenticationRoutes;
