let preLoader = document.querySelector('#preloader');

window.addEventListener('load', () => {
    setTimeout(() => {
        preLoader.remove();
    }, 1500);
})

// $(window).load(function() {
//       $(".preloader").fadeOut(1000, function() {
//           $('body').removeClass('loading');
//       });
//     });