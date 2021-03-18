import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({
  movies,
  onDeleteMovie,
  onUpdate,
  setSearchString,
  setShortMovieFilter,
}) => (
  <main className="Movies">
    <div className="Movies__container">
      <SearchForm setSearchString={setSearchString} setShortMovieFilter={setShortMovieFilter} />
      {
        onUpdate
          ? (
            <Preloader />
          )
          : ((movies.length === 0)
            ? (
              <p className="Movies__error">
                Вы еще не рекомендовали фильмы
              </p>
            )
            : (
              <SavedMoviesCardList
                movies={movies}
                onDeleteMovie={onDeleteMovie}
              />
            ))
      }
    </div>
  </main>
);

export default SavedMovies;
