import * as API from '../service/API.js';

const movieContainer = document.querySelector('.main');
const trendMovieContainer = document.querySelector('.movie-container');

let totalPage = 500;
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
    createAndSetupButton('500', 'end-page', disabled.end(), () => (currentPage = totalPages)),
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

const upDateMovie = page => {
  trendMovieContainer.innerHTML = '';
  API.fetchTrends(page).then(({ total_pages, results }) => {
    movieTemplate(results).then(result =>
      trendMovieContainer.insertAdjacentHTML('beforeend', result),
    );
    totalPage = total_pages;
  });
};
upDateMovie();

const paginationButtons = new PaginationButton(totalPage, 7);
paginationButtons.render();
paginationButtons.onChange(e => {
  upDateMovie(e.target.value);
});

const movieTemplate = movies => {
  return API.fetchGenres().then(r => {
    return movies
      .map(movie => {
        console.log(movie);
        if (movie.release_date === undefined) {
          movie.release_date = '';
        }
        movie.release_date = movie.release_date.slice(0, 4);
        const genres = movie.genre_ids.map(genre => (genre = r[genre]));
        return `<li id=${movie.id}>
    <img src=${
      movie.backdrop_path
        ? 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path
        : 'https://i.redd.it/ds1luav7dl851.jpg'
    } alt=${movie.original_title}>
    <div>
      <h3>${movie.original_title}</h3>
      <p>${[...genres]}</p>|<span>${movie.release_date}</span>
    </div>
</li>`;
      })
      .join('');
  });
};
