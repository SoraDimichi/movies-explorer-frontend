import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({
  recMovieArr,
  movies,
  onDeleteMovie,
  onAddMovie,
  onUpdate,
  setSearchString,
  setShortMovieFilter,
  updateViewCount,
  isHasMore,
  moviesError,
  areNoMoviesFound,
}) => (
  <main className="Movies">
    <div className="Movies__container">
      <SearchForm
        setSearchString={setSearchString}
        setShortMovieFilter={setShortMovieFilter}
      />
      {
          onUpdate
            ? (
              <Preloader />
            )
            : ((movies.length === 0)
              ? (
                <p className="Movies__error">
                  { moviesError
                    ? `Во время запроса произошла ошибка.
                       Возможно, проблема с соединением или сервер недоступен.
                       Подождите немного и попробуйте ещё раз`
                    : areNoMoviesFound
                      ? 'Ничего не найдено'
                      : 'Вы пока еще не искали фильмы'}
                </p>
              )
              : (
                <MoviesCardList
                  recMovieArr={recMovieArr}
                  movies={movies}
                  onDeleteMovie={onDeleteMovie}
                  onAddMovie={onAddMovie}
                  updateViewCount={updateViewCount}
                  isHasMore={isHasMore}
                />
              ))
      }
    </div>
  </main>
);

export default Movies;
