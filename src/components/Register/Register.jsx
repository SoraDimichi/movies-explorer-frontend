import React from 'react';
import { NavLink } from 'react-router-dom';
import './Register.css';
import useFormWithValidation from '../Hooks/useFormWithValidation';

const Register = ({ onRegister, onLoading }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
  };

  return (
    <main className="Register">
      <div className="Register__container">
        <h1 className="Register__title">Добро пожаловать!</h1>
        <form className="Register__form" onSubmit={handleSubmit}>
          <label
            className="Register__form-label Register__form-label_email"
            htmlFor="name"
          >
            Имя
          </label>
          <input
            className={`Register__form-input Register__form-input_name ${errors.name
              ? 'Register__form-input_errored' : ''}`}
            type="text"
            id="name"
            name="name"
            onChange={(evt) => handleChange(evt)}
            minLength="2"
            maxLength="30"
            required
          />
          <span className="Register__form-input-error Register__form-input-error_name">
            {errors.name}
          </span>
          <label
            className="Register__form-label Register__form-label_email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`Register__form-input Register__form-input_email ${errors.email
              ? 'Register__form-input_errored' : ''}`}
            type="email"
            name="email"
            id="email"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className="Register__form-input-error Register__form-input-error_email">
            {errors.email}
          </span>
          <label
            className="Register__form-label Register__form-label_email"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            className={`Register__form-input Register__form-input_password ${errors.password
              ? 'Register__form-input_errored' : ''}`}
            type="password"
            name="password"
            id="password"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className="Register__form-input-error Register__form-input-error_password">
            {errors.password}
          </span>
          <button
            type="submit"
            className={`Register__form-submit-button ${(!isValid || onLoading)
              ? 'Register__form-submit-button_disabled ' : ''} hover-effect`}
          >
            Зарегистрироваться
          </button>
        </form>
        <span className="Register__question">Уже зарегистрированы?</span>
        <NavLink className="Register__nav-link hover-effect" to="/signin">Войти</NavLink>
      </div>
    </main>
  );
};

export default Register;
