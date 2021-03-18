import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';

import ProtectedRoute from '../HOC/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Page404 from '../Page404/Page404';

import useWindowSize from '../Hooks/useWindowSize';

import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import {
  MAIN_API_URL,
  MOVIES_API_URL,
  SHORT_MOVIE_DURATION,
  WIDTH_BREAKPOINT_AT_1200PX,
  WIDTH_BREAKPOINT_AT_909PX,
  NUMBER_OF_MOVIES_IN_ROW_ABOVE_1200PX_WIDTH,
  NUMBER_OF_MOVIES_IN_ROW_1200PX_909PX_WIDTH,
  NUMBER_OF_MOVIES_IN_ROW_BELLOW_909PX_WIDTH,
  isLoginLoading,
  transformInitalMoviesArray,
  findRecMovieByMovieId,
  updateRecList,
  filterRecList,
  normalizeSearchString,
} from '../../utils/consts';

const App = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const moviesApi = new MoviesApi(MOVIES_API_URL);
  const mainApi = new MainApi(MAIN_API_URL);

  const [movieAdd, setMovieAdd] = useState(4);
  const [currentUser, setUserInfo] = useState({});
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(isLoginLoading);

  const [movies, setMovies] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  const [areMoviesUpdating, setMoviesUpdating] = useState(false);
  const [areRecMoviesUpdating, setRecMoviesUpdating] = useState(false);
  const [recMoviesFiltered, setRecMoviesFiltered] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);

  const [searchString, setSearchString] = useState('');
  const [shortMovieFilter, setShortMovieFilter] = useState(false);
  const [viewCount, setViewCount] = useState(4);
  const [isHasMore, setIsHasMore] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > WIDTH_BREAKPOINT_AT_1200PX) {
      setMovieAdd(NUMBER_OF_MOVIES_IN_ROW_ABOVE_1200PX_WIDTH);
    } else if (width > WIDTH_BREAKPOINT_AT_909PX) {
      setMovieAdd(NUMBER_OF_MOVIES_IN_ROW_1200PX_909PX_WIDTH);
    } else {
      setMovieAdd(NUMBER_OF_MOVIES_IN_ROW_BELLOW_909PX_WIDTH);
    }
  }, [width]);

  const updateSearch = useCallback((str) => {
    setSearchString(str);
    setViewCount(movieAdd);
  }, [movieAdd]);

  const handleRegister = (data) => {
    mainApi.register(data)
      .then(
        (res) => {
          if (res) {
            history.push('/signin');
            setInfoTooltipMessage('Вы успешно зарегистрировались!');
          }
        },
      ).catch(
        (err) => {
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
        },
      ).finally(() => setInfoTooltipPopup(true));
  };

  const handleLogin = (data) => {
    mainApi.login(data)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/movies');
          setInfoTooltipMessage('Вы успешно вошли в приложение!');
        }
      }).catch(
        (err) => {
          console.log(err);
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
        },
      ).finally(
        () => setInfoTooltipPopup(true),
      );
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleEditProfile = (data) => {
    mainApi.updateMyProfile(data, token)
      .then(
        (res) => {
          setUserInfo(() => ({ ...res }));
          setInfoTooltipMessage('Вы успешно обновили информацию о пользователе');
        },
      ).catch(
        (err) => setInfoTooltipMessage(`Ошибка: ${err.message}`),
      ).finally(
        () => setInfoTooltipPopup(true),
      );
  };

  const handleLikeMovie = (movie) => {
    mainApi.createMovie(movie, token)
      .then(
        (likedMovie) => {
          setRecMovies((currentRecMovies) => updateRecList(currentRecMovies, likedMovie));
          setInfoTooltipMessage('Вы успешно рекомендовали тайтл!');
        },
      ).catch(
        (err) => {
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
          setInfoTooltipPopup(true);
        },
      );
  };

  const handleDislikeMovie = (movie) => {
    mainApi.deleteMovie(findRecMovieByMovieId(movie.movieId, recMovies), token)
      .then(
        (dislikedMovie) => {
          setRecMovies((currentRecMovies) => filterRecList(currentRecMovies, dislikedMovie));
        },
      ).catch(
        (err) => {
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
          setInfoTooltipPopup(true);
        },
      );
  };

  const handleDeleteMovieFromRecommendations = (movie) => {
    mainApi.deleteMovie(movie._id, token)
      .then(
        (deletedMovie) => {
          setRecMovies((currentRecMovies) => filterRecList(currentRecMovies, deletedMovie));
        },
      )
      .catch(
        (err) => {
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
          setInfoTooltipPopup(true);
        },
      );
  };

  useEffect(() => {
    setIsHasMore(false);
    setMoviesFiltered((movies || []).reduce((acc, movie) => {
      const { duration, nameRU } = movie;
      const isOkByShort = shortMovieFilter ? duration <= SHORT_MOVIE_DURATION : true;
      const isOk = isOkByShort
        && searchString
        && normalizeSearchString(nameRU).includes(searchString);

      if (acc.length > (viewCount - 1)) {
        setIsHasMore(true);
        return acc;
      }
      return isOk ? [...acc, movie] : acc;
    }, []));
  }, [searchString, shortMovieFilter, movies, setMoviesFiltered, viewCount]);

  useEffect(() => {
    setRecMoviesFiltered((recMovies || []).reduce((acc, movie) => {
      const { duration, nameRU } = movie;
      const isOkByShort = shortMovieFilter ? duration <= SHORT_MOVIE_DURATION : true;
      const isOk = isOkByShort
        && (searchString
          ? normalizeSearchString(nameRU).includes(searchString) : true);
      return isOk ? [...acc, movie] : acc;
    }, []));
  }, [searchString, shortMovieFilter, recMovies, setRecMoviesFiltered]);

  const getRecMovies = () => {
    mainApi.getMovies(token)
      .then(
        (recommendedMoviesData) => {
          setRecMoviesUpdating(true);
          setRecMovies(recommendedMoviesData);
        },
      ).catch(
        (err) => {
          console.log(err);
          setRecMovies([]);
        },
      ).finally(() => {
        setRecMoviesUpdating(false);
      });
  };

  const getMovies = () => {
    moviesApi.getMovies()
      .then(
        (moviesData) => {
          setMovies(transformInitalMoviesArray(moviesData));
          setMoviesUpdating(true);
        },
      ).catch(
        (err) => {
          console.log(err);
          setMovies([]);
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
          setInfoTooltipPopup(true);
        },
      ).finally(() => {
        setMoviesUpdating(false);
      });
  };

  useEffect(() => {
    if (token) {
      mainApi.checkToken(token)
        .then(
          (data) => {
            setUserInfo(() => ({ ...data }));
            setLoggedIn(true);
            getMovies();
            getRecMovies();
          },
        )
        .catch(
          (err) => {
            setLoggedIn(false);
            console.log(err);
            setInfoTooltipMessage(`Ошибка: ${err.message}`);
            setInfoTooltipPopup(true);
          },
        );
    }
  }, [loggedIn]);

  const updateViewCount = useCallback(() => {
    setViewCount((currentViewCount) => currentViewCount + movieAdd);
  }, [setViewCount, movieAdd]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            path="/movies"
            recMovieArr={recMovies}
            loggedIn={loggedIn}
            onAddMovie={handleLikeMovie}
            onDeleteMovie={handleDislikeMovie}
            component={Movies}
            movies={moviesFiltered}
            onUpdate={areMoviesUpdating}
            setSearchString={updateSearch}
            setShortMovieFilter={setShortMovieFilter}
            updateViewCount={updateViewCount}
            isHasMore={isHasMore}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            onDeleteMovie={handleDeleteMovieFromRecommendations}
            component={SavedMovies}
            movies={recMoviesFiltered}
            onUpdate={areRecMoviesUpdating}
            setSearchString={updateSearch}
            setShortMovieFilter={setShortMovieFilter}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfile}
            onLogout={handleLogout}
          />
          <Route path="*" component={Page404} />
        </Switch>
        <InfoTooltip
          message={infoTooltipMessage}
          isOpen={isInfoTooltipPopupOpen}
          onClose={() => setInfoTooltipPopup(false)}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
