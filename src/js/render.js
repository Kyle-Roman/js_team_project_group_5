const galleryRef = document.querySelector('#gallery');
import movieCardTpl from '../templates/movie-card.hbs';

function processResponse(data) {
  const IMAGE_BASE_URL = localStorage.getItem('img_base_url');
  const genresList = JSON.parse(localStorage.getItem('genres')).genres;

  const moviesProcessed = data.results.map(
    ({ id, release_date, title, poster_path, genre_ids }) => {
      const genresNamed = genresList
        .filter(genre => genre_ids.includes(genre.id))
        .map(genre => genre.name);

      return {
        id,
        release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
        title: title.length > 56 ? title.slice(0, 56) + '...' : title,
        posterURL: poster_path ? `${IMAGE_BASE_URL}w500${poster_path}` : '',
        genres:
          genresNamed.length > 2
            ? genresNamed.slice(0, 2).concat('Other').join(', ')
            : genresNamed.join(', '),
      };
    },
  );

  return moviesProcessed;
}

function render(data, rType) {
  if (rType === 'common') {
    const movies = processResponse(data);
    galleryRef.innerHTML = movieCardTpl(movies);
  }
}

export { render };
