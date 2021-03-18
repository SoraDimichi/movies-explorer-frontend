import React from 'react';
import { NavLink } from 'react-router-dom';
import './Login.css';
import useFormWithValidation from '../Hooks/useFormWithValidation';

const Login = ({ onLogin }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
  };

  return (
    <main className="Login">
      <div className="Login__container">
        <h1 className="Login__title">Добро пожаловать!</h1>
        <form className="Login__form" onSubmit={handleSubmit}>
          <label
            className="Login__form-label Login__form-label_email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`Login__form-input Login__form-input_email ${errors.email
              ? 'Profile__form-input_errored' : ''}`}
            type="email"
            name="email"
            id="email"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className="Login__form-input-error Login__form-input-error_email">
            {errors.email}
          </span>
          <label
            className="Login__form-label Login__form-label_email"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            className={`Login__form-input Login__form-input_password ${errors.password
              ? 'Profile__form-input_errored' : ''}`}
            type="password"
            name="password"
            id="password"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className="Login__form-input-error Login__form-input-error_password">
            {errors.password}
          </span>
          <button
            type="submit"
            className={
              `Login__form-submit-button
               ${(!isValid) ? 'Login__form-submit-button_disabled ' : ''}
               hover-effect"`
            }
          >
            Войти
          </button>
        </form>
        <span className="Login__question">Ещё не зарегистрированы?</span>
        <NavLink className="Login__nav-link hover-effect" to="/signup">Регистрация</NavLink>
      </div>
    </main>
  );
};

export default Login;
