import ApiService from './api-service';
import modalMovieTpl from '../templates/modal-markup.hbs';
import render from './render';
import refs from './refs';

const apiService = new ApiService();

// const modalContent = document.querySelector('.modal_content');
const filmField = document.querySelector('#film-info');
const close = document.querySelector('.close_modal_window');

refs.galleryList.addEventListener('click', openModal);
window.addEventListener('click', onWindowClick);
window.addEventListener('keydown', closeModalWindowOnEsc);

async function getInfoAndRenderMarkup(id) {
  try {
    // const film = await apiService.fetchMovieById(id);
    // filmField.innerHTML = modalMovieTpl(film);
    const movie = await apiService.fetchMovieById2(id);
    render('#film-info', modalMovieTpl, movie, 1);
    localStorage.setItem('movie_id', id)
  } catch {
    return console.error();
  }
}

async function openModal(ev) {
  ev.preventDefault();
  if (ev.target.closest('li')) {
    await getInfoAndRenderMarkup(ev.target.closest('li').dataset.id);
    modalToggle();
    refs.modal.classList.add('animated');
    close.addEventListener('click', closeModalWindow);
  }
  return;
}

function closeModalWindow(ev) {
  modalToggle();
  close.removeEventListener('click', closeModalWindow);
}

function modalToggle() {
  refs.modal.classList.toggle('visually-hidden');
  document.body.classList.toggle('modal-open');
}

function closeModalWindowOnEsc(ev) {
  if (ev.code === 'Escape') {
    closeModalWindow();
  }
}

function onWindowClick(ev) {
  if (ev.target == refs.modal) {
    closeModalWindow();
  }
}
// -----------Local Storage----------------

const modal = document.getElementById('myModal');
modal.addEventListener('click', myLibrarySet);


function myLibrarySet(e) {
  // localStorage.clear()
  const modalButton = e.target;
  const movieId = localStorage.getItem('movie_id');

  let watchedSet = [];
  let queuedSet = [];

  watchedSet = JSON.parse(localStorage.getItem('watched')) || [];
  queuedSet = JSON.parse(localStorage.getItem('queued')) || [];

  if (modalButton.id === 'watched-button') {

    watchedSet.push(movieId.toString());
    localStorage.setItem('watched', JSON.stringify(watchedSet));

  } else if (modalButton.id === 'queue-button') {

    queuedSet.push(movieId.toString());
    localStorage.setItem('queued', JSON.stringify(queuedSet))
  }
};
