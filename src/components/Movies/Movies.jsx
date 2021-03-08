import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

const Movies = () => (
  <main className="Movies">
    <SearchForm />
    <MoviesCardList />
  </main>
);

export default Movies;
