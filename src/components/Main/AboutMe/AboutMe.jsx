import React from 'react';
import './AboutMe.css';
import storyPhoto from '../../../images/story-photo.png';

const AboutMe = () => (
  <section className="AboutMe">
    <div className="AboutMe__container">
      <h2 className="AboutMe__title">Выпускник</h2>
      <h3 className="AboutMe__story-title">Дмитрий</h3>
      <p className="AboutMe__story-subtitle">Фронтенд-разработчик. Еще умею дизайнить.</p>
      <p className="AboutMe__story-paragraph">
        Родился в Москве, закончил радиофак МГТУГА.
        С юности увлекаюсь разработкой сайтов. Полноценную карьеру в IT-индустрии начал с
        работы веб-дизайнером в компании «КОДОС». Занимался дизайном полиграфии, а так же
        самостоятельно обучился и лично разработал под ключ сайт в данной компании -
        осознал, что это моё.
      </p>
      <p className="AboutMe__story-paragraph">
        В данный момент ищу постоянную работу Junior front-end developer - у меня
        обширные планы на рост в профессии - открыт для ваших предложений.
      </p>
      <img src={storyPhoto} alt="Фото Дмитрия" className="AboutMe__photo" />
      <nav className="AboutMe__social-menu">
        <ul className="AboutMe__social-links">
          <li>
            <a
              href="https://github.com/SoraDimichi"
              className="AboutMe__social-link hover-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href={storyPhoto}
              className="AboutMe__social-link hover-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              hh.ru
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
);

export default AboutMe;
