import React from 'react';
import { NavLink } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [values, setValues] = React.useState({ email: '', password: '' });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  return (
    <main className="Login">
      <div className="Login__container">
        <h1 className="Login__title">Добро пожаловать!</h1>
        <form className="Login__form">
          <label
            className="Login__form-label Login__form-label_email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="Login__form-input Login__form-input_email"
            type="email"
            id="email"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <label
            className="Login__form-label Login__form-label_email"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            className="Login__form-input Login__form-input_password"
            type="password"
            id="password"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className="Login__form-input-errors" id="form-input-errors" />
          <button type="submit" className="Login__form-submit-button hover-effect">Войти</button>
        </form>
        <span className="Login__question">Ещё не зарегистрированы?</span>
        <NavLink className="Login__nav-link hover-effect" to="/signup">Регистрация</NavLink>
      </div>
    </main>
  );
};

export default Login;
