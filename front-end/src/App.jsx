import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Product from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import OrdersDetails from './pages/OrdersDetails';
import OrdersSeller from './pages/OrdersSeller';
import OrdersDetailsSeller from './pages/OrdersDetailsSeller';

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
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
      <Route exact path="/seller/orders" component={ OrdersSeller } />
      <Route exact path="/seller/orders/:id" component={ OrdersDetailsSeller } />

    </Switch>
  );
}

export default App;
