import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

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
        >
          Pedidos
        </Button>
      );
    } if (user.role === 'administrator') {
      return (
        <Button
          dataTestid="customer_products__element-navbar-link-orders"
          onClick={ () => {} }
        >
          Gerenciar usuários
        </Button>
      );
    }
    return (
      <>
        <Button
          dataTestid="customer_products__element-navbar-link-products"
          onClick={ toProducts }
        >
          Produtos
        </Button>

        <Button
          dataTestid="customer_products__element-navbar-link-orders"
          onClick={ toOrders }
        >
          Pedidos
        </Button>
      </>
    );
  };

  return (
    <nav>
      { navBarButtons() }

      <h3 data-testid="customer_products__element-navbar-user-full-name">
        {user.name}
      </h3>
      <Button
        dataTestid="customer_products__element-navbar-link-logout"
        onClick={ logout }
      >
        Sair
      </Button>
    </nav>
  );
}

export default NavBar;
