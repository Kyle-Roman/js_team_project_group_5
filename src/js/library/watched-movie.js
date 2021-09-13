import moviesTpl from '../../templates/library_movie-card.hbs';

import ApiService from '../api-service';

const API_KEY = '838a1c7309b989baab596bfe84b6d2d8';
const BASE_URL = 'https://api.themoviedb.org/3';
//console.log(localStorage.getItem('queued'));

const refs = {
  gallery: document.querySelector('.gallery'),
};

const apiService = new ApiService();

const libraryBtn = document.getElementById('my-library');

libraryBtn.addEventListener('click', onBtnLibraryClick);

function onBtnLibraryClick(e) {
  e.preventDefault();
  getMovieById();
}

function getMovieById() {
  const watchedMovieListId = JSON.parse(localStorage.getItem('watched'));
  clearGallery();

  const infoM = watchedMovieListId.forEach(function fetchMovieById2(id) {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(r =>
      r.json().then(movieInfo => {
        console.log(movieInfo);

        // console.log(
        //   movieInfo.id,
        //   movieInfo.release_date,
        //   movieInfo.title,
        //   movieInfo.poster_path,
        //   movieInfo.genres,
        //   movieInfo.vote_average,
        // );
        refs.gallery.insertAdjacentHTML('beforeend', moviesTpl(movieInfo));
        return movieInfo;
      }),
    );
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
