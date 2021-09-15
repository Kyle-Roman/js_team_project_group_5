import refs from './refs';

refs.checkbox.addEventListener('change', onChangingPositionThemeSwitchToggle);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

if (localStorage.getItem('Theme') === null) {
  refs.main.classList.add('light-theme');
  refs.checkboxBody.classList.add('light-theme');
  refs.modal.classList.add('light-theme');
}

function onChangingPositionThemeSwitchToggle() {
  if (refs.checkbox.checked === true) {
    /* Удаление класса light-theme */
    refs.main.classList.remove('light-theme');
    refs.checkboxBody.classList.remove('light-theme');
    refs.modal.classList.remove('light-theme');

    /* Добавляется на элемент класс dark-theme */
    refs.main.classList.add('dark-theme');
    refs.checkboxBody.classList.add('dark-theme__switcher');
    refs.modal.classList.add('dark-theme');

    /* Удаление предыдущих настроек темы из localStorage */
    localStorage.removeItem('Theme');

    /* Выбранная тема сохраняеться между перезагрузками страницы. Для хранения темы использован localStorage */
    localStorage.setItem('Theme', 'DARK');
  } else {
    /* Удаление класса dark-theme */
    refs.main.classList.remove('dark-theme');
    refs.checkboxBody.classList.remove('dark-theme__switcher');
    refs.modal.classList.remove('dark-theme');

    /* Добавляется на элемент класс light-theme */
    refs.main.classList.add('light-theme');
    refs.checkboxBody.classList.add('light-theme');
    refs.modal.classList.add('light-theme');

    /* Удаление предыдущих настроек темы из localStorage */
    localStorage.removeItem('Theme');

    /* Выбранная тема сохраняеться между перезагрузками страницы. Для хранения темы использован localStorage */
    localStorage.setItem('Theme', 'LIGHT');
  }
}

/* Если при загрузке страницы тема тёмная - checked у чекбокса #theme-switch-toggle - true 
(чтобы ползунок сдвинулся в правильное положение.) */

if (localStorage.getItem('Theme') === 'DARK') {
  refs.checkbox.checked = true;

  /* Удаление класса light-theme */
  refs.main.classList.remove('light-theme');
  refs.checkboxBody.classList.remove('light-theme');
  refs.modal.classList.remove('dark-theme');

  /* Добавляется на элемент класс dark-theme */
  refs.main.classList.add('dark-theme');
  refs.checkboxBody.classList.add('dark-theme__switcher');
  refs.modal.classList.add('dark-theme');
} else if (localStorage.getItem('Theme') === 'LIGHT') {
  //refs.checkbox.checked = false;

  /* Удаление класса dark-theme */
  refs.main.classList.remove('dark-theme');
  refs.checkboxBody.classList.remove('dark-theme__switcher');
  refs.modal.classList.remove('dark-theme');

  /* Добавляется на элемент main класс light-theme */
  refs.main.classList.add('light-theme');
  refs.checkboxBody.classList.add('light-theme');
  refs.modal.classList.add('light-theme');
}
