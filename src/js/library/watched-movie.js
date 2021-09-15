const API_KEY = '838a1c7309b989baab596bfe84b6d2d8';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
  gallery: document.querySelector('.gallery'),
};

export default function getWatched() {
  clearGallery();

  const watchedMovieListId = JSON.parse(localStorage.getItem('watched'));

  if (watchedMovieListId === null || localStorage.getItem('watched') === '[]') {
    refs.gallery.innerHTML = ` <div class="container-empty" id="block">
         <p class="info-text__library"> Your library is empty.</p>
      </div>
         `;

    var div = document.createElement('div');
    var image = document.createElement('img');

    image.setAttribute(
      'src',
      'https://cdn.pixabay.com/photo/2012/11/05/07/39/projector-64149_1280.jpg',
    );

    div.appendChild(image).style.borderRadius = '10px';
    document.getElementById('block').appendChild(div);
  } else {
    watchedMovieListId.forEach(function fetchMovieById2(id) {
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(r =>
        r.json().then(movieInfo => {
          // console.log(movieInfo.genres.length);

          const releaseDate = movieInfo.release_date.slice(0, 4);

          if (movieInfo.backdrop_path === null) {
            refs.gallery.insertAdjacentHTML(
              'beforeend',
              `
          
          <li class='wow animate__fadeInUp card__item list' data-id='${movieInfo.id}' id='${movieInfo.id}' title='${movieInfo.title}'>
            <article class='card'>
              <a href='' class='card__link link'>
                <div class='card-img-container'>
                  <img
                    src='https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg'
                    alt='${movieInfo.title}'
                    data-id='${movieInfo.id}'
                    class='card__image'
                  />
                </div>

                <div class='card__description'>
                  <div class='card-name__container'>
                    <h2 class='card__name'>${movieInfo.title}</h2>
                  </div>
                  <p class='card__info'>${movieInfo.genres[0].name} | ${releaseDate}
                    <span class='card__movie-rating'>${movieInfo.vote_average}</span>
                  </p>
                </div>
              </a>
            </article>
          </li>`,
            );
          }

          if (movieInfo.genres.length > 3) {
            refs.gallery.insertAdjacentHTML(
              'beforeend',
              `
          
          <li class='wow animate__fadeInUp card__item list' data-id='${movieInfo.id}' id='${movieInfo.id}' title='${movieInfo.title}'>
            <article class='card'>
              <a href='' class='card__link link'>
                <div class='card-img-container'>
                  <img
                    src='https://image.tmdb.org/t/p/w500${movieInfo.poster_path}'
                    alt='${movieInfo.title}'
                    data-id='${movieInfo.id}'
                    class='card__image'
                  />
                </div>

                <div class='card__description'>
                  <div class='card-name__container'>
                    <h2 class='card__name'>${movieInfo.title}</h2>
                  </div>
                  <p class='card__info'>${movieInfo.genres[0].name}, ${movieInfo.genres[1].name}, other | ${releaseDate}
                    <span class='card__movie-rating'>${movieInfo.vote_average}</span>
                  </p>
                </div>
              </a>
            </article>
          </li>`,
            );
          } else if ((movieInfo.genres.length = 2)) {
            refs.gallery.insertAdjacentHTML(
              'beforeend',
              `
          
          <li class='wow animate__fadeInUp card__item list' data-id='${movieInfo.id}' id='${movieInfo.id}' title='${movieInfo.title}'>
            <article class='card'>
              <a href='' class='card__link link'>
                <div class='card-img-container'>
                  <img
                    src='https://image.tmdb.org/t/p/w500${movieInfo.poster_path}'
                    alt='${movieInfo.title}'
                    data-id='${movieInfo.id}'
                    class='card__image'
                  />
                </div>

                <div class='card__description'>
                  <div class='card-name__container'>
                    <h2 class='card__name'>${movieInfo.title}</h2>
                  </div>
                  <p class='card__info'>${movieInfo.genres[0].name}, other | ${releaseDate}
                    <span class='card__movie-rating'>${movieInfo.vote_average}</span>
                  </p>
                </div>
              </a>
            </article>
          </li>`,
            );
          } else if ((movieInfo.genres.length = 1)) {
            refs.gallery.insertAdjacentHTML(
              'beforeend',
              `
          
          <li class='wow animate__fadeInUp card__item list' data-id='${movieInfo.id}' id='${movieInfo.id}' title='${movieInfo.title}'>
            <article class='card'>
              <a href='' class='card__link link'>
                <div class='card-img-container'>
                  <img
                    src='https://image.tmdb.org/t/p/w500${movieInfo.poster_path}'
                    alt='${movieInfo.title}'
                    data-id='${movieInfo.id}'
                    class='card__image'
                  />
                </div>

                <div class='card__description'>
                  <div class='card-name__container'>
                    <h2 class='card__name'>${movieInfo.title}</h2>
                  </div>
                  <p class='card__info'>${movieInfo.genres[0].name} | ${releaseDate}
                    <span class='card__movie-rating'>${movieInfo.vote_average}</span>
                  </p>
                </div>
              </a>
            </article>
          </li>`,
            );
          }

          return movieInfo;
        }),
      );
    });
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
