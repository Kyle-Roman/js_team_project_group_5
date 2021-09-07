let maskLoader = document.querySelector('.mask');

window.addEventListener('load', () => {
    maskLoader.classList.add('hide');
    setTimeout(() => {
        maskLoader.remove();
    }, 600);
})