import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

function NavBar() {
  const history = useHistory();
  const userName = JSON.parse(localStorage.getItem('user'));

  const toProducts = () => {
    history.push('/customer/products');
  };

  const toOrders = () => {
    history.push('/customer/orders');
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <nav>
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

      <h3 data-testid="customer_products__element-navbar-user-full-name">
        {userName.name}
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
