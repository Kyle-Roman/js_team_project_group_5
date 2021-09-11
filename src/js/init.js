import getTrending from './trending-re';
import setBaseConfig from './local-storage';

async function Initialize() {
  await setBaseConfig();
  getTrending('day');
}

Initialize();
