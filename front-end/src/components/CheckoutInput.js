import React, { useState, useEffect } from 'react';
import Button from './Button';
import CheckoutAddress from './CheckoutAddress';

export default function CheckoutInput() {
  const [userData, setUserData] = useState([]);

  function initialData() {
    const data = localStorage.getItem('user');
    setUserData(JSON.parse(data));
  }

  useEffect(() => {
    initialData();
  }, []);

  function removeProduct(index) {
    userData.cart.splice(index, 1);
    setUserData({ ...userData });
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function totalPrice(list) {
    if (list.length === 0) return '0,00';
    return list.reduce((acc, { price, quantity }) => (
      Number(acc) + quantity * Number(price)).toFixed(2), 0)
      .replace(/\./, ',');
  }

  const arrayOfProducts = () => (
    userData.cart.map(({ quantity, id }) => (
      {
        quantity,
        productId: id,
      }
    ))
  );

  if (userData.length === 0) return '';

  return (
    <div className='main-details'>
      <h1 className="checkout-title">Finalizar Pedido</h1>
      <table className="table-checkout">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.cart.map(({ name, quantity, price }, index) => (
              <tr key={ `cartIens_${index}` } className="table-line tr_table">
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { price.replace(/\./, ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { (quantity * price).toFixed(2).replace(/\./, ',') }
                </td>
                <td>
                  <Button
                    onClick={ () => removeProduct(index) }
                    dataTestid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    className="remove-btn"
                  >
                    Remover
                  </Button>
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
            data-testid="customer_checkout__element-order-total-price"
          >
            { totalPrice(userData.cart) }
          </span>
        </p>
      </div>

      <CheckoutAddress
        totalPrice={ totalPrice(userData.cart) }
        arrayOfProducts={ arrayOfProducts() }
      />
    </div>
  );
}
