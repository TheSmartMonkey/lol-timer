const { TIMER_DURATION } = require('../config/constants');

class TimerService {
  constructor() {
    this.timers = {
      top: { time: 0, interval: null },
      jungle: { time: 0, interval: null },
      mid: { time: 0, interval: null },
      adc: { time: 0, interval: null },
      support: { time: 0, interval: null }
    };
  }

  startTimer(role, updateCallback) {
    if (this.timers[role]) {
      if (this.timers[role].interval) {
        clearInterval(this.timers[role].interval);
      }
      
      this.timers[role].time = TIMER_DURATION;
      this.updateTimerDisplay(role, updateCallback);
      
      this.timers[role].interval = setInterval(() => {
        if (this.timers[role].time > 0) {
          this.timers[role].time--;
          this.updateTimerDisplay(role, updateCallback);
        } else {
          clearInterval(this.timers[role].interval);
        }
      }, 1000);
    }
  }

  updateTimerDisplay(role, updateCallback) {
    const time = this.timers[role].time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
    updateCallback(`${role}-timer`, formattedTime);
  }

  pad(num) {
    return num < 10 ? '0' + num : num;
  }
}

module.exports = TimerService; 
