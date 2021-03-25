import React, { useState, useEffect } from 'react';
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
import ErrorNotification from './shared/ErrorNotification';

function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { createOrAuthenticateUser, logoutUser } = useAuthentication(
    history,
    setIsAuthenticated,
    setIsError,
    setErrorMsg
  );

  useEffect(() => {
    if (isError) {
      const id = setTimeout(() => {
        setIsError(false);
        setErrorMsg('');
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [isError, errorMsg]);

  if (isAuthenticated !== null) {
    return (
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
        {isError && <ErrorNotification msg={errorMsg} />}
        <Switch>
          <PublicRoute isAuthenticated={isAuthenticated} exact path="/login">
            <AuthenticationContainer
              type="login"
              createOrAuthenticateUser={createOrAuthenticateUser}
              setIsError={setIsError}
              setErrorMsg={setErrorMsg}
            />
          </PublicRoute>
          <PublicRoute isAuthenticated={isAuthenticated} exact path="/signup">
            <AuthenticationContainer
              type="signup"
              createOrAuthenticateUser={createOrAuthenticateUser}
              setIsError={setIsError}
              setErrorMsg={setErrorMsg}
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
