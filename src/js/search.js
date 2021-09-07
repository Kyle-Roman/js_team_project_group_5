import MovieApiService from './api-service';
import config from '../data/config.json';
import genres from '../data/genres.json';
import movieCardTpl from '../templates/movie-card.hbs';

const IMAGE_BASE_URL = config.images.secure_base_url;

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
  const genresList = genres.genres;

  try {
    const movies = await apiService.fetchMovieByQuery(searchQuery);
    const moviesProcessed = movies.results.map(
      ({ id, release_date, title, poster_path, genre_ids }) => {
        const genresNamed = genresList
          .filter(genre => genre_ids.includes(genre.id))
          .map(genre => genre.name)
          .join(', ');

        return {
          id,
          release_date: release_date.slice(0, 4),
          title,
          posterURL: `${IMAGE_BASE_URL}w500${poster_path}`,
          genres: genresNamed,
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
