import LoginInput from '../components/LoginInput';
import imgLogin from '../images/img-login.svg';
import logo from '../images/logo.png';
import '../css/login.css';

function Login() {
  const alteraTitle = () => {
    document.title = 'idrink';
  };
  alteraTitle();
  return (
    <div className="div-login">
      <img src={ logo } alt="logo" className="img-logo" />

      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="img-svg">
        <path
          fill="#FDEDEE"
          d="M49.7,-68.5C63.8,-58.1,74.2,
          -42.8,79.6,-25.9C85,-9.1,85.4,9.4,80.2,26.3C75.1,43.2,
          64.4,58.5,50.1,69.7C35.8,80.8,17.9,87.7,-0.4,88.2C-18.6,
          88.7,-37.3,82.8,-52.6,72C-68,61.3,-80.1,45.6,-86.5,
          27.7C-92.9,9.8,-93.6,-10.4,-87.8,-28.6C-82,-46.7,
          -69.6,-62.7,-53.9,-72.6C-38.2,-82.4,-19.1,-86,-0.6,-85.1C17.8,
          -84.2,35.6,-78.8,49.7,-68.5Z"
          transform="translate(100 100)"
        />
      </svg>
      <section className="login-page">
        <img src={ imgLogin } alt="Pessoas com sacolas" />
        <LoginInput />
      </section>
    </div>

  );
}

export default Login;
