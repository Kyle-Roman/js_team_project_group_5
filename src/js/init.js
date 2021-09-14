import MoviesApiService from './trendingMovies/api.js';
import setBaseConfig from './local-storage';
import apiService from '..';
const api = new MoviesApiService();
export default async function Initialize() {
  await setBaseConfig();

  api.resetPage();
  api.fetchMovies();
}

Initialize();
