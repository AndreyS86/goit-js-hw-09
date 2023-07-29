function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

const bodyEl = document.querySelector('body');

let timerId = null;

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);

function onStart() { 
    timerId = setInterval(getBgColor, 1000);
    startButton.toggleAttribute('disabled');
};

function onStop () {
    clearInterval(timerId);

    startButton.removeAttribute('disabled');
}

function getBgColor () {
    bodyEl.style.backgroundColor = getRandomHexColor();
}