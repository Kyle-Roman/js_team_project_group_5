import MovieApiService from './api-service';
import config from '../data/config.json';
import genres from '../data/genres.json';
import movieCardTpl from '../templates/image-card.hbs';

const galleryRef = document.querySelector('#gallery');
const inputRef = document.querySelector('#search-input');
const buttonRef = document.querySelector('#search-button');

const IMAGE_BASE_URL = config.images.secure_base_url;

buttonRef.addEventListener('click', onSearch);

const apiService = new MovieApiService();

function onSearch() {
  searchMovie(inputRef.value);
}

async function searchMovie(searchQuery) {
  if (searchQuery === '') {
    return;
  }
  apiService.query = searchQuery;

  apiService.resetPage();
  const genresList = genres.genres;

  const movies = await apiService.fetchMovieByQuery(searchQuery);

  const render = movies.results.map(({ id, release_date, title, poster_path, genre_ids }) => {
    const genresNamed = genresList
      .filter(genre => genre_ids.includes(genre.id))
      .map(genre => genre.name)
      .join(', ');
    console.log(genresNamed);

    return {
      id,
      release_date: release_date.slice(0, 4),
      title,
      posterURL: `${IMAGE_BASE_URL}w500${poster_path}`,
      genre_ids: genresNamed,
    };
  });

  renderMovies(render);
}

function renderMovies(movies) {
  galleryRef.innerHTML = movieCardTpl(movies);
}
