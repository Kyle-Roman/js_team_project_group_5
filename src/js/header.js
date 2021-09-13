import Initialize from './init';

const refs = {
  homeLink: document.querySelector('#home'),
  myLibraryLink: document.querySelector('#my-library'),
  searchForm: document.querySelector('#search-form'),
  btnContainer: document.querySelector('#btn-container__library'),
  gallery: document.querySelector('#gallery'),
};

console.log(refs.myLibraryLink);
refs.myLibraryLink.addEventListener('click', onLibraryClick);
refs.homeLink.addEventListener('click', onHomeClick);

function onLibraryClick() {
  refs.homeLink.classList.remove('current');
  refs.myLibraryLink.classList.add('current');

  refs.searchForm.classList.add('visually-hidden');
  refs.btnContainer.classList.remove('visually-hidden');
}

function onHomeClick() {
  refs.myLibraryLink.classList.remove('current');
  refs.homeLink.classList.add('current');

  refs.searchForm.classList.remove('visually-hidden');
  refs.btnContainer.classList.add('visually-hidden');

  refs.gallery.innerHTML = '';

  Initialize();
}
