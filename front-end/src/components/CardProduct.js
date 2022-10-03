import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

function Products() {
  const status200 = 200;
  const history = useHistory();
  const [productsList, setProductsList] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  function rmItem(index) {
    if (productsList[index].quantity > 0) {
      productsList[index].quantity -= 1;
      setProductsCount(productsCount - 1);
    }
  }

  function addItem(index) {
    productsList[index].quantity += 1;
    setProductsCount(productsCount + 1);
  }

  const quantityInput = ({ target }, index) => {
    productsList[index].quantity = Number(target.value);
    setProductsCount(productsCount + Number(target.value));
  };

  const buttonCarrinho = () => {
    const cart = productsList.filter(({ quantity }) => quantity > 0);
    let data = JSON.parse(localStorage.getItem('user'));
    data = { ...data, cart };
    data = JSON.stringify(data);
    localStorage.setItem('user', data);
    history.push('/customer/checkout');
  };

  function totalPrice(list) {
    if (list.length === 0) return '0,00';
    return list.reduce((acc, { price, quantity }) => (
      Number(acc) + quantity * Number(price)).toFixed(2), 0)
      .replace(/\./, ',');
  }

  useEffect(() => {
    const initialProducts = async () => {
      const url = 'http://localhost:3001/products';
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
        let products = await response.json();
        products = products.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setProductsList(products);
      }
    };
    initialProducts();
  }, [history]);

  return (
    <>
      <Button
        dataTestid="customer_products__button-cart"
        onClick={ buttonCarrinho }
        disabled={ !productsList.some(({ quantity }) => quantity > 0) }
        className="btn cart-btn"
      >
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          {totalPrice(productsList)}
        </span>
      </Button>
      <div className="card-products">
        {
          productsList.map(
            ({ id, name, price, urlImage, quantity }, index) => (
              <div key={ `product_${index}` } className="card-product">
                <p
                  data-testid={ `customer_products__element-card-price-${id}` }
                  className="price"
                >
                  {`R$ ${price.replace(/\./, ',')}`}
                </p>
                <img
                  data-testid={ `customer_products__img-card-bg-image-${id}` }
                  src={ urlImage }
                  alt={ name }
                />
                <div className="name-input_product">

                  <p
                    data-testid={ `customer_products__element-card-title-${id}` }
                    className="product_name"
                  >
                    {name}
                  </p>
                  <div className="plus-minus_div">

                    <Button
                      dataTestid={ `customer_products__button-card-rm-item-${id}` }
                      onClick={ () => rmItem(index) }
                      className="btn plus-minus_btn red_button minus_btn"
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      data-testid={ `customer_products__input-card-quantity-${id}` }
                      min="0"
                      value={ quantity }
                      className="input-card"
                      onChange={ (e) => quantityInput(e, index) }
                    />

                    <Button
                      dataTestid={ `customer_products__button-card-add-item-${id}` }
                      onClick={ () => addItem(index) }
                      className="btn plus-minus_btn red_button plus_btn"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ),
          )
        }
      </div>
    </>
  );
}

export default Products;
