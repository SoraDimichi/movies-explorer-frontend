import React from 'react';
import './MoviesCardList.css';
import moviesConfig from '../../../utils/configs';
import MoviesCard from './MoviesCard/MoviesCard';

const MoviesCardList = () => (
  <section className="MoviesCardList">
    <div className="MoviesCardList__container">
      <ul className="MoviesCardList__cards">
        {moviesConfig.map((card) => (
          <MoviesCard
            card={card}
            key={card.movieId}
          />
        ))}
      </ul>
      <button type="button" className="MoviesCardList__load-more-button hover-effect">Ещё</button>
    </div>
  </section>
);

export default MoviesCardList;
