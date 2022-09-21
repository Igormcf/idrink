import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

// import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default App;
