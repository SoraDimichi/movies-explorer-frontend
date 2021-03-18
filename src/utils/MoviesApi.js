export default class MoviesApi {
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

  getMovies() {
    return this._fetchData('/beatfilm-movies',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }
}
