let preLoader = document.querySelector('#preloader');

window.addEventListener('load', () => {
    // maskLoader.classList.add('hide');
    setTimeout(() => {
        preLoader.remove();
    }, 1500);
})