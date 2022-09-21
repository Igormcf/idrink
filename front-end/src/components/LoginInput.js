import React, { useState } from 'react';
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
    // console.log(userEmail);
    // console.log(userPassword);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    };
    const response = await fetch('https://localhost:3001/login', requestOptions);
    const { status } = response;
    const data = await response.json();
    if (status === status200) {
      localStorage.setItem(
        'deliveapp_token',
        JSON.stringify({ email: userEmail, token: data.token }),
      );
      history.push('/products');
    } else {
      setIsVisibleMessage(true);
    }
  };

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

      {/* <button type='button' onClick={buttonLogin}>
        login
      </button> */}

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
