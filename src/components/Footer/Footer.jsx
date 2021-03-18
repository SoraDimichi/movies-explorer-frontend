import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  const isPageWithFooter = location.pathname === '/'
    || location.pathname === '/saved-movies'
    || location.pathname === '/movies';

  if (!isPageWithFooter) {
    return null;
  }

  return (
    <footer className="Footer">
      <div className="Footer__container">
        <p className="Footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <p className="Footer__copyright">© 2020</p>
        <nav className="Footer__social-menu">
          <ul className="Footer__social-links">
            <li>
              <a
                href="https://praktikum.yandex.ru/web/"
                className="Footer__social-link hover-effect"
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/SoraDimichi"
                className="Footer__social-link hover-effect"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://hh.ru/resume/2c997cafff026ed8bb0039ed1f6a7a4a434567"
                className="Footer__social-link hover-effect"
                target="_blank"
                rel="noopener noreferrer"
              >
                hh.ru
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
