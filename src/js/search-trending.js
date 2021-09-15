import apiService from '..';
import Notification from './notifications';
import movieCardTpl from '../templates/movie-card.hbs';
import LoadMoreBtn from './load-more';
import render from './render';

import 'animate.css';

const formRef = document.querySelector('#search-form');

formRef.addEventListener('submit', onSearchFormSubmit);

const notify = new Notification();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#load-more-button',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  if (!event.currentTarget.elements.search.value) {
    return notify.emptyQuery();
  }

  apiService.resetPage();

  try {
    const movies = await searchMovies(event.currentTarget.elements.search.value);
    if (!movies.results.length) {
      notify.notFound();
      apiService.searchQuery = '';
      return;
    }

    document.querySelector('#gallery').innerHTML = '';
    showMovies(movies);
  } catch (e) {
    console.log(e);
  }
}

async function searchMovies(searchQuery) {
  apiService.searchQuery = searchQuery;

  try {
    return await apiService.fetchMovieByQuery(searchQuery);
  } catch (e) {
    console.log(e);
    notify.serverError();
  }
}

async function onLoadMoreBtnClick() {
  loadMoreBtn.disable();

  if (apiService.searchQuery === '') {
    const trending = await getTrending('day');
    showMovies(trending);
    loadMoreBtn.enable();

    return;
  }

  const found = await searchMovies(apiService.searchQuery);
  if (found.results.length < 1) {
    notify.nothingToShow();
    loadMoreBtn.enable();
    loadMoreBtn.refs.button.disable;

    return;
  }
  showMovies(found);
  loadMoreBtn.enable();
}

async function getTrending(period) {
  apiService.period = period;
  apiService.searchQuery = '';

  try {
    return await apiService.fetchTrending();
  } catch (e) {
    console.log(e);
  }
}

function showMovies(movies) {
  render('#gallery', movieCardTpl, movies);
  loadMoreBtn.show();
}

export { getTrending, searchMovies, showMovies };
