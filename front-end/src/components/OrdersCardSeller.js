import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/Orders.css';

function OrdersCardSeller() {
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
      const url = 'http://localhost:3001/orders/seller';
      const data = JSON.parse(localStorage.getItem('user'));
      const fetchOptions = {
        method: 'GET',
        mode: 'cors',
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

  const statusColor = (status) => {
    if (status === 'Pendente') return 'status-card pendente';
    if (status === 'Preparando') return 'status-card preparando';
    if (status === 'Em Trânsito') return 'status-card transito';
    if (status === 'Entregue') return 'status-card entregue';
  };

  return (
    <main className="main-details">
      {
        ordersList.map(
          ({ id, status, saleDate, totalPrice }, index) => (
            <div key={ `order_${index}` } className="cardSale">
              <Link to={ `/seller/orders/${id}` } style={ { textDecoration: 'none' } }>
                <div className="pedido-card">
                  <p>
                    Pedido
                    {' '}
                    <span
                      data-testid={ `seller_orders__element-order-id-${id}` }
                    >
                      {id}
                    </span>
                  </p>
                </div>
                <div className={ statusColor(status) }>
                  <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
                    {status}
                  </p>
                </div>
                <section className="section-card">
                  <p data-testid={ `seller_orders__element-order-date-${id}` }>
                    {formatDate(new Date(saleDate))}
                  </p>
                  <p>
                    {'R$ '}
                    <span
                      data-testid={ `seller_orders__element-card-price-${id}` }
                    >
                      {totalPrice.replace(/\./, ',')}
                    </span>
                  </p>
                </section>
              </Link>
            </div>
          ),
        )
      }
    </main>
  );
}

export default OrdersCardSeller;
