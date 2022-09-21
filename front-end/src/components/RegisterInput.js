import React, { useState } from 'react';
import Button from './Button';

export default function RegisterInput() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const SIX = 6;
  const TWELVE = 12;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isNotLoginValid = () => !(
    userName.length < TWELVE
    && validateEmail(userEmail)
    && userPassword.length >= SIX
  );

  return (
    <div>
      <label htmlFor="name">
        Nome
        <input
          data-testid="common_register__input-name"
          placeholder="Seu Nome"
          type="text"
          id="name"
          onChange={ ({ target }) => setUserName(target.value) }
        />
      </label>

      <label htmlFor="email">
        Login
        <input
          data-testid="common_register__input-email"
          placeholder="Ex: your@email.com"
          type="email"
          id="email"
          onChange={ ({ target }) => setUserEmail(target.value) }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          data-testid="common_register__input-password"
          placeholder="******"
          type="password"
          id="password"
          onChange={ ({ target }) => setUserPassword(target.value) }
        />
      </label>

      <Button
        dataTestid="common_register__button-register"
        disabled={ isNotLoginValid() }
      >
        Cadastrar
      </Button>
    </div>
  );
}
