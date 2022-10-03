import React from 'react';
import CheckoutInput from '../components/CheckoutInput';
import NavBar from '../components/NavBar/NavBar';
import '../css/Checkout.css';

function Checkout() {
  return (
    <div className="checkout">
      <NavBar />
      <CheckoutInput />
    </div>
  );
}

export default Checkout;
