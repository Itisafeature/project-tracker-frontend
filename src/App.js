import React from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';
import './assets/App.scss';
import { Switch, Route } from 'react-router-dom';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import BoardRoutes from './routes/BoardRoutes';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Switch>
        <>
          <AuthenticationRoutes />
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
