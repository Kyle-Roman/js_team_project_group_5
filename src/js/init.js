import { getTrending, showMovies } from './search-trending';
import setBaseConfig from './local-storage';
import apiService from '..';

export default async function Initialize() {
  await setBaseConfig();

  apiService.resetPage();
  const trending = await getTrending('day');
  showMovies(trending);
}

class Locator {
  constructor() {
    this.location = 'home';
  }

  get location() {
    return this._location;
  }

  set location(newLocation) {
    this._location = newLocation;
  }
}

const navigate = new Locator();

export { navigate };
