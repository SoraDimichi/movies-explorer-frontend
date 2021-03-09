import React from 'react';
import './Header.css';
import { useLocation, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import profileIcon from '../../images/profile-icon.svg';
import SideMenu from './SideMenu/SideMenu';
import hamburgerIcon from '../../images/hamburger-icon.svg';

const Header = () => {
  const location = useLocation();
  const [isSideMenuOpen, setSideMenu] = React.useState(false);

  const isFormPage = location.pathname === '/signup' || location.pathname === '/signin';
  const isDefendedPage = location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';
  const isMainPage = location.pathname === '/';

  if (isFormPage) {
    return (
      <header className="Header Header_type_form-page">
        <nav className="Header__container Header__container_type_form-page">
          <ul className="Header__navlinks Header__navlinks_type_form-page">
            <li className="Header__navlink-container_logo">
              <NavLink
                className="Header__navlink Header__navlink_logo hover-effect"
                to="/"
              >
                <img src={logo} alt="Логотип" className="Header__logo-image" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  if (isDefendedPage) {
    return (
      <header className="Header">
        <nav className="Header__container">
          <ul className="Header__navlinks">
            <li className="Header__navlink-container Header__navlink-container_logo">
              <NavLink
                className="Header__navlink Header__navlink_logo hover-effect"
                to="/"
              >
                <img src={logo} alt="Логотип" className="Header__logo-image" />
              </NavLink>
            </li>
            <li className="Header__navlink-container Header__navlink-container_movies">
              <NavLink
                className="Header__navlink hover-effect"
                activeClassName="Header__navlink_active"
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="Header__navlink-container Header__navlink-container_saved-movies">
              <NavLink
                className="Header__navlink hover-effect"
                activeClassName="Header__navlink_active"
                to="/saved-movies"
              >
                Сохраненные фильмы
              </NavLink>
            </li>
            <li className="Header__navlink-container Header__navlink-container_profile">
              <NavLink
                className="Header__profile-button hover-effect"
                to="/profile"
              >
                <p className="Header__profile-button-text">Аккаунт</p>
                <img
                  alt="Иконка профиля"
                  src={profileIcon}
                  className="Header__profile-button-image"
                />
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="Header__hamburger-button hover-effect"
            onClick={() => setSideMenu(true)}
          >
            <img
              src={hamburgerIcon}
              alt="Открыть меню"
              className="Header__hamburger-button-image"
            />
          </button>
        </nav>
        <SideMenu isOpen={isSideMenuOpen} onClose={() => setSideMenu(false)} />
      </header>
    );
  }

  if (isMainPage) {
    return (
      <header className="Header">
        <nav className="Header__container">
          <ul className="Header__navlinks">
            <li className="Header__navlink-container Header__navlink-container_logo">
              <NavLink
                className="Header__navlink Header__navlink_logo hover-effect"
                to="/"
              >
                <img src={logo} alt="Логотип" className="Header__logo-image" />
              </NavLink>
            </li>
            <li className="Header__navlink-container Header__navlink-container_signup">
              <NavLink
                className="Header__navlink hover-effect"
                to="/signup"
              >
                Регистрация
              </NavLink>
            </li>
            <li className="Header__navlink-container Header__navlink-container_signin">
              <NavLink
                className="Header__navlink Header__navlink_green-button hover-effect"
                to="/signin"
              >
                Логин
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  return null;
};

export default Header;
