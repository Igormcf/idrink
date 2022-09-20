import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginInput() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isVisibleMessage] = useState(false);
  const history = useHistory();

  const SIX = 6;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isNotLoginValid = () => !(validateEmail(userEmail) && userPassword.length >= SIX);

  const buttonRegister = () => {
    history.push('/register');
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

      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ isNotLoginValid() }
      >
        Login
      </button>

      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ buttonRegister }
      >
        Ainda não tenho conta
      </button>

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
