import Initialize from './init';
import getWatched from './library/watched-movie';
import getQueued from './library/queued-movie';

const refs = {
  homeLink: document.querySelector('#home'),
  myLibraryLink: document.querySelector('#my-library'),
  searchForm: document.querySelector('#search-form'),
  btnContainer: document.querySelector('#btn-container__library'),
  gallery: document.querySelector('#gallery'),
  watchedBtn: document.querySelector('#btn-watched'),
  queueBtn: document.querySelector('#btn-queue'),
};

refs.myLibraryLink.addEventListener('click', onLibraryClick);
refs.homeLink.addEventListener('click', onHomeClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onLibraryClick() {
  refs.homeLink.classList.remove('current');
  refs.myLibraryLink.classList.add('current');

  refs.searchForm.classList.add('visually-hidden');
  refs.btnContainer.classList.remove('visually-hidden');

  getWatched();
}

function onHomeClick() {
  refs.myLibraryLink.classList.remove('current');
  refs.homeLink.classList.add('current');

  refs.searchForm.classList.remove('visually-hidden');
  refs.btnContainer.classList.add('visually-hidden');

  refs.gallery.innerHTML = '';

  Initialize();
}

function onQueueBtnClick() {
  getQueued();
}

function onWatchedBtnClick() {
  getWatched();
}
