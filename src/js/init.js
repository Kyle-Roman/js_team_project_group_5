import { getTrending } from './search-trending';
import setBaseConfig from './local-storage';
import apiService from '..';

export default async function Initialize() {
  await setBaseConfig();

  apiService.resetPage();
  getTrending('day');
}

Initialize();
