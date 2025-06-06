const { ipcRenderer } = require('electron');
const TimerService = require('./services/timerService');

const timerService = new TimerService();

ipcRenderer.on('set-timer', (event, role) => {
  timerService.startTimer(role, (id, time) => {
    document.getElementById(id).value = time;
  });
});

// Ability Haste handlers for each role
const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
roles.forEach((role) => {
  document.getElementById(`${role}-ah`).addEventListener('change', (event) => {
    timerService.setAbilityHaste(role, event.target.value);
  });
});

// Settings button handler
document.getElementById('settingsButton').addEventListener('click', () => {
  ipcRenderer.send('open-settings');
});

// Reset button handler
document.getElementById('resetButton').addEventListener('click', () => {
  roles.forEach((role) => {
    // Reset the timer
    if (timerService.timers[role].interval) {
      clearInterval(timerService.timers[role].interval);
    }
    timerService.timers[role].time = 0;
    const timerElement = document.getElementById(`${role}-timer`);
    timerElement.value = '00:00';

    // Reset index colors
    timerElement.classList.remove('timer-warning', 'timer-danger');

    // Reset ability haste dropdowns
    document.getElementById(`${role}-ah`).value = '5';
    timerService.setAbilityHaste(role, 5);
  });
});
