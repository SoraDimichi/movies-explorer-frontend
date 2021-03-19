import React from 'react';
import './SavedMoviesCard.css';
import deleteIcon from '../../../../images/delete-icon.svg';
import {
  getTimeFromMins,
} from '../../../../utils/consts';

const SavedMoviesCard = ({
  movie, onDeleteMovie, onLoading,
}) => {
  const handleDelete = () => {
    onDeleteMovie(movie);
  };

  return (
    <li className="MoviesCard">
      <a
        href={movie.trailer}
        className="MoviesCard__imageLink hover-effect"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="MoviesCard__image"
          src={movie.thumbnail}
          alt={movie.nameRU}
        />
      </a>
      <p className="MoviesCard__title">{movie.nameRU}</p>
      <div className="MoviesCard__button-container">
        <button
          type="button"
          className={`MoviesCard__button
          ${onLoading ? 'moviesCard__button_disabled' : ''}
          moviesCard__button_delete hover-effect`}
          onClick={handleDelete}
        >
          <img src={deleteIcon} alt="удалить" />
        </button>
      </div>
      <p className="MoviesCard__duration">{getTimeFromMins(movie.duration)}</p>
    </li>
  );
};

export default SavedMoviesCard;
