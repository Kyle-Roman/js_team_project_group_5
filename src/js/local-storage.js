import MovieApiService from './api-service';
import modalCard from '../templates/modal-markup.hbs';
import dataList from '../js/pre-render';

const apiService = new MovieApiService();

export default async function setBaseConfig() {
  if (!localStorage.getItem('img_base_url')) {
    try {
      const config = await apiService.getConfig();
      localStorage.setItem('img_base_url', config.images.secure_base_url);
    } catch (error) {
      console.log(error);
    }
  }

  if (!localStorage.getItem('genres')) {
    try {
      const genres = await apiService.fetchGenres();
      localStorage.setItem('genres', JSON.stringify(genres));
    } catch (error) {
      console.log(error);
    }
  }
}

// const modal = document.getElementById('myModal');
// modal.addEventListener('click', myLibrarySet);

// async function myLibrarySet(id) {
//   try {
//     const movie = await apiService.fetchMovieById2(id);
//     const modalButton = e.target;
//     if (modalButton.id === 'watched-button') {
//       const movieId = modalCard.id;
//       addToWatched();
//       apiService.fetchMovieById2(movieId).then(console.log(movieId))

//       addToWatched(movieId);
//     } else if (modalButton.id === 'queue-button') {
//       addToQueue();
//     }
//   } catch {
//     return console.error();
//   }
// };

// async function myLibrarySet(id) {
//   try {
//     const movie = await apiService.fetchMovieById2(id);
//     const modalButton = e.target;
//     if (modalButton.id === 'watched-button') {
//       // const movieId = modalCard.id;
//       addToWatched();
//       // apiService.fetchMovieById2(movieId).then(console.log(movieId))

//       // addToWatched(movieId);
//     } else if (modalButton.id === 'queue-button') {
//       addToQueue();
//     }
//   } catch {
//     return console.error();
//   }
// };

