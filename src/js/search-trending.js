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
  hidden: false,
});

loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  loadMoreBtn.disable();

  if (apiService.searchQuery === '') {
    await getTrending('day');
    loadMoreBtn.enable();

    return;
  }

  const movies = await searchMovies(apiService.searchQuery);
  render('#gallery', movieCardTpl, movies);

  if (movies.results.length < 20) {
    loadMoreBtn.hide();
  }
  loadMoreBtn.enable();
}

async function onSearchFormSubmit(event) {
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
    if (movies.results.length < 19) {
      loadMoreBtn.hide();
    }

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
