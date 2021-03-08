import React from 'react';
import { NavLink } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [values, setValues] = React.useState({ name: '', email: '', password: '' });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  return (
    <main className="Register">
      <div className="Register__container">
        <h1 className="Register__title">Добро пожаловать!</h1>
        <form className="Register__form">
          <label
            className="Register__form-label Register__form-label_email"
            htmlFor="name"
          >
            Имя
          </label>
          <input
            className="Register__form-input Register__form-input_name"
            type="text"
            id="name"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <label
            className="Register__form-label Register__form-label_email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="Register__form-input Register__form-input_email"
            type="email"
            id="email"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <label
            className="Register__form-label Register__form-label_email"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            className="Register__form-input Register__form-input_password"
            type="password"
            id="password"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className="Register__form-input-errors" id="form-input-errors" />
          <button type="submit" className="Register__form-submit-button hover-effect">
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
