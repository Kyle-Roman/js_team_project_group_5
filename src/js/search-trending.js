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

async function onLoadMoreBtnClick() {
  loadMoreBtn.disable();

  if (apiService.searchQuery === '') {
    const trending = await getTrending('day');
    showTrendingMovies(trending);
    loadMoreBtn.enable();

    return;
  }

  const found = await searchMovies(apiService.searchQuery);
  if (found.results.length < 1) {
    notify.nothingToShow();
    loadMoreBtn.enable();
    // loadMoreBtn.hide();
    loadMoreBtn.refs.button.disable;

    return;
  }
  showFoundMovies(found);
  loadMoreBtn.enable();
}

async function onSearchFormSubmit(event) {
  event.preventDefault();
  apiService.resetPage();

  try {
    const movies = await searchMovies(event.currentTarget.elements.search.value);
    if (!movies.results.length) {
      notify.notFound();
      return;
    }

    document.querySelector('#gallery').innerHTML = '';
    // render('#gallery', movieCardTpl, movies);
    showFoundMovies(movies);
  } catch (e) {
    console.log(e);
  }
}

async function searchMovies(searchQuery) {
  if (searchQuery === '') {
    return notify.emptyQuery();
  }

  apiService.searchQuery = searchQuery;

  try {
    return await apiService.fetchMovieByQuery(searchQuery);
  } catch (e) {
    console.log(e);
    notify.serverError();
  }
}

function showFoundMovies(movies) {
  render('#gallery', movieCardTpl, movies);
  loadMoreBtn.show();
}

function showTrendingMovies(movies) {
  render('#gallery', movieCardTpl, movies);
  loadMoreBtn.show();
}

async function getTrending(period) {
  apiService.period = period;

  try {
    return await apiService.fetchTrending();
  } catch (e) {
    console.log(e);
  }
}

export { getTrending, searchMovies, showTrendingMovies };
