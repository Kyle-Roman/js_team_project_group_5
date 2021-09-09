import MovieApiService from './api-service';
import movieCardTpl from '../templates/movie-card.hbs';

import 'animate.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('#gallery');

formRef.addEventListener('submit', onSubmit);

const apiService = new MovieApiService();

async function onSubmit(event) {
  event.preventDefault();

  const movies = await searchMovies(event.currentTarget.elements.search.value);
  const moviesProcessed = processResponse(movies);
  renderMovies(moviesProcessed);
}

async function searchMovies(searchQuery, page) {
  if (searchQuery === '') {
    return;
  }

  if (searchQuery !== apiService.query) {
    apiService.resetPage();
  }

  apiService.query = searchQuery;
  apiService.page = page;

  try {
    return await apiService.fetchMovieByQuery(searchQuery);
  } catch (error) {
    console.log(error);
  }
}

function processResponse(movies) {
  const IMAGE_BASE_URL = localStorage.getItem('img_base_url');
  const genresList = JSON.parse(localStorage.getItem('genres')).genres;

  const moviesProcessed = movies.results.map(
    ({ id, release_date, title, poster_path, genre_ids }) => {
      const genresNamed = genresList
        .filter(genre => genre_ids.includes(genre.id))
        .map(genre => genre.name);

      return {
        id,
        release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
        title,
        posterURL: poster_path ? `${IMAGE_BASE_URL}w500${poster_path}` : '',
        genres:
          genresNamed.length > 2
            ? genresNamed.slice(0, 2).concat('Other').join(', ')
            : genresNamed.join(', '),
      };
    },
  );

  return moviesProcessed;
}

function renderMovies(movies) {
  galleryRef.innerHTML = movieCardTpl(movies);
}

export { searchMovies, processResponse, renderMovies };
