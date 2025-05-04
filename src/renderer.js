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
