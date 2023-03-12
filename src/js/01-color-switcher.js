const bodyEl = document.querySelector('body');
const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStartEl.addEventListener('click', startRandomColorBody);
buttonStopEl.addEventListener('click', stopRandomColorBody);

buttonStopEl.setAttribute('disabled', '');

function startRandomColorBody(e) {
  e.target.setAttribute('disabled', 'true');
  buttonStopEl.removeAttribute('disabled');

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1500);
}

function stopRandomColorBody(e) {
  clearInterval(timerId);

  e.target.setAttribute('disabled', 'true');
  buttonStartEl.removeAttribute('disabled');
}
