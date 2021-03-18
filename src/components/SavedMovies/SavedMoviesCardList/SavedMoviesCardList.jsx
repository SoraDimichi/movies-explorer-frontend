import React from 'react';
import './SavedMoviesCardList.css';
import SavedMoviesCard from './SavedMoviesCard/SavedMoviesCard';

const SavedMoviesCardList = ({
  movies, onDeleteMovie,
}) => (
  <div className="MoviesCardList">
    <ul className="MoviesCardList__cards">
      {movies.map((movie) => (
        <SavedMoviesCard
          movie={movie}
          onDeleteMovie={onDeleteMovie}
          key={movie.movieId}
        />
      ))}
    </ul>
  </div>
);

export default SavedMoviesCardList;
