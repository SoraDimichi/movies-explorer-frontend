export const MOVIES_API_URL = 'https://api.nomoreparties.co';
export const MAIN_API_URL = 'http://localhost:3333';
const VIDEO_404_URL = 'https://youtu.be/dQw4w9WgXcQ';
const IMAGE_404_URL = 'https://i.ibb.co/Ws2T0Lv/image-not-found.jpg';
export const isLoginLoading = 'isLoginLoading';

export const transformInitalMoviesArray = (moviesData) => {
  const newMovieArr = [];
  moviesData.forEach((movie) => {
    const newMovie = {
      movieId: movie.id,
      country: (!movie.country)
        ? 'undefined' : movie.country,
      director: (!movie.director)
        ? 'undefined' : movie.director,
      duration: (!movie.duration)
        ? 0 : movie.duration,
      year: (!movie.year)
        ? 'undefined' : movie.year,
      description: (!movie.description)
        ? 'undefined' : movie.description,
      nameRU: (!movie.nameRU)
        ? 'undefined' : movie.nameRU,
      nameEN: (!movie.nameEN)
        ? 'undefined' : movie.nameEN,
      image: (!movie.image || !movie.image.url)
        ? IMAGE_404_URL : `${MOVIES_API_URL}${movie.image.url}`,
      trailer: (
        !movie.trailerLink || !movie.trailerLink.includes('http')
      )
        ? VIDEO_404_URL : movie.trailerLink,
      thumbnail: (!movie.image
        || !movie.image.url
        || !movie.image.formats
        || !movie.image.formats.thumbnail.url
      )
        ? IMAGE_404_URL : `${MOVIES_API_URL}${
          movie.image.formats.thumbnail.url || movie.image.url
        }`,
    };
    newMovieArr.push(newMovie);
  });
  return newMovieArr;
};

export const updateRecList = (currentRecMovies, res) => [...currentRecMovies, res]
  .sort((a, b) => a.movieId - b.movieId);

export const filterRecList = (currentRecMovies, res) => currentRecMovies
  .filter(({ movieId }) => movieId !== res.movieId)
  .sort((a, b) => a.movieId - b.movieId);

export const normalizeSearchString = (rawStr) => rawStr?.trim().toLowerCase() ?? '';

export const setInitialLikeState = ({ movieId } = {}, recMovies) => (recMovies && recMovies.length
  ? recMovies.some(({ movieId: recMovieId }) => recMovieId === movieId)
  : false);

// export const setInitialLikeState = (movie, recMovies) => {
//   if (recMovies !== undefined) {
//     let i = 0;
//     let isLiked;
//     while (i < recMovies.length && isLiked === undefined) {
//       if (movie.movieId === recMovies[i].movieId) {
//         isLiked = true;
//       }
//       i++;
//     }
//     return isLiked;
//   }
//   return false;
// };

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  if (hours === 0) {
    return `${minutes}м`;
  }
  return `${hours}ч ${minutes}м`;
};

export const findRecMovieByMovieId = (movieId, movieArr) => {
  let i = 0;
  let id;
  while (i < movieArr.length && id === undefined) {
    if (movieId === movieArr[i].movieId) {
      id = movieArr[i]._id;
    }
    i++;
  }
  return id;
};
