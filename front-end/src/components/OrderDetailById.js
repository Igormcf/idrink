import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import '../css/DetailsSale.css';

export default function OrderDetailById({ orderId }) {
  const status200 = 200;
  const history = useHistory();
  const [orderData, setOrderData] = useState({});
  const [seller, setSeller] = useState({});
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
      const url1 = `http://localhost:3001/checkout/${orderId}`;
      const url2 = 'http://localhost:3001/user';
      const data = JSON.parse(localStorage.getItem('user'));
      const fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: data.token,
        },
      };
      const responseOrder = await fetch(url1, fetchOptions);
      const responseUsers = await fetch(url2, fetchOptions);
      if (responseOrder.status !== status200) {
        localStorage.removeItem('user');
        history.push('/login');
      } else {
        const order = await responseOrder.json();
        const users = await responseUsers.json();
        const findSeller = users.find(({ id }) => id === order.sellerId);
        order.products = order.products.map((product) => ({
          ...product,
          quantity: product.SaleProduct.quantity,
        }));
        setOrderData(order);
        setSeller(findSeller);
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

  const statusColor = () => {
    if (orderData.status === 'Pendente') return 'p-status pendente';
    if (orderData.status === 'Preparando') return 'p-status preparando';
    if (orderData.status === 'Em Trânsito') return 'p-status transito';
    if (orderData.status === 'Entregue') return 'p-status entregue';
  };

  return (
    <main className="main-details">
      <span className="infos-details">
        <p>
          Pedido
          {' '}
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {orderData.id}
          </span>
        </p>
        <p>
          P. Vend:
          {' '}
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {seller.name}
          </span>
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
          className="p-status date-details"
        >
          {formatDate(new Date(orderData.saleDate))}
        </p>
        <p
          data-testid="customer_order_details
          __element-order-details-label-delivery-status"
          className={ statusColor() }
        >
          {orderData.status}
        </p>
        <Button
          dataTestid="customer_order_details__button-delivery-check"
          onClick={ () => { fetchStatus('Entregue'); } }
          disabled={ orderData.status !== 'Em Trânsito' }
          className="btn-details"
        >
          MARCAR COMO ENTREGUE
        </Button>
      </span>
      <table className="table-details">
        <thead>
          <tr>
            <th>Item</th>
            <th className="description">Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            orderData.products.map(({ name, quantity, price }, index) => (
              <tr key={ `cartIens_${index}` } className="tr-table">
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {quantity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {price.replace(/\./, ',')}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(quantity * price).toFixed(2).replace(/\./, ',')}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="p-total">
        <p>
          Total: R$
          <span
            data-testid="customer_order_details__element-order-total-price"
          >
            {orderData.totalPrice.replace(/\./, ',')}
          </span>
        </p>
      </div>
    </main>
  );
}

OrderDetailById.propTypes = {
  orderId: PropTypes.string.isRequired,
};
