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
  } catch {
    return console.error();
  }
}

async function openModal(ev) {
  ev.preventDefault();
  // ev.target.nodeName === 'IMG' ||
  if (ev.target.closest('li')) {
    await getInfoAndRenderMarkup(ev.target.closest('li').dataset.id);
    refs.modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    refs.modal.classList.add('animated');
    close.addEventListener('click', closeModalWindow);
  }
  return;
}

function closeModalWindow(ev) {
  refs.modal.style.display = 'none';
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
