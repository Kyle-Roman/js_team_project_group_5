import '../../sass/main.scss';
import 'animate.css';

import MoviesApiService from './api';

import moviesTpl from '../../templates/movie-card.hbs';

const refs = {
  gallery: document.querySelector('.gallery'),
};

const moviesApiService = new MoviesApiService();

function fetchTrendingMovies(e) {
  clearGallery();

  const IMAGE_BASE_URL = localStorage.getItem('img_base_url');
  const genresList = JSON.parse(localStorage.getItem('genres')).genres;

  moviesApiService.fetchMovies().then(results => {
    const moviesProcessed = results.map(
      ({ id, release_date, title, poster_path, genre_ids, backdrop_path }) => {
        const genresNamed = genresList
          .filter(genre => genre_ids.includes(genre.id))
          .map(genre => genre.name);
        //join(',');
        if (backdrop_path === null) {
          return {
            id,
            release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
            title: `${title.slice(0, 50)} ...`,
            posterURL:
              'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
            genres: genresNamed,
          };
        }
        if (genresNamed.length > 3) {
          // console.log(`${genresNamed[0]}, ${genresNamed[1]}, Other`);

          return {
            id,
            release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
            title: `${title.slice(0, 50)} ...`,
            posterURL: `${IMAGE_BASE_URL}w500${poster_path}`,
            genres: `${genresNamed[0]}, ${genresNamed[1]}, Other`,
          };

          //   //   console.log(genresNamed.slice(0, 18));
          //   //   genresNamed.slice(20);
        } else if ((genresNamed.length = 2)) {
          // console.log(`${genresNamed[0]}, ${genresNamed[1]}`);

          return {
            id,
            release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
            title: `${title.slice(0, 50)} ...`,
            posterURL: `${IMAGE_BASE_URL}w500${poster_path}`,
            genres: `${genresNamed[0]}, ${genresNamed[1]}`,
          };
        } else if ((genresNamed.length = 1)) {
          // console.log(`${genresNamed[0]}`);

          return {
            id,
            release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
            title: `${title.slice(0, 50)} ...`,
            posterURL: `${IMAGE_BASE_URL}w500${poster_path}`,
            genres: `${genresNamed[0]}`,
          };
        }
        // console.log(genresNamed);
      },
    );
    moviesApiService.resetPage();
    appendMoviesMarkup(moviesProcessed);
  });
}

// fetchTrendingMovies();

function appendMoviesMarkup(movie) {
  refs.gallery.insertAdjacentHTML('beforeend', moviesTpl(movie));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
