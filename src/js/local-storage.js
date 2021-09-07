import MovieApiService from './api-service';

const apiService = new MovieApiService();

async function setBaseConfig() {
  if (!localStorage.getItem('img_base_url')) {
    const config = await apiService.getConfig();

    localStorage.setItem('img_base_url', config.images.secure_base_url);
  }

  if (!localStorage.getItem('genres')) {
    const genres = await apiService.fetchGenres();
    localStorage.setItem('genres', JSON.stringify(genres));
  }
}

setBaseConfig();
