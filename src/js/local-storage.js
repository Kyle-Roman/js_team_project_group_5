import MovieApiService from './api-service';
import Notification from './notifications';
import modalCard from '../templates/modal-markup.hbs';

const apiService = new MovieApiService();
const notify = new Notification();

export default async function setBaseConfig() {
  if (!localStorage.getItem('img_base_url')) {
    try {
      const config = await apiService.getConfig();
      localStorage.setItem('img_base_url', config.images.secure_base_url);
    } catch (error) {
      console.log(error);
    }
  }

  if (!localStorage.getItem('genres')) {
    try {
      const genres = await apiService.fetchGenres();
      localStorage.setItem('genres', JSON.stringify(genres));
    } catch (error) {
      console.log(error);
    }
  }
}

const modal = document.getElementById('myModal');
modal.addEventListener('click', myLibrarySet);

function myLibrarySet(e) {
  // localStorage.clear()
  const modalButton = e.target;

  let watchedSet = [];
  let queuedSet = [];

  watchedSet = JSON.parse(localStorage.getItem('watched')) || [];
  queuedSet = JSON.parse(localStorage.getItem('queued')) || [];

  const movieId = localStorage.getItem('movie_id');

  if (modalButton.id === 'watched-button') {
    if (watchedSet.includes(movieId)) {
      // return alert('Allready watched!');
      return notify.alreadyWatched();
    } else {
      watchedSet.push(movieId.toString());
      localStorage.setItem('watched', JSON.stringify(watchedSet));
      notify.successfullyAddedToWatched();
    }
  } else if (modalButton.id === 'queue-button') {
    if (queuedSet.includes(movieId)) {
      return notify.alreadyInQueue();
      // return alert('Allready in the queue!');
    } else {
      queuedSet.push(movieId.toString());
      localStorage.setItem('queued', JSON.stringify(queuedSet));
      notify.successfullyAddedToQueue();
    }
  }
}
