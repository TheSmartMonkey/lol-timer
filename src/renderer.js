const { ipcRenderer } = require('electron')

let flashTime = 0;
let smiteTime = 0;
let flashInterval = null;
let smiteInterval = null;

ipcRenderer.on('set-timer', (event, timer, duration) => {
  if (timer === 'Flash') {
    if (flashInterval) clearInterval(flashInterval);
    flashTime = duration * 60;
    updateTimer('flash-timer', flashTime);
    startTimer('flash-timer', 'flash');
  } else if (timer === 'Smite') {
    if (smiteInterval) clearInterval(smiteInterval);
    smiteTime = duration * 60;
    updateTimer('smite-timer', smiteTime);
    startTimer('smite-timer', 'smite');
  }
});

function updateTimer(id, time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById(id).value = `${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function startTimer(id, type) {
  const interval = setInterval(() => {
    if (type === 'flash' && flashTime > 0) {
      flashTime--;
      updateTimer(id, flashTime);
    } else if (type === 'smite' && smiteTime > 0) {
      smiteTime--;
      updateTimer(id, smiteTime);
    } else {
      clearInterval(interval);
    }
  }, 1000);

  if (type === 'flash') {
    flashInterval = interval;
  } else if (type === 'smite') {
    smiteInterval = interval;
  }
}
