import prepareData from './pre-render';

export default function render(selector, template, data, modal) {
  if (!modal) {
    const parent = document.querySelector(selector);
    // parent.innerHTML = template(prepareData(data));
    parent.insertAdjacentHTML('beforeend', template(prepareData(data)));
    return;
  }

  const parent = document.querySelector(selector);
  parent.innerHTML = template(prepareData(data, 1));
}
