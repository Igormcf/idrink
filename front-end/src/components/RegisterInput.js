import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

export default function RegisterInput() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  // const [isVisibleMessageEmail, setIsVisibleMessageEmail] = useState(false);
  const history = useHistory();

  const SIX = 6;
  const TWELVE = 12;
  const status201 = 201;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isNotLoginValid = () => !(
    userName.length >= TWELVE
    && validateEmail(userEmail)
    && userPassword.length >= SIX
  );

  const buttonRegister = async () => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
        role: 'customer',
      }),
    };
    const response = await fetch('http://localhost:3001/register', requestOptions);
    const { status } = response;
    const data = await response.json();
    if (status === status201) {
      localStorage.setItem(
        'user',
        JSON.stringify(data),
      );
      history.push('/customer/products');
      // } else if (status === 409) {
      //   setIsVisibleMessageEmail(true);
    } else {
      setIsVisibleMessage(true);
    }
  };

  return (
    <div>
      <form className="form-login">

        <label htmlFor="name" className="label-form">
          Nome
          <input
            data-testid="common_register__input-name"
            placeholder="Seu Nome"
            type="text"
            id="name"
            onChange={ ({ target }) => setUserName(target.value) }
          />
        </label>

        <label htmlFor="email" className="label-form">
          Email
          <input
            data-testid="common_register__input-email"
            placeholder="Ex: your@email.com"
            type="email"
            id="email"
            onChange={ ({ target }) => setUserEmail(target.value) }
          />
        </label>

        <label htmlFor="password" className="label-form">
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
          onClick={ buttonRegister }
          className="primary_button"
        >
          Cadastrar
        </Button>

        {
          isVisibleMessage ? (
            <p
              data-testid="common_register__element-invalid_register"
              className="error-message"
            >
              Um ou mais campos inv??lidos
            </p>
          )
            : <p className="error-message invisible">text</p>
        }
      </form>
    </div>
  );
}
