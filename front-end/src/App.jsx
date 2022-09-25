import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';

// import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Product } />
      <Route exact path="/customer/orders" component={ Orders } />
    </Switch>
  );
}

export default App;
