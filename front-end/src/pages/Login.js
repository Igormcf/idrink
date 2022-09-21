import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import LoginInput from '../components/LoginInput';

function Login() {
  const history = useHistory();

  const buttonRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <LoginInput />
      <Button
        dataTestid="common_login__button-register"
        onClick={ buttonRegister }
      >
        Ainda não tenho conta
      </Button>
    </>
  );
}

export default Login;
