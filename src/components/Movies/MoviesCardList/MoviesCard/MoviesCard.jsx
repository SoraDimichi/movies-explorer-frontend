import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import likeIcon from '../../../../images/like-icon.svg';
import likedIcon from '../../../../images/liked-icon.svg';
import deleteIcon from '../../../../images/delete-icon.svg';

const MoviesCard = ({ card }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const getTimeFromMins = (mins) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    if (hours === 0) {
      return `${minutes}м`;
    }
    return `${hours}ч ${minutes}м`;
  };

  return (
    <li className="MoviesCard">
      <img
        className="MoviesCard__image"
        src={card.thumbnail}
        alt={card.nameRU}
      />
      <p className="MoviesCard__title">{card.nameRU}</p>
      {
        isMoviesPage
          ? (
            <button
              type="button"
              className="MoviesCard__button moviesCard__button_like hover-effect"
              onClick={handleLike}
            >
              <img src={isLiked ? likedIcon : likeIcon} alt="лайк" />
            </button>
          )
          : (
            <div className="MoviesCard__button-container">
              <button
                type="button"
                className="MoviesCard__button moviesCard__button_delete hover-effect"
              >
                <img src={deleteIcon} alt="удалить" />
              </button>
            </div>
          )
      }
      <p className="MoviesCard__duration">{getTimeFromMins(card.duration)}</p>
    </li>
  );
};

export default MoviesCard;
