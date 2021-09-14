// import MovieApiService from './api-service';
import apiService from '..';
import Notification from './notifications';
import movieCardTpl from '../templates/movie-card.hbs';
import render from './render';

import 'animate.css';

const formRef = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more-button');

formRef.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// const apiService = new MovieApiService();
const notify = new Notification();

async function onLoadMoreBtnClick() {
  if (apiService.searchQuery === '') {
    getTrending('day');
    return;
  }

  const results = await searchMovies(apiService.searchQuery);
  render('#gallery', movieCardTpl, results);
}

async function onSubmit(event) {
  event.preventDefault();

  try {
    const movies = await searchMovies(event.currentTarget.elements.search.value);
    if (!movies.results.length) {
      notify.notFound();
      return;
    }

    document.querySelector('#gallery').innerHTML = '';
    render('#gallery', movieCardTpl, movies);
  } catch (e) {
    console.log(e);
  }
}

async function getTrending(period) {
  apiService.period = period;

  try {
    const movies = await apiService.fetchTrending();
    render('#gallery', movieCardTpl, movies);
  } catch (e) {
    console.log(e);
  }
}

async function searchMovies(searchQuery) {
  if (searchQuery === '') {
    return notify.emptyQuery();
  }

  if (searchQuery !== apiService.searchQuery) {
    apiService.resetPage();
  }

  apiService.searchQuery = searchQuery;

  try {
    return await apiService.fetchMovieByQuery(searchQuery);
  } catch (e) {
    console.log(e);
    notify.serverError();
  }
}

export { getTrending, searchMovies };
