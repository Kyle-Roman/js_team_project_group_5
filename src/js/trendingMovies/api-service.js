//const Handlebars = require('Handlebars');
const API_KEY = '838a1c7309b989baab596bfe84b6d2d8';
const BASE_URL = 'https://api.themoviedb.org/3';
export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.period = 'day';
  }

  fetchMovies(page = 1) {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      page: this.page,
    });

    const url = `${BASE_URL}/trending/movie/${this.period}?api_key=${API_KEY}&language=en-US&page=${page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        // this.incrementPage();

        data.results.forEach(function (element) {
          const release_date = element['release_date'].slice(0, 4);
          return release_date;
        });

        return data;
      });
  }

  async fetchGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return await response.json();
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
