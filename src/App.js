import React from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';
import './assets/App.scss';
import { Switch, Route, useHistory } from 'react-router-dom';
import useAuthentication from './hooks/authentication';
import AuthenticationContainer from './AuthenticationContainer';
import BoardsIndex from './boards/BoardsIndex';
import BoardsNew from './boards/BoardsNew';
import BoardsShow from './boards/BoardsShow';

function App() {
  const history = useHistory();
  const { createOrAuthenticateUser, logoutUser } = useAuthentication(history);

  return (
    <div className="app-container">
      <Navbar logoutUser={logoutUser} />
      <Switch>
        {/* <AuthenticationRoutes
          createOrAuthenticateUser={createOrAuthenticateUser}
        /> */}
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
        <Route exact path="/boards">
          <BoardsIndex />
        </Route>
        <Route exact path="/boards/new">
          <BoardsNew />
        </Route>
        <Route exact path="/boards/:boardName">
          <BoardsShow />
        </Route>
        <Route exact path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
