import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import OrderDetailByIdSeller from '../components/OrderDetailByIdSeller';

function OrdersDetailsSeller() {
  const params = useParams();
  return (
    <div>
      <NavBar />
      <OrderDetailByIdSeller orderId={ params.id } />
    </div>
  );
}

export default OrdersDetailsSeller;
