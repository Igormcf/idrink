import React from 'react';
import CardProduct from '../components/CardProduct';
import NavBar from '../components/NavBar/NavBar';

function Product() {
  return (
    <div className="products">
      <NavBar />
      <CardProduct />
    </div>
  );
}

export default Product;
