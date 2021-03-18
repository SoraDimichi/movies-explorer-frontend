import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';

const MoviesCardList = ({
  recMovieArr, movies, onDeleteMovie, onAddMovie, updateViewCount, isHasMore,
}) => (
  <div className="MoviesCardList">
    <ul className="MoviesCardList__cards">
      {movies.map((movie) => (
        <MoviesCard
          recMovieArr={recMovieArr}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
          onAddMovie={onAddMovie}
          key={movie.movieId}
        />
      ))}
    </ul>
    { isHasMore ? (
      <button
        onClick={updateViewCount}
        type="button"
        className="MoviesCardList__load-more-button hover-effect"
      >
        Ещё
      </button>
    ) : null}
  </div>
);

export default MoviesCardList;
