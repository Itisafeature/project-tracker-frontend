import React from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';
import './assets/App.scss';
import { Switch, Route, useHistory } from 'react-router-dom';
import useAuthentication from './hooks/authentication';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import BoardRoutes from './routes/BoardRoutes';

function App() {
  const history = useHistory();
  const { createOrAuthenticateUser, logoutUser } = useAuthentication(history);

  return (
    <div className="app-container">
      <Navbar logoutUser={logoutUser} />
      <Switch>
        <>
          <AuthenticationRoutes
            createOrAuthenticateUser={createOrAuthenticateUser}
          />
          <BoardRoutes />
          <Route exact path="/">
            <Welcome />
          </Route>
        </>
      </Switch>
    </div>
  );
}

export default App;
