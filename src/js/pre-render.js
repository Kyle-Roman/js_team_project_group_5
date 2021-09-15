export default function prepareData(data, handlerType) {
  const IMAGE_BASE_URL = localStorage.getItem('img_base_url');
  const genresList = JSON.parse(localStorage.getItem('genres')).genres;

  if (!handlerType) {
    const moviesProcessed = data.results.map(
      ({ id, release_date, title, poster_path, genre_ids, vote_average }) => {
        const genresNamed = genresList
          .filter(genre => genre_ids.includes(genre.id))
          .map(genre => genre.name);

        return {
          id,
          release_date: release_date ? release_date.slice(0, 4) : 'Date unknown',
          title: title.length > 52 ? title.slice(0, 52) + '...' : title,
          vote_average,
          posterURL: poster_path
            ? `${IMAGE_BASE_URL}w500${poster_path}`
            : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
          genres:
            genresNamed.length > 2
              ? genresNamed.slice(0, 2).concat('Other').join(', ')
              : genresNamed.join(', '),
        };
      },
    );

    return moviesProcessed;
  }
  return data;
}
