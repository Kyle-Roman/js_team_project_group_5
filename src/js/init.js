import { getTrending } from './search-trending';
import setBaseConfig from './local-storage';

async function Initialize() {
  await setBaseConfig();
  getTrending('day');
}

Initialize();
