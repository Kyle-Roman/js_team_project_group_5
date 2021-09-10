history.scrollRestoration = 'manual';

$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

import './js/search';
import './sass/main.scss';
import './js/refs';
import './js/team-modal';
import './js/local-storage';
import './js/loader';
import './js/pagination';
import './js/notifications';
import './js/trending-re';
import './js/init';
