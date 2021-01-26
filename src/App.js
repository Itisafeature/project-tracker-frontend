import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Navbar from './Navbar';
import './assets/App.scss';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Navbar />
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
