import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  width: '24rem',
  showConfirmButton: false,
  timer: 1200,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('click', Swal.close);
  },
});

export default class Notification {
  constructor() { }

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

  nothingToShow() {
    Toast.fire({
      icon: 'info',
      iconColor: '#fff',
      title: `<p style="color:white">Sorry, that's all :(<p>`,

      background: '#ff6b01',
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

  successfullyAddedToWatched() {
    Toast.fire({
      icon: 'success',
      title: 'Successfully added to watched',

      background: '#f7f7f7',
    });
  }

  successfullyAddedToQueue() {
    Toast.fire({
      icon: 'success',
      title: 'Successfully added to queue',

      background: '#f7f7f7',
    });
  }

  successfullyRemovedFromWatched() {
    Toast.fire({
      icon: 'success',
      title: 'Successfully removed from watched',

      background: '#f7f7f7',
    });
  }

  successfullyRemovedFromQueue() {
    Toast.fire({
      icon: 'success',
      title: 'Successfully removed from queue',

      background: '#f7f7f7',
    });
  }

  alreadyWatched() {
    Toast.fire({
      icon: 'info',
      iconColor: '#ff6b08',
      title: 'Already watched',

      background: '#f7f7f7',
    });
  }

  alreadyInQueue() {
    Toast.fire({
      icon: 'info',
      iconColor: '#ff6b08',
      title: 'Already in queue',

      background: '#f7f7f7',
    });
  }
}
