import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <Link
        to='/customer/products'
        data-testid='customer_products__element-navbar-link-products'
      >
        Produtos
      </Link>
      <Link to='/customer/requests' >
        Pedidos
      </Link>

    </nav>
  )
}

export default NavBar