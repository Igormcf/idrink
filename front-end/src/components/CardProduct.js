import React, { useState, useEffect } from 'react';
import Button from './Button';

function Products() {
  const [productsList, setProductsList] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
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
    let products = await response.json();
    products = products.map((product) => ({
      ...product,
      quantity: 0,
    }));
    setProductsList(products);
  };

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

  useEffect(() => {
    initialProducts();
  }, []);

  return (
    <div>
      {
        productsList.map(({ id, name, price, url_image: urlImage, quantity }, index) => (
          <div key={ `product_${index}` }>
            <p data-testid={ `customer_products__element-card-price-${id}` }>
              { price.replace(/\./, ',') }
            </p>
            <img
              width="150px"
              data-testid={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt={ name }
            />
            <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
            <Button
              dataTestid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => rmItem(index) }
            >
              -
            </Button>
            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              min={ 0 }
              value={ quantity }
              onChange={ (e) => quantityInput(e, index) }
            />

            <Button
              dataTestid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => addItem(index) }
            >
              +
            </Button>
          </div>
        ))
      }
    </div>
  );
}

export default Products;
