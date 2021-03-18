import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import closeIcon from '../../../images/close-icon.svg';
import profileIcon from '../../../images/profile-icon.svg';

const SideMenu = ({ isOpen, onClose }) => (
  <div className={`SideMenu ${isOpen ? ' SideMenu_opened' : ''}`}>
    <nav
      className={`SideMenu__container ${isOpen ? ' SideMenu__container_visible' : ''}`}
    >
      <button
        type="button"
        className="SideMenu__close-button hover-effect"
        onClick={onClose}
      >
        <img src={closeIcon} alt="Закрыть меню" />
      </button>
      <ul className="SideMenu__navlinks">
        <li className="SideMenu__navlink-container SideMenu__navlink-container_main">
          <NavLink
            onClick={onClose}
            className="SideMenu__navlink hover-effect"
            activeClassName="SideMenu__navlink_active"
            exact
            to="/"
          >
            Главная
          </NavLink>
        </li>
        <li className="SideMenu__navlink-container SideMenu__navlink-container_movies">
          <NavLink
            onClick={onClose}
            className="SideMenu__navlink hover-effect"
            activeClassName="SideMenu__navlink_active"
            to="/movies"
          >
            Фильмы
          </NavLink>
        </li>
        <li className="SideMenu__link-container SideMenu__navlink-container_saved-movies">
          <NavLink
            onClick={onClose}
            className="SideMenu__navlink hover-effect"
            activeClassName="SideMenu__navlink_active"
            to="/saved-movies"
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li className="SideMenu__link-container SideMenu__navlink-container_profile">
          <NavLink
            onClick={onClose}
            className="SideMenu__profile-button hover-effect"
            to="/profile"
          >
            <p className="SideMenu__profile-button-text">
              Аккаунт
            </p>
            <img
              alt="Иконка профиля"
              src={profileIcon}
              className="SideMenu__profile-button-image"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
    <div
      aria-hidden="true"
      className={`SideMenu__overlay ${isOpen ? ' SideMenu__overlay_visible' : ''}`}
      onClick={onClose}
    />
  </div>
);

export default SideMenu;
