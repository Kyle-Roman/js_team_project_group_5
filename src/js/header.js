const refs = {
  homeLink: document.querySelector('#home'),
  myLibraryLink: document.querySelector('#my-library'),
  searchForm: document.querySelector('#search-form'),
  btnContainer: document.querySelector('#btn-container__library'),
};

console.log(refs.myLibraryLink);
refs.myLibraryLink.addEventListener('click', onLibraryClick);

function onLibraryClick() {
  refs.homeLink.classList.remove('current');
  refs.myLibraryLink.classList.add('current');

  refs.searchForm.classList.add('visually-hidden');
  refs.btnContainer.classList.remove('visually-hidden');
}
