import React from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';
import AuthenticationContainer from './AuthenticationContainer';
import './assets/App.scss';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Switch>
        <Route path="/login">
          <AuthenticationContainer type="login" />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
