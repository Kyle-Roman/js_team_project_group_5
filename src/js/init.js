import { getTrending } from './search-trending';
import setBaseConfig from './local-storage';

export default async function Initialize() {
  await setBaseConfig();
  getTrending('day');
}

Initialize();
