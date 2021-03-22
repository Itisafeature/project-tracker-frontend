import React, { useState } from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';
import './assets/App.scss';
import { Switch, Route, useHistory } from 'react-router-dom';
import useAuthentication from './hooks/authentication';
import AuthenticationContainer from './AuthenticationContainer';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import BoardsIndex from './boards/BoardsIndex';
import BoardsNew from './boards/BoardsNew';
import BoardsShow from './boards/BoardsShow';
import AuthorizationCheckLoading from './shared/AuthorizationCheckLoading';

function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { createOrAuthenticateUser, logoutUser } = useAuthentication(
    history,
    setIsAuthenticated
  );

  if (isAuthenticated !== null) {
    return (
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
        <Switch>
          <PublicRoute isAuthenticated={isAuthenticated} exact path="/login">
            <AuthenticationContainer
              type="login"
              createOrAuthenticateUser={createOrAuthenticateUser}
            />
          </PublicRoute>
          <PublicRoute isAuthenticated={isAuthenticated} exact path="/signup">
            <AuthenticationContainer
              type="signup"
              createOrAuthenticateUser={createOrAuthenticateUser}
            />
          </PublicRoute>

          <Route exact path="/">
            <Welcome />
          </Route>

          <PrivateRoute exact path="/boards" isAuthenticated={isAuthenticated}>
            <BoardsIndex />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/boards/new"
            isAuthenticated={isAuthenticated}
          >
            <BoardsNew />
          </PrivateRoute>
          <PrivateRoute
            path="/boards/:boardName"
            isAuthenticated={isAuthenticated}
          >
            <BoardsShow />
          </PrivateRoute>
        </Switch>
      </div>
    );
  } else {
    return <AuthorizationCheckLoading />;
  }
}

export default App;
