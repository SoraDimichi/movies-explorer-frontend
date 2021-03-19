import React, { useState } from 'react';
import './MoviesCard.css';
import likeIcon from '../../../../images/like-icon.svg';
import likedIcon from '../../../../images/liked-icon.svg';

import {
  setInitialLikeState,
  getTimeFromMins,
} from '../../../../utils/consts';

const MoviesCard = ({
  recMovieArr, movie, onAddMovie, onDeleteMovie, onLoading,
}) => {
  const [isLiked, setIsLiked] = useState(setInitialLikeState(movie, recMovieArr));

  const handleLike = () => {
    if (!isLiked) {
      onAddMovie(movie);
    } else {
      onDeleteMovie(movie);
    }
    setIsLiked(!isLiked);
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
      <button
        type="button"
        className={`MoviesCard__button
        ${onLoading ? 'moviesCard__button_disabled' : ''}
         moviesCard__button_like hover-effect`}
        onClick={handleLike}
      >
        <img src={isLiked ? likedIcon : likeIcon} alt="лайк" />
      </button>
      <p className="MoviesCard__duration">{getTimeFromMins(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;
