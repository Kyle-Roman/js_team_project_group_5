import moviesTpl from '../../templates/library_movie-card.hbs';

const API_KEY = '838a1c7309b989baab596bfe84b6d2d8';
const BASE_URL = 'https://api.themoviedb.org/3';
//console.log(localStorage.getItem('queued'));

const watchedMovieListId = JSON.parse(localStorage.getItem('watched'));

const libraryBtn = document.getElementById('my-library');

libraryBtn.addEventListener('click', onBtnLibraryClick);

function onBtnLibraryClick(e) {
  e.preventDefault();
  getMovieId();
}

function getMovieId() {
  watchedMovieListId.forEach(function fetchMovieById2(id) {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(r =>
      r.json().then(data => {
        console.log(data);
      }),
    );
  });
}
