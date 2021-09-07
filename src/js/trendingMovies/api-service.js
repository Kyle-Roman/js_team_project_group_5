//const Handlebars = require('Handlebars');
export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.period = 'day';
  }

  fetchMovies() {
    const API_KEY = '838a1c7309b989baab596bfe84b6d2d8';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      page: this.page,
    });

    const url = `${BASE_URL}/trending/movie/${this.period}?${searchParams}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();

        console.log(data.results);

        data.results.forEach(function (element) {
          console.log(element['release_date'].slice(0, 4));
          const release_date = element['release_date'].slice(0, 4);
          return release_date;
        });

        return data.results;
      });
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
