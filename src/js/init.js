import { getTrending, showTrendingMovies } from './search-trending';
import setBaseConfig from './local-storage';
import apiService from '..';

export default async function Initialize() {
  await setBaseConfig();

  apiService.resetPage();
  const trending = await getTrending('day');
  showTrendingMovies(trending);
}

Initialize();
