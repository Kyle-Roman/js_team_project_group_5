import ApiService from './api-service';
// import getTrending from './trending-re';
import searchMovies from './search-trending';

// console.log(ApiService);

const apiService = new ApiService();

const loadMoreBtn = document.querySelector('#load-more-button');
// console.log(loadMoreBtn);
loadMoreBtn.addEventListener('click', onClick);

async function onClick() {
  apiService.incrementPage();
  searchMovies('day');
}
