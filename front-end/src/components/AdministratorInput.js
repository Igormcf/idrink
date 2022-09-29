import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from './Button';

export default function RegisterInput() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [removeStatus, setRemoveStatus] = useState(false);
  //  const [isVisibleMessage, setIsVisibleMessage] = useState(false);
  // const [isVisibleMessageEmail, setIsVisibleMessageEmail] = useState(false);
  //  const history = useHistory();

  const SIX = 6;
  const TWELVE = 12;
  //  const status201 = 201;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isNotFormValid = () => !(
    userName.length >= TWELVE
    && validateEmail(userEmail)
    && userPassword.length >= SIX
    && role !== ''
  );

  const buttonRegister = async () => {
    const url = 'http://localhost:3001/admin/manage';
    const data = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: data.token,
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
        role,
      }),
    };
    await fetch(url, requestOptions);
    /* const { status } = response;
    const data = await response.json();
    if (status === status201) {
      localStorage.setItem(
        'user',
        JSON.stringify(data),
      );
      history.push('/customer/products');
    } else {
      setIsVisibleMessage(true);
    } */
  };

  const removeUserById = async (id) => {
    const url = `http://localhost:3001/user/${id}`;
    const data = JSON.parse(localStorage.getItem('user'));
    const fetchOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: data.token,
      },
    };
    const response = await fetch(url, fetchOptions);
    setRemoveStatus(response.status);
  };

  useEffect(() => {
    const initialUsers = async () => {
      const data = JSON.parse(localStorage.getItem('user'));
      const url = 'http://localhost:3001/user';
      const fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: data.token,
        },
      };
      const response = await fetch(url, fetchOptions);
      const userList = await response.json();
      setUsers(userList);
    };
    initialUsers();
  }, [removeStatus]);

  return (
    <div>
      <label htmlFor="name">
        Nome
        <input
          data-testid="admin_manage__input-name"
          placeholder="Nome"
          type="text"
          id="name"
          onChange={ ({ target }) => setUserName(target.value) }
        />
      </label>

      <label htmlFor="email">
        Login
        <input
          data-testid="admin_manage__input-email"
          placeholder="Ex: your@email.com"
          type="email"
          id="email"
          onChange={ ({ target }) => setUserEmail(target.value) }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          data-testid="admin_manage__input-password"
          placeholder="******"
          type="password"
          id="password"
          onChange={ ({ target }) => setUserPassword(target.value) }
        />
      </label>

      <label htmlFor="user-type">
        Tipo

        <select
          id="user-type"
          data-testid="admin_manage__select-role"
          defaultValue=""
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="" disabled hidden>Escolha o tipo</option>
          <option value="customer">Consumidor</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>

      <Button
        dataTestid="admin_manage__button-register"
        disabled={ isNotFormValid() }
        onClick={ buttonRegister }
      >
        Cadastrar
      </Button>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(({ id, name, email, role: userRole }, index) => (
              <tr key={ `adminTable_${index}` }>
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-name-${index}`
                  }
                >
                  { name }
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-email-${index}`
                  }
                >
                  { email }
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-role-${index}`
                  }
                >
                  { userRole }
                </td>
                <td>
                  <Button
                    dataTestid={ `admin_manage__element-user-table-remove-${index}` }
                    onClick={ () => removeUserById(id) }
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}
