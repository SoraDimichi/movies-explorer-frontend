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
  recMoviesError,
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
                {
                recMoviesError.includes('рекомедовали')
                  ? 'Вы еще не рекомендовали фильмы'
                  : `Во время запроса произошла ошибка.
                       Возможно, проблема с соединением или сервер недоступен.
                       Подождите немного и попробуйте ещё раз`
              }
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
