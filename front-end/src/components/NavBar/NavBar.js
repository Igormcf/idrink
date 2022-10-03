import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import logo from '../../images/logo.png';
import './NavBar.css';

function NavBar() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  const toProducts = () => {
    history.push('/customer/products');
  };

  const toOrders = () => {
    history.push('/customer/orders');
  };

  const toOrdersSeller = () => {
    history.push('/seller/orders');
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const navBarButtons = () => {
    if (user.role === 'seller') {
      return (
        <Button
          dataTestid="customer_products__element-navbar-link-orders"
          onClick={ toOrdersSeller }
          className="button-navbar btn"
        >
          Pedidos
        </Button>
      );
    } if (user.role === 'administrator') {
      return (
        <Button
          dataTestid="customer_products__element-navbar-link-orders"
          onClick={ () => {} }
          className="button-navbar btn"
        >
          Gerenciar usuários
        </Button>
      );
    }
    return (
      <div className="nav-buttons">
        <Button
          dataTestid="customer_products__element-navbar-link-products"
          onClick={ toProducts }
          className="button-navbar btn"
        >
          Produtos
        </Button>

        <Button
          dataTestid="customer_products__element-navbar-link-orders"
          onClick={ toOrders }
          className="button-navbar btn"
        >
          Pedidos
        </Button>
      </div>
    );
  };

  return (
    <header className="header">
      <nav className="nav-bar">
        <img src={ logo } alt="logo" />

        { navBarButtons() }

        <div className="user-navbar">
          <h3 data-testid="customer_products__element-navbar-user-full-name">
            {user.name}
          </h3>
          <Button
            dataTestid="customer_products__element-navbar-link-logout"
            onClick={ logout }
            className="btn red_button"
          >
            Sair
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
