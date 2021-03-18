import React, {
  useEffect,
  useContext,
  useState,
} from 'react';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../Hooks/useFormWithValidation';

const Profile = ({ onLogout, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);

  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEditProfile(values);
  };

  useEffect(() => {
    setName(values.name || name);
  }, [values]);

  return (
    <main className="Profile">
      <div className="Profile__container">
        <h1 className="Profile__title">{`Привет, ${name || ''}`}</h1>
        <form className="Profile__form" onSubmit={handleSubmit}>
          <label
            className="Profile__form-label Profile__form-label_email"
            htmlFor="name"
          >
            Имя
          </label>
          <input
            className={`Profile__form-input Profile__form-input_name ${errors.name
              ? 'Profile__form-input_errored' : ''}`}
            type="text"
            id="name"
            name="name"
            onChange={(evt) => handleChange(evt)}
            minLength="2"
            maxLength="30"
            defaultValue={currentUser.name || ''}
            required
          />
          <span
            className="Profile__form-input-error Profile__form-input-error_name"
          >
            {errors.name || ''}
          </span>
          <label
            className={`Profile__form-label
             Profile__form-label_email
             `}
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`Profile__form-input Profile__form-input_email ${errors.email
              ? 'Profile__form-input_errored' : ''}`}
            type="email"
            name="email"
            id="email"
            onChange={(evt) => handleChange(evt)}
            defaultValue={currentUser.email || ''}
            required
          />
          <span className="Profile__form-input-error Profile__form-input-error_email">
            {errors.email || ''}
          </span>
          <span className="Profile__form-input-errors" id="form-input-errors" />
          <button
            type="submit"
            className={`Profile__form-submit-button  ${(!isValid)
              ? 'Profile__form-submit-button_disabled ' : ''}  hover-effect`}
          >
            Редактировать
          </button>
        </form>
        <button
          type="button"
          className="Profile__logout-button hover-effect"
          onClick={onLogout}
        >
          Выйти
        </button>
      </div>
    </main>
  );
};

export default Profile;
