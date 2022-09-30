const refs = {
  startBtn: document.querySelector(`button[data-start]`),
  stopBtn: document.querySelector(`button[data-stop]`),
  body: document.querySelector('body'),
};

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

let timerId = null;

refs.startBtn.addEventListener('click', onClickStart);

function onClickStart() {
  timerId = setInterval(() => {
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.startBtn.disabled = true;

  if ((refs.startBtn.disabled = true)) {
    refs.stopBtn.disabled = false;
  }
}

refs.stopBtn.addEventListener('click', onClickStop);

function onClickStop() {
  refs.stopBtn.disabled = true;

  if ((refs.stopBtn.disabled = true)) {
    refs.startBtn.disabled = false;
  }
  clearTimeout(timerId);
}
