import ApiService from './api-service';
import modalMovieTpl from '../templates/modal-markup.hbs';
import render from './render';
import refs from './refs';
import myLibrarySet from './local-storage';

const apiService = new ApiService();

const modalContent = document.querySelector('.modal_content');
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
    localStorage.setItem('movie_id', id);

    const watchedSet = JSON.parse(localStorage.getItem('watched'));
    const queuedSet = JSON.parse(localStorage.getItem('queued'));
    const watchedBtn = document.querySelector('.watched-button');
    const queueBtn = document.querySelector('.queue-button');
    console.log(watchedSet);

    if (watchedSet) {
      if (watchedSet.includes(id)) {
        watchedBtn.textContent = 'remove from watched';
      }
    }

    if (queuedSet) {
      if (queuedSet.includes(id)) {
        queueBtn.textContent = 'remove from queue';
      }
    }
  } catch {
    return console.error();
  }
}

async function openModal(ev) {
  ev.preventDefault();
  if (ev.target.closest('li')) {
    await getInfoAndRenderMarkup(ev.target.closest('li').dataset.id);
    refs.modal.classList.add('show');
    modalContent.classList.add('show');
    document.body.classList.add('modal-open');
    close.addEventListener('click', closeModalWindow);
  }
  return;
}

function closeModalWindow(ev) {
  refs.modal.classList.remove('show');
  modalContent.classList.remove('show');
  document.body.classList.remove('modal-open');
  close.removeEventListener('click', closeModalWindow);
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
