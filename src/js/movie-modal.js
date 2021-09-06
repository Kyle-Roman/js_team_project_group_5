import ApiService from './api-service';
import modalMovieTpl from '../templates/modal-markup.hbs';

const apiService = new ApiService();

const modal = document.getElementById('myModal');
const galleryList = document.getElementById('gallery');
// const modalContent = document.querySelector('.modal_content');
const filmField = document.querySelector('#film-info');

const btn = document.getElementById('btn_modal_window');
const close = document.querySelector('.close_modal_window');

galleryList.addEventListener('click', openModal);
btn.addEventListener('click', openModal);
close.addEventListener('click', closeModalWindow);
window.addEventListener('click', onWindowClick);
window.addEventListener('keydown', closeModalWindowOnEsc);

async function getFullMovieInfo(id) {
  try {
    const film = await apiService.fetchMovieById(id);
    console.log(film);
    filmField.innerHTML = modalMovieTpl(film);
  } catch {
    return console.error();
  }
}

async function openModal(ev) {
  ev.preventDefault();
  if (ev.target.nodeName === 'IMG' || ev.target.nodeName === 'BUTTON') {
    await getFullMovieInfo(ev.target.dataset.id);
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  }
  return;
}

// modal.style.display = 'flex';
// document.body.classList.add('modal-open');

// function openModal(ev) {
//   ev.preventDefault();
//   let id = ev.target.dataset.action;
//   if (ev.target.nodeName !== 'IMG') {
//     return;
//   }
//   getFullMovieInfo(id);

// modal.style.display = 'flex';
// document.body.classList.add('modal-open');
// }

// function createModalMovieMarkup(tempModalData) {
//   return tempModalData.map(modalMovieTpl).join('');
// }

// function renderModalMarkup(tempModalData) {
//   const markup = createModalMovieMarkup(tempModalData);
//   modalContent.innerHTML = markup;
// }

function closeModalWindow(ev) {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  btn.removeEventListener('click', closeModalWindow);
}

function closeModalWindowOnEsc(ev) {
  if (ev.code === 'Escape') {
    closeModalWindow();
    window.removeEventListener('keydown', closeModalWindowOnEsc);
  }
}

function onWindowClick(ev) {
  if (ev.target == modal) {
    closeModalWindow();
    window.removeEventListener('click', onWindowClick);
  }
}

// import functionName from './api-service';
// // import templateName from '../hbs/modal.hbs';

// const modal = document.getElementById('myModal');
// const btn = document.getElementById('btn_modal_window');
// const close = document.getElementsByClassName('close_modal_window')[0];

// btn.addEventListener('click', openModal);
// close.addEventListener('click', closeModalWindow);
// window.addEventListener('click', onWindowClick);

// function openModal(ev) {
//   ev.preventDefault();
//   modal.style.display = 'flex';
//   document.body.classList.add('modal-open');
// }

// function closeModalWindow(ev) {
//   modal.style.display = 'none';
//   document.body.classList.remove('modal-open');
// }

// function onWindowClick(ev) {
//   if (ev.target == modal) {
//     closeModalWindow();
//   }
// }

// window.addEventListener(
//   'keydown',
//   function (event) {
//     if (event.code === 'Escape') {
//       closeModalWindow();
//     }
//     return;
//   },
//   true,
// );
