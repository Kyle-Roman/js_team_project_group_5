import MovieApiService from './api-service';
import movieCardTpl from '../templates/movie-card.hbs';

import 'animate.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('#gallery');

formRef.addEventListener('submit', onSubmit);

const apiService = new MovieApiService();

function onSubmit(event) {
  event.preventDefault();

  searchMovies(event.currentTarget.elements.search.value);
}

async function searchMovies(searchQuery) {
  if (searchQuery === '') {
    return;
  }

  apiService.query = searchQuery;
  apiService.resetPage();

  const IMAGE_BASE_URL = localStorage.getItem('img_base_url');
  const genresList = JSON.parse(localStorage.getItem('genres')).genres;

  try {
    const movies = await apiService.fetchMovieByQuery(searchQuery);
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

    renderMovies(moviesProcessed);
  } catch (error) {
    console.log(error);
  }
}

function renderMovies(movies) {
  galleryRef.innerHTML = movieCardTpl(movies);
}
