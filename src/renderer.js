const { ipcRenderer } = require('electron');
const TimerService = require('./services/timerService');

const timerService = new TimerService();

ipcRenderer.on('set-timer', (event, role) => {
  timerService.startTimer(role, (id, time) => {
    document.getElementById(id).value = time;
  });
});

// Settings button handler
document.getElementById('settingsButton').addEventListener('click', () => {
  ipcRenderer.send('open-settings');
});

// Reset button handler
document.getElementById('resetButton').addEventListener('click', () => {
  const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
  roles.forEach((role) => {
    if (timerService.timers[role].interval) {
      clearInterval(timerService.timers[role].interval);
    }
    timerService.timers[role].time = 0;
    document.getElementById(`${role}-timer`).value = '00:00';
  });
});
