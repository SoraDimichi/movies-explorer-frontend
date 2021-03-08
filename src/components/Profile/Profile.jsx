import React from 'react';
import './Profile.css';

const Profile = () => {
  const [values, setValues] = React.useState({ name: '', email: '', password: '' });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  return (
    <main className="Profile">
      <div className="Profile__container">
        <h1 className="Profile__title">Привет, Виталий!</h1>
        <form className="Profile__form">
          <label
            className="Profile__form-label Profile__form-label_email"
            htmlFor="name"
          >
            Имя
          </label>
          <input
            className="Profile__form-input Profile__form-input_name"
            type="text"
            id="name"
            onChange={(evt) => handleChange(evt)}
            defaultValue="Виталий"
            minLength="2"
            maxLength="30"
            required
          />
          <label
            className="Profile__form-label Profile__form-label_email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="Profile__form-input Profile__form-input_email"
            type="email"
            id="email"
            onChange={(evt) => handleChange(evt)}
            defaultValue="pochta@yandex.ru"
          />
          <span className="Profile__form-input-errors" id="form-input-errors" />
          <button type="submit" className="Profile__form-submit-button hover-effect">
            Редактировать
          </button>
        </form>
        <button type="button" className="Profile__logout-button hover-effect">
          Выйти
        </button>
      </div>
    </main>
  );
};

export default Profile;
