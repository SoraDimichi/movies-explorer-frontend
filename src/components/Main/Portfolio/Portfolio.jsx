import React from 'react';
import './Portfolio.css';

const Portfolio = () => (
  <section className="Portfolio">
    <div className="Portfolio__container">
      <h2 className="Portfolio__title">Портфолио</h2>
      <nav className="Portfolio__menu">
        <ul className="Portfolio__links">
          <li className="Portfolio__link-container">
            <a
              href="https://kodos.ru"
              className="Portfolio__link hover-effect"
            >
              <p className="Portfolio__link-part">Корпоративный сайт «КОДОС»</p>
              <p className="Portfolio__link-part">↗</p>
            </a>
          </li>
          <li className="Portfolio__link-container">
            <a
              href="https://github.com/SoraDimichi/active-citizen-poet-2025-frontend"
              className="Portfolio__link hover-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="Portfolio__link-part">«Гражданин поэт 2025»</p>
              <p className="Portfolio__link-part">↗</p>
            </a>
          </li>
          <li className="Portfolio__link-container">
            <a
              href="https://github.com/SoraDimichi/react-mesto-api-full"
              className="Portfolio__link hover-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="Portfolio__link-part">Одностраничное приложение</p>
              <p className="Portfolio__link-part">↗</p>
            </a>
          </li>
          <li className="Portfolio__link-container">
            <a
              href="https://soradimichi.github.io/russian-travel/"
              className="Portfolio__link hover-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="Portfolio__link-part">Респонсивный сайт</p>
              <p className="Portfolio__link-part">↗</p>
            </a>
          </li>
          <li className="Portfolio__link-container">
            <a
              href="https://soradimichi.github.io/how-to-learn/"
              className="Portfolio__link hover-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="Portfolio__link-part">Статичный сайт</p>
              <p className="Portfolio__link-part">↗</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
);

export default Portfolio;
