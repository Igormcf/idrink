import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

function OrderDetailByIdSeller({ orderId }) {
  const status200 = 200;
  const history = useHistory();
  const [orderData, setOrderData] = useState({});
  const [newStatus, setNewStatus] = useState('Pendente');

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
    const initialOrder = async () => {
      const url = `http://localhost:3001/orders/seller/${orderId}`;
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
        const order = await response.json();
        order.products = order.products.map((product) => ({
          ...product,
          quantity: product.SaleProduct.quantity,
        }));
        setOrderData(order);
      }
    };
    initialOrder();
  }, [history, orderId, newStatus]);

  if (!orderData.id) return '';

  const fetchStatus = async (status) => {
    const url = `http://localhost:3001/orders/${orderId}`;
    const data = JSON.parse(localStorage.getItem('user'));
    const fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: data.token,
      },
      body: JSON.stringify({
        newStatus: status,
      }),
    };
    await fetch(url, fetchOptions);
    setNewStatus(status);
  };

  return (
    <>
      <p>
        Pedido
        {' '}
        <span
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { orderData.id }
        </span>
      </p>
      <p data-testid="seller_order_details__element-order-details-label-order-date">
        { formatDate(new Date(orderData.saleDate)) }
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { orderData.status }
      </p>
      <Button
        dataTestid="seller_order_details__button-preparing-check"
        onClick={ () => { fetchStatus('Preparando'); } }
        disabled={ orderData.status !== 'Pendente' }
      >
        Preparar pedido
      </Button>
      <Button
        dataTestid="seller_order_details__button-dispatch-check"
        onClick={ () => { fetchStatus('Em Trânsito'); } }
        disabled={ orderData.status !== 'Preparando' }
      >
        Saiu para Entrega
      </Button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            orderData.products.map(({ name, quantity, price }, index) => (
              <tr key={ `cartIens_${index}` }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { name }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { price.replace(/\./, ',') }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  { (quantity * price).toFixed(2).replace(/\./, ',') }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p>
        Total: R$
        <span
          data-testid="seller_order_details__element-order-total-price"
        >
          { orderData.totalPrice.replace(/\./, ',') }
        </span>
      </p>
    </>
  );
}

OrderDetailByIdSeller.propTypes = {
  orderId: PropTypes.string.isRequired,
};

export default OrderDetailByIdSeller;
