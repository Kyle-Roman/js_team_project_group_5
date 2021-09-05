import ApiService from './api-service';
import modalMovieTpl from '../templates/modal-markup.hbs';

const apiService = new ApiService();

const modal = document.getElementById('myModal');
const galleryList = document.getElementById('gallery');
const modalContent = document.querySelector('.modal_content');
// const btn = document.getElementById('btn_modal_window');
const close = document.getElementsByClassName('close_modal_window')[0];
const modalMarkup = modalMovieTpl();

galleryList.addEventListener('click', onCardClick);
// btn.addEventListener('click', onCardClick);
close.addEventListener('click', closeModalWindow);
window.addEventListener('click', onWindowClick);

function getFullMovieInfo(id) {
  apiService.fetchMovieById(id).then(movieInfo => {
    const markup = modalMovieTpl(movieInfo);
    const modal = modalContent.create(markup);
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  });
}

function onCardClick(ev) {
  ev.preventDefault();
  let id = e.target.dataset.action;
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  getFullMovieInfo(id);

  // modal.style.display = 'flex';
  // document.body.classList.add('modal-open');
}

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
}

function onWindowClick(ev) {
  if (ev.target == modal) {
    closeModalWindow();
  }
}

window.addEventListener(
  'keydown',
  function (event) {
    if (event.code === 'Escape') {
      closeModalWindow();
    }
    return;
  },
  true,
);

// import functionName from './api-service';
// // import templateName from '../hbs/modal.hbs';

// const modal = document.getElementById('myModal');
// const btn = document.getElementById('btn_modal_window');
// const close = document.getElementsByClassName('close_modal_window')[0];

// btn.addEventListener('click', onCardClick);
// close.addEventListener('click', closeModalWindow);
// window.addEventListener('click', onWindowClick);

// function onCardClick(ev) {
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
