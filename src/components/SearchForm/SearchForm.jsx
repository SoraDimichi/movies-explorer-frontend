import React, { useEffect } from 'react';
import searchIcon from '../../images/search-icon.svg';
import './SearchForm.css';
import useFormWithValidation from '../Hooks/useFormWithValidation';
import { normalizeSearchString } from '../../utils/consts';

const SearchForm = ({ setSearchString, setShortMovieFilter }) => {
  const {
    values,
    handleChange,
    errors,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSearchString(normalizeSearchString(values.search));
  };

  useEffect(() => {
    setSearchString('');
    setShortMovieFilter(false);
  }, []);

  return (
    <div className="SearchForm">
      <form className="SearchForm__form" onSubmit={handleSubmit}>
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
        <span className="SearchForm__error">{errors.search}</span>
        <button type="submit" className="SearchForm__submit hover-effect">
          Найти
        </button>
        <div className="SearchForm__switch">
          <input
            type="checkbox"
            name="filter"
            id="filter"
            className="SearchForm__switch-checkbox"
            onChange={(evt) => {
              setShortMovieFilter(evt.target.checked);
            }}
          />
          <span className="SearchForm__switch-slider" />
          <label className="SearchForm__switch-label" htmlFor="filter">
            Короткометражки
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
