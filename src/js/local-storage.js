import ApiServise from './api-service';
const requestService = new ApiServise();

// Library of values (watch or queue)
const localStorageLibrary = {
  watched: [],
  queue: [],
};

let btnValue;

const getBtnValue = value => {
  btnValue = value;
};