import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

export default function LoginInput() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  const history = useHistory();

  const SIX = 6;
  const status200 = 200;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isNotLoginValid = () => !(validateEmail(userEmail) && userPassword.length >= SIX);

  const buttonLogin = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      };
      const response = await fetch('http://localhost:3001/login', requestOptions);
      const data = await response.json();
      const { status } = response;
      if (status === status200) {
        localStorage.setItem(
          'user',
          JSON.stringify(data),
        );
        if (data.role === 'seller') {
          history.push('/seller/orders');
        } else {
          history.push('/customer/products');
        }
      } else {
        setIsVisibleMessage(true);
      }
    } catch (err) {
      console.log('error ', err);
    }
  };

  const buttonRegister = () => {
    history.push('/register');
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const data = JSON.parse(userData);
    if (data) {
      if (data.role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/customer/products');
      }
    }
  }, [history]);

  return (
    <form>
      <label htmlFor="email">
        Login
        <input
          data-testid="common_login__input-email"
          placeholder="Ex: your@email.com"
          type="email"
          id="email"
          onChange={ ({ target }) => setUserEmail(target.value) }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          data-testid="common_login__input-password"
          placeholder="******"
          type="password"
          id="password"
          onChange={ ({ target }) => setUserPassword(target.value) }
        />
      </label>

      <Button
        dataTestid="common_login__button-login"
        disabled={ isNotLoginValid() }
        onClick={ buttonLogin }
      >
        LOGIN
      </Button>

      <Button
        dataTestid="common_login__button-register"
        onClick={ buttonRegister }
      >
        Ainda não tenho conta
      </Button>

      {
        isVisibleMessage && (
          <p data-testid="common_login__element-invalid-email">
            Email ou Senha invalida
          </p>
        )
      }
    </form>
  );
}
