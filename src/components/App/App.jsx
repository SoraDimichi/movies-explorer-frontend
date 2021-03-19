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
  CARDS_TOP_BREAKPOINT,
  CARDS_MID_BREAKPOINT,
  CARDS_IN_ROW_ABOVE_TOP_BREAKPOINT,
  CARDS_IN_ROW_BETWEEN_TOP_AND_MID_BREAKPOINT,
  CARDS_IN_ROW_BELOW_MID_BREAKPOINT,
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
  const storedMovies = JSON.parse(localStorage.getItem('movies'));

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
  const [isLoading, setLoading] = useState(false);
  const [recMoviesFiltered, setRecMoviesFiltered] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);

  const [searchString, setSearchString] = useState('');
  const [shortMovieFilter, setShortMovieFilter] = useState(false);
  const [viewCount, setViewCount] = useState(4);
  const [isHasMore, setIsHasMore] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > CARDS_TOP_BREAKPOINT) {
      setMovieAdd(CARDS_IN_ROW_ABOVE_TOP_BREAKPOINT);
    } else if (width > CARDS_MID_BREAKPOINT) {
      setMovieAdd(CARDS_IN_ROW_BETWEEN_TOP_AND_MID_BREAKPOINT);
    } else {
      setMovieAdd(CARDS_IN_ROW_BELOW_MID_BREAKPOINT);
    }
  }, [width]);

  const updateSearch = useCallback((str) => {
    setSearchString(str);
    setViewCount(movieAdd);
  }, [movieAdd]);

  const handleRegister = (data) => {
    setLoading(true);
    mainApi.register(data)
      .then(
        () => {
          history.push('/signin');
          setInfoTooltipMessage('Вы успешно зарегистрировались!');
        },
      ).catch(
        (err) => {
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
        },
      ).finally(() => {
        setLoading(false);
        setInfoTooltipPopup(true);
      });
  };

  const handleLogin = (data) => {
    setLoading(true);
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
        () => {
          setLoading(false);
          setInfoTooltipPopup(true);
        },
      );
  };

  const handleEditProfile = (data) => {
    setLoading(true);
    mainApi.updateMyProfile(data, token)
      .then(
        (res) => {
          setUserInfo(() => ({ ...res }));
          setInfoTooltipMessage('Вы успешно обновили информацию о пользователе');
        },
      ).catch(
        (err) => setInfoTooltipMessage(`Ошибка: ${err.message}`),
      ).finally(
        () => {
          setLoading(false);
          setInfoTooltipPopup(true);
        },
      );
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    history.push('/');
  };

  const handleLikeMovie = (movie) => {
    setLoading(true);
    mainApi.createMovie(movie, token)
      .then(
        (likedMovie) => {
          setRecMovies((currentRecMovies) => updateRecList(currentRecMovies, likedMovie));
          setInfoTooltipMessage('Вы успешно рекомендовали тайтл!');
          setInfoTooltipPopup(true);
        },
      ).catch(
        (err) => {
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
        },
      ).finally(
        () => {
          setLoading(false);
        },
      );
  };

  const handleDislikeMovie = (movie) => {
    setLoading(true);
    mainApi.deleteMovie(findRecMovieByMovieId(movie.movieId, recMovies), token)
      .then(
        (dislikedMovie) => {
          setRecMovies((currentRecMovies) => filterRecList(currentRecMovies, dislikedMovie));
        },
      ).catch(
        (err) => {
          setLoading(false);
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
          setInfoTooltipPopup(true);
        },
      ).finally(
        () => {
          setLoading(false);
        },
      );
  };

  const handleDeleteMovieFromRecommendations = (movie) => {
    setLoading(true);
    mainApi.deleteMovie(movie._id, token)
      .then(
        (deletedMovie) => {
          setRecMovies((currentRecMovies) => filterRecList(currentRecMovies, deletedMovie));
        },
      )
      .catch(
        (err) => {
          setLoading(false);
          setInfoTooltipMessage(`Ошибка: ${err.message}`);
          setInfoTooltipPopup(true);
        },
      ).finally(
        () => {
          setLoading(false);
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
    setRecMoviesUpdating(true);
    mainApi.getMovies(token)
      .then(
        (recommendedMoviesData) => {
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
    setMoviesUpdating(true);
    moviesApi.getMovies()
      .then(
        (moviesData) => {
          const normalizedMovies = transformInitalMoviesArray(moviesData);
          setMovies(normalizedMovies);
          localStorage.setItem('movies', JSON.stringify(normalizedMovies));
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
            !storedMovies ? getMovies() : setMovies(storedMovies);
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
            <Login
              onLogin={handleLogin}
              onLoading={isLoading}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              onLoading={isLoading}
            />
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
            onLoading={isLoading}
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
            onLoading={isLoading}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfile}
            onLogout={handleLogout}
            onLoading={isLoading}
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
