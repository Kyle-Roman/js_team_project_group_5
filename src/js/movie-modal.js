import functionName from './api-service';
// import templateName from '../hbs/modal.hbs';

const modal = document.getElementById('myModal');
const btn = document.getElementById('btn_modal_window');
const close = document.getElementsByClassName('close_modal_window')[0];

btn.addEventListener('click', onCardClick);
close.addEventListener('click', closeModalWindow);
window.addEventListener('click', onWindowClick);

function onCardClick(ev) {
  ev.preventDefault();
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

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
