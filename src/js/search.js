import MovieApiService from './api-service';
import Notification from './notifications';
import movieCardTpl from '../templates/movie-card.hbs';
import render from './render';

import 'animate.css';

const formRef = document.querySelector('#search-form');

formRef.addEventListener('submit', onSubmit);

const apiService = new MovieApiService();
const notify = new Notification();

async function onSubmit(event) {
  event.preventDefault();

  try {
    const movies = await searchMovies(event.currentTarget.elements.search.value);
    if (!movies.results.length) {
      notify.notFound();
      return;
    }

    render('#gallery', movieCardTpl, movies);
  } catch (e) {
    console.log(e);
  }
}

async function searchMovies(searchQuery, page) {
  if (searchQuery === '') {
    return notify.emptyQuery();
  }

  if (searchQuery !== apiService.query) {
    apiService.resetPage();
  }

  apiService.query = searchQuery;
  apiService.page = page;

  try {
    return await apiService.fetchMovieByQuery(searchQuery);
  } catch (e) {
    console.log(e);
    notify.serverError();
  }
}
