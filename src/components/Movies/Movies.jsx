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
  onLoading,
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
                  Что бы найти фильм - воспользуйтесь поиском
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
                  onLoading={onLoading}
                />
              ))
      }
    </div>
  </main>
);

export default Movies;
