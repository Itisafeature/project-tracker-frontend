import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
