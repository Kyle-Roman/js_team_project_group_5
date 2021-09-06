import '../../sass/main.scss';
import 'animate.css';

import MoviesApiService from '../trendingMovies/api-service';

import moviesTpl from '../../templates/image-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.btn-search-form'),
  gallery: document.querySelector('.gallery'),
};

const moviesApiService = new MoviesApiService();

function fetchTrendingMovies(e) {
  clearGallery();

  moviesApiService.resetPage();
  moviesApiService.fetchMovies().then(results => {
    appendMoviesMarkup(results);
    scroll();
  });
}

fetchTrendingMovies();

function appendMoviesMarkup(results) {
  refs.gallery.insertAdjacentHTML('beforeend', moviesTpl(results));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scroll() {
  // const element = document.getElementById('moreBtn');
  // console.log(element);
  // element.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end',
  // });
}
