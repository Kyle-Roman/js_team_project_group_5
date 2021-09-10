import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  width: '20rem',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('click', Swal.close);
  },
});

export default class Notification {
  constructor() {}

  emptyQuery() {
    Toast.fire({
      icon: 'info',
      iconColor: '#ff6b08',
      title: 'Please enter the search query',

      background: '#f7f7f7',
    });
  }

  notFound() {
    Toast.fire({
      icon: 'question',
      iconColor: '#ff6b08',
      title: 'Sorry, nothing found :(',

      background: '#f7f7f7',
    });
  }

  serverError() {
    Toast.fire({
      icon: 'error',
      iconColor: 'white',
      title:
        '<p style="color:white; font-weight:400">Something went wrong\nPlease try again later<p>',

      background: '#d62700',
    });
  }
}
