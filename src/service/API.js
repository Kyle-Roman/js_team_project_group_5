const API_KEY = "44d74a10460e9a32f8546bed31d47780";
const BASE_URL = "https://api.themoviedb.org/3";
export const fetchTrends = (page = 1) => {
  return fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  )
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return null;
    })
    .then((r) => r

    );
};
export const fetchGenres = () => {
  return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return null;
    })
    .then(({ genres }) => {
      let genresList = {};
      for (let genre of genres) {
        genresList[genre.id] = genre.name;
      }
      return genresList;
    });
};
