history.scrollRestoration = 'manual';

$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

import './js/search-trending';
import './js/refs';
import './js/team-modal';
import './js/local-storage';
// import './js/loader';
import './js/notifications';
// import './js/trending-re';
import './js/init';
import './js/pagination';
import './js/theme-switcher/theme-switcher';
import './js/movie-modal';

import './sass/main.scss';
// import './js/load-more';
