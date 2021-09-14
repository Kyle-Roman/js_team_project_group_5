import MovieApiService from './api-service';
import Notification from './notifications';
import modalCard from '../templates/modal-markup.hbs';
import getQueued from './library/queued-movie.js';
import getWatched from './library/watched-movie.js';

const apiService = new MovieApiService();
const notify = new Notification();
const pagination = document.querySelector('.pagination-buttons');
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
console.log(pagination);
const modal = document.getElementById('myModal');
modal.addEventListener('click', myLibrarySet);

function myLibrarySet(e) {
  // localStorage.clear()
  const modalButton = e.target;

  // let watchedSet = [];
  // let queuedSet = [];

  // watchedSet = JSON.parse(localStorage.getItem('watched')) || [];
  // queuedSet = JSON.parse(localStorage.getItem('queued')) || [];

  const watchedSet = getWatchedSet();
  const queuedSet = getQueuedSet();

  const movieId = localStorage.getItem('movie_id');

  if (modalButton.id === 'watched-button') {
    if (!watchedSet.includes(movieId)) {
      addElementToLocalStorage(watchedSet, 'watched', movieId);
      modalButton.textContent = 'remove from watched';
      if (pagination.classList.contains('visually-hidden')) {
        getWatched();
      }

      notify.successfullyAddedToWatched();
    } else {
      removeFromLocalStorage(watchedSet, 'watched', movieId);
      modalButton.textContent = 'add to watched';
      if (pagination.classList.contains('visually-hidden')) {
        getWatched();
      }
      notify.successfullyRemovedFromWatched();
    }
  } else if (modalButton.id === 'queue-button') {
    if (!queuedSet.includes(movieId)) {
      addElementToLocalStorage(queuedSet, 'queued', movieId);
      modalButton.textContent = 'remove from queue';
      notify.successfullyAddedToQueue();
      if (pagination.classList.contains('visually-hidden')) {
        getQueued();
      }
    } else {
      removeFromLocalStorage(queuedSet, 'queued', movieId);
      modalButton.textContent = 'add to queue';
      notify.successfullyRemovedFromQueue();
      if (pagination.classList.contains('visually-hidden')) {
        getQueued();
      }
    }
  }
}

function removeFromLocalStorage(currentSet, storageItem, elemId) {
  const elemIndex = currentSet.indexOf(elemId);
  currentSet.splice(elemIndex, 1);
  localStorage.removeItem(storageItem);
  localStorage.setItem(storageItem, JSON.stringify(currentSet));
}

function addElementToLocalStorage(currentSet, storageItem, elemId) {
  currentSet.push(elemId.toString());
  localStorage.setItem(storageItem, JSON.stringify(currentSet));
}

function getWatchedSet() {
  if (localStorage.getItem('watched') !== null) {
    return JSON.parse(localStorage.getItem('watched'));
  } else {
    return [];
  }
}

function getQueuedSet() {
  if (localStorage.getItem('queued') !== null) {
    return JSON.parse(localStorage.getItem('queued'));
  } else {
    return [];
  }
}
