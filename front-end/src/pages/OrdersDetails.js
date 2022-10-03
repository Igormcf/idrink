import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import OrderDetailById from '../components/OrderDetailById';

function OrdersDetails() {
  const params = useParams();
  return (
    <div>
      <NavBar />
      <OrderDetailById orderId={ params.id } />
    </div>
  );
}

export default OrdersDetails;
