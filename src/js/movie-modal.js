import ApiService from './api-service';
import modalMovieTpl from '../templates/modal-markup.hbs';
import render from './render';

const apiService = new ApiService();

const modal = document.getElementById('myModal');
const galleryList = document.getElementById('gallery');
// const modalContent = document.querySelector('.modal_content');
const filmField = document.querySelector('#film-info');

// const btn = document.getElementById('btn_modal_window');
const close = document.querySelector('.close_modal_window');

galleryList.addEventListener('click', openModal);
// btn.addEventListener('click', openModal);
close.addEventListener('click', closeModalWindow);
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
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    modal.classList.add('animated');
  }
  return;
}

function closeModalWindow(ev) {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

function closeModalWindowOnEsc(ev) {
  if (ev.code === 'Escape') {
    closeModalWindow();
    // window.removeEventListener('keydown', closeModalWindowOnEsc);
  }
}

function onWindowClick(ev) {
  if (ev.target == modal) {
    closeModalWindow();
    // window.removeEventListener('click', onWindowClick);
  }
}
