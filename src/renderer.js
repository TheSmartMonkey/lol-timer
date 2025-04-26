const { ipcRenderer } = require('electron')

const timers = {
  top: { time: 0, interval: null },
  jungle: { time: 0, interval: null },
  mid: { time: 0, interval: null },
  adc: { time: 0, interval: null },
  support: { time: 0, interval: null }
};

ipcRenderer.on('set-timer', (event, role) => {
  if (timers[role]) {
    if (timers[role].interval) clearInterval(timers[role].interval);
    timers[role].time = 5 * 60; // 5 minutes
    updateTimer(`${role}-timer`, timers[role].time);
    startTimer(`${role}-timer`, role);
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

function startTimer(id, role) {
  const interval = setInterval(() => {
    if (timers[role].time > 0) {
      timers[role].time--;
      updateTimer(id, timers[role].time);
    } else {
      clearInterval(interval);
    }
  }, 1000);

  timers[role].interval = interval;
}
