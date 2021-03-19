export default class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async _fetchData(path, params) {
    const res = await fetch(`${this._baseUrl}${path}`, params);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.status} \n${data.message}`);
    } else {
      return data;
    }
  }

  getMovies(token) {
    return this._fetchData('/movies',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  }

  createMovie(data, token) {
    return this._fetchData('/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  deleteMovie(movieId, token) {
    return this._fetchData(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  register(data) {
    return this._fetchData('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  login(data) {
    return this._fetchData('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  getMyProfile(token) {
    return this._fetchData('/users/me',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  }

  updateMyProfile(data, token) {
    return this._fetchData('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  checkToken(token) {
    return this._fetchData('/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
