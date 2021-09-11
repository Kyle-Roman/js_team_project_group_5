import ApiService from '../js/trendingMovies/api-service.js';
import moviesTpl from '../templates/movie-card_library.hbs';

const paginationContainer = document.querySelector('.pagination ');
const trendMovieContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.js-form');

let page = 1;
let totalPage = 500;
const api = new ApiService();
const genres = api.fetchGenres().then(({ genres }) => {
  let result = {};
  for (let genre of genres) {
    result[genre.id] = genre.name;
  }
  return result;
});
let query = null;
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  if (query === e.currentTarget.elements[0].value) {
    return;
  }
  query = e.currentTarget.elements[0].value;
  paginationContainer.innerHTML = '';
  trendMovieContainer.innerHTML = '';
  api.fetchMoviesByQuery(query, 1).then(r => {
    const { total_pages, results } = r;
    movieTemplate(results).then(result =>
      trendMovieContainer.insertAdjacentHTML('beforeend', result),
    );
    totalPage = total_pages;
    const paginationButtons = new PaginationButton(totalPage, 7);
    paginationButtons.render(paginationContainer);
    paginationButtons.onChange(e => {
      if (e.target.value === page) {
        return;
      }
      page = e.target.value;
      upDateMovieByQuery(query, page);
    });
  });
});

const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;

  if (current + half >= total) {
    to = total;
  } else if (current > half) {
    to = current + half;
  }

  let from = to - max;
  if ((current > max - 1 && current + half <= total) || current - half > 2) {
    const arr = Array.from({ length: max }, (_, i) => {
      if (i === 0) {
        return '...';
      }

      if (i === max - 1 && total > current + half + 1) {
        return '...';
      }
      return i + 1 + from;
    });
    return arr;
  }
  const arr = Array.from({ length: max }, (_, i) => {
    if (i === max - 1 && total > current + half + 1) {
      return '...';
    }
    return i + 1 + from;
  });
  return arr;
};

function PaginationButton(totalPages, maxPagesVisible = 10, currentPage = 1) {
  let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);

  let currentPageBtn = null;
  const buttons = new Map();
  const disabled = {
    start: () => pages[0] === 1,
    prev: () => currentPage === 1,
    end: () => pages.slice(-1)[0] === totalPages,
    next: () => currentPage === totalPages,
  };
  const frag = document.createDocumentFragment();
  const paginationButtonContainer = document.createElement('div');
  paginationButtonContainer.className = 'pagination-buttons';

  const createAndSetupButton = (label = '', cls = '', disabled = false, handleClick) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = label;
    buttonElement.className = `page-btn ${cls}`;

    buttonElement.disabled = disabled;
    buttonElement.addEventListener('click', e => {
      handleClick(e);
      this.update();
      paginationButtonContainer.value = currentPage;
      paginationButtonContainer.dispatchEvent(new Event('change'));
    });

    return buttonElement;
  };

  const onPageButtonClick = e => {
    if (e.currentTarget.textContent === '...') {
      return;
    }
    return (currentPage = Number(e.currentTarget.textContent));
  };

  const onPageButtonUpdate = index => btn => {
    if (pages[index] === '...') {
      btn.classList.add('dots');
    }
    if (pages[index] !== '...') {
      btn.classList = 'page-btn';
    }
    btn.textContent = pages[index];

    if (pages[index] === currentPage) {
      currentPageBtn.classList.remove('active');
      btn.classList.add('active');
      currentPageBtn = btn;
      currentPageBtn.focus();
    }
  };

  buttons.set(
    createAndSetupButton('<', 'prev-page', disabled.prev(), () => (currentPage -= 1)),
    btn => (btn.disabled = disabled.prev()),
  );
  buttons.set(
    createAndSetupButton('1', 'start-page', disabled.start(), () => (currentPage = 1)),
    btn => (btn.disabled = disabled.start()),
  );
  pages.map((pageNumber, index) => {
    const isCurrentPage = currentPage === pageNumber;
    const button = createAndSetupButton(
      pageNumber,
      isCurrentPage ? 'active' : '',
      false,
      onPageButtonClick,
    );

    if (isCurrentPage) {
      currentPageBtn = button;
    }

    buttons.set(button, onPageButtonUpdate(index));
  });

  buttons.set(
    createAndSetupButton(
      `${totalPage}`,
      'end-page',
      disabled.end(),
      () => (currentPage = totalPages),
    ),
    btn => (btn.disabled = disabled.end()),
  );
  buttons.set(
    createAndSetupButton('>', 'next-page', disabled.next(), () => (currentPage += 1)),
    btn => (btn.disabled = disabled.next()),
  );

  buttons.forEach((_, btn) => frag.appendChild(btn));
  paginationButtonContainer.appendChild(frag);

  this.render = (container = document.body) => {
    container.appendChild(paginationButtonContainer);
  };

  this.update = (newPageNumber = currentPage) => {
    currentPage = newPageNumber;
    pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    buttons.forEach((updateButton, btn) => updateButton(btn));
  };

  this.onChange = handler => {
    paginationButtonContainer.addEventListener('change', handler);
  };
}

const upDateMovieTrends = page => {
  trendMovieContainer.innerHTML = '';
  api.fetchMovies(page).then(r => {
    const { total_pages, results } = r;
    movieTemplate(results).then(result =>
      trendMovieContainer.insertAdjacentHTML('beforeend', result),
    );
    totalPage = total_pages;
  });
};
upDateMovieTrends();

const paginationButtons = new PaginationButton(totalPage, 7);
paginationButtons.render(paginationContainer);
paginationButtons.onChange(e => {
  if (e.target.value === page) {
    return;
  }
  page = e.target.value;
  if (query) {
    upDateMovieByQuery(query, page);
    return;
  }
  upDateMovieTrends(page);
});
//запрос за жанрами
const movieTemplate = movies => {
  return genres.then(r => {
    return movies.map(movie => {
      if (movie.release_date === undefined) {
        movie.release_date = '';
      }
      movie.release_date = movie.release_date.slice(0, 4);
      movie.genre_ids = movie.genre_ids.map(genre => (genre = r[genre]));
      if (movie.genre_ids.length > 3) {
        movie.genre_ids = [movie.genre_ids[0], movie.genre_ids[1], movie.genre_ids[2], '...'];
      }
      return moviesTpl(movie);
    });
  });
};
const upDateMovieByQuery = (query, page) => {
  trendMovieContainer.innerHTML = '';
  api.fetchMoviesByQuery(query, page).then(({ results }) => {
    movieTemplate(results).then(result =>
      trendMovieContainer.insertAdjacentHTML('beforeend', result),
    );
  });
};
