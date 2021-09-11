import MovieApiService from './api-service';
// import Notification from './notifications';
import movieCardTpl from '../templates/movie-card.hbs';
import render from './render';

import 'animate.css';

const apiService = new MovieApiService();
// const notify = new Notification();

export default async function getTrending(period) {
  apiService.period = period;

  try {
    const movies = await apiService.fetchTrending();

    render('#gallery', movieCardTpl, movies);
  } catch (e) {
    console.log(e);
  }
}
