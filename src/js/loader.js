let preLoader = document.querySelector('#preloader');

window.addEventListener('load', () => {
    setTimeout(() => {
        preLoader.remove();
        $('body').removeClass('scroll-off');
    }, 1000);
})
