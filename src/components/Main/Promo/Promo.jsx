import React from 'react';
import promoImage from '../../../images/promo-image.svg';
import './Promo.css';

const Promo = () => (
  <section className="Promo">
    <div className="Promo__container">
      <h1 className="Promo__title">
        Учебный проект выпускника факультета Веб&#8209;разработки.
      </h1>
      <p className="Promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a className="Promo__navButton hover-effect" href="#AboutProject">
        Узнать больше
      </a>
      <img src={promoImage} alt="" className="Promo__image" />
    </div>
  </section>
);

export default Promo;
