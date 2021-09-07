const API_KEY = '838a1c7309b989baab596bfe84b6d2d8';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class ApiService {
  constructor() {
    this.query = '';
    this.period = 'day';
    this.page = 1;
  }

  async getConfig() {
    const response = await fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`);
    return await response.json();
  }

  async fetchGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return await response.json();
  }

  async fetchTrending() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      page: this.page,
    });

    const url = `${BASE_URL}/trending/movie/${this.period}?${searchParams}`;

    const response = await fetch(url);
    return await response.json();
  }

  async fetchMovieByQuery() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: this.query,
      include_adult: false,
      page: this.page,
    });

    const url = `${BASE_URL}/search/movie?${searchParams}`;

    const response = await fetch(url);
    return await response.json();
  }

  // async fetchMovieById(id) {
  //   const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  //   return await response.json();
  // }
  fetchMovieById(id) {
    return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(result => ({
        ...result,
        release_date: result.release_date ? result.release_date.slice(0, 4) : 'Date unknown',
      }));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
