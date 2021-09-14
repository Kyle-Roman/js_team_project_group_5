import Initialize from './pagination';
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
  clearBtn: document.querySelector('#clear-container'),
  loadMoreBtn: document.querySelector('.load-more-container'),
  paginationContainer: document.querySelector('.pagination-buttons'),
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
  refs.paginationContainer.classList.add('visually-hidden');
  // refs.clearBtn.classList.remove('visually-hidden');
  refs.loadMoreBtn.classList.add('visually-hidden');

  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');

  getWatched();
}

function onHomeClick() {
  refs.myLibraryLink.classList.remove('current');
  refs.homeLink.classList.add('current');

  refs.searchForm.classList.remove('visually-hidden');
  refs.btnContainer.classList.add('visually-hidden');
  refs.loadMoreBtn.classList.remove('visually-hidden');
  Initialize();
  if (refs.paginationContainer.classList.contains('visually-hidden')) {
    refs.paginationContainer.classList.remove('visually-hidden');
  }

  refs.gallery.innerHTML = '';

  Initialize();
}

function onQueueBtnClick() {
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.add('active');
  getQueued();
}

function onWatchedBtnClick() {
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');
  getWatched();
}
