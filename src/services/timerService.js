const { TIMER_DURATION } = require('../config/constants');

class TimerService {
  constructor() {
    this.timers = {
      top: { time: 0, interval: null, abilityHaste: 5 },
      jungle: { time: 0, interval: null, abilityHaste: 5 },
      mid: { time: 0, interval: null, abilityHaste: 5 },
      adc: { time: 0, interval: null, abilityHaste: 5 },
      support: { time: 0, interval: null, abilityHaste: 5 },
    };
  }

  setAbilityHaste(role, value) {
    if (this.timers[role]) {
      this.timers[role].abilityHaste = parseInt(value);
      if (this.timers[role].interval) {
        const remainingTime = this.timers[role].time;
        const baseTime = this.reverseAHCalculation(remainingTime, role);
        this.timers[role].time = this.applyAbilityHaste(baseTime, role);
      }
    }
  }

  applyAbilityHaste(baseCooldown, role) {
    return Math.round(baseCooldown / (1 + this.timers[role].abilityHaste / 100));
  }

  reverseAHCalculation(currentCooldown, role) {
    return Math.round(currentCooldown * (1 + this.timers[role].abilityHaste / 100));
  }

  startTimer(role, updateCallback) {
    if (this.timers[role]) {
      if (this.timers[role].interval) {
        clearInterval(this.timers[role].interval);
      }

      this.timers[role].time = this.applyAbilityHaste(TIMER_DURATION, role);
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
