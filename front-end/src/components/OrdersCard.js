import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Button from './Button';

function OrdersCard() {
  const status200 = 200;
  const history = useHistory();
  const [ordersList, setOrdersList] = useState([]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  useEffect(() => {
    const initialOrders = async () => {
      const url = 'http://localhost:3001/checkout';
      const data = JSON.parse(localStorage.getItem('user'));
      const fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: data.token,
        },
      };
      const response = await fetch(url, fetchOptions);
      if (response.status !== status200) {
        localStorage.removeItem('user');
        history.push('/login');
      } else {
        const orders = await response.json();
        setOrdersList(orders);
      }
    };
    initialOrders();
  }, [history]);

  return (
    <div>
      {
        ordersList.map(
          ({ id, status, saleDate, totalPrice }, index) => (
            <div key={ `order_${index}` }>
              <Link to={ `/customer/orders/${id}` }>
                <p>
                  Pedido
                  {' '}
                  <span
                    data-testid={ `customer_orders__element-order-id-${id}` }
                  >
                    { id }
                  </span>
                </p>
                <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
                  { status }
                </p>
                <p data-testid={ `customer_orders__element-order-date-${id}` }>
                  { formatDate(new Date(saleDate)) }
                </p>
                <p>
                  { 'R$ ' }
                  <span
                    data-testid={ `customer_orders__element-card-price-${id}` }
                  >
                    { totalPrice.replace(/\./, ',') }
                  </span>
                </p>
              </Link>
            </div>
          ),
        )
      }
    </div>
  );
}

export default OrdersCard;
