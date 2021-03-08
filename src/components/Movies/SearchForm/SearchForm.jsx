import React from 'react';
import searchIcon from '../../../images/search-icon.svg';
import './SearchForm.css';

const SearchForm = () => {
  const [values, setValues] = React.useState({ key: '', filter: false });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  return (
    <section className="SearchForm">

      <div className="SearchForm__container">
        <form action="" className="SearchForm__form">
          <img
            className="SearchForm__image"
            src={searchIcon}
            alt="иконка поиска"
          />
          <input
            type="text"
            name="search"
            title="Поиск"
            id="search"
            className="SearchForm__input"
            placeholder="Поиск"
            onChange={(evt) => handleChange(evt)}
            required
          />
          <button type="submit" className="SearchForm__submit hover-effect">
            Найти
          </button>
          <div className="SearchForm__switch">
            <input
              type="checkbox"
              name="filter"
              className="SearchForm__switch-checkbox"
              onChange={(evt) => handleChange(evt)}
            />
            <div className="SearchForm__switch-slider" />
            <label className="SearchForm__switch-label" htmlFor="filter">
              Короткометражки
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;
